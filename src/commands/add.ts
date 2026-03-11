import { defineCommand } from "citty";
import { consola } from "consola";
import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { loadConfig, saveConfig, getCsvPath } from "../lib/config.js";
import { appendRecord, readRecords } from "../lib/csv.js";
import { calcCalories } from "../lib/calories.js";
import { generateIndexHtml } from "../lib/html.js";
import { gitAdd, gitCommit, gitPush } from "../lib/git.js";
import { playWalkAnimation } from "../lib/animation.js";
import {
  getRoute,
  getProgress,
  getNewlyPassedWaypoints,
  progressBar,
  formatRouteOption,
  ROUTES,
  type Waypoint,
} from "../lib/routes.js";
import { checkNewAchievements, type Achievement, type AchievementContext } from "../lib/achievements.js";
import { promptSelect } from "../lib/prompt.js";

export const addCommand = defineCommand({
  meta: { name: "add", description: "Add a walking record" },
  args: {
    time_min: {
      type: "positional",
      description: "Walking time in minutes",
      required: true,
    },
    speed: {
      type: "string",
      description: "Walking speed (km/h)",
    },
    date: {
      type: "string",
      description: "Record date (ISO format or YYYY-MM-DD)",
    },
  },
  run: async ({ args }) => {
    const config = await loadConfig();

    const timeMin = parseFloat(args.time_min);
    if (isNaN(timeMin) || timeMin <= 0) {
      consola.error("Invalid time. Provide a positive number in minutes.");
      process.exit(1);
    }

    const speedKmh = args.speed ? parseFloat(args.speed) : config.default_speed;
    if (isNaN(speedKmh) || speedKmh <= 0) {
      consola.error("Invalid speed.");
      process.exit(1);
    }

    let datetime: string;
    if (args.date) {
      const d = new Date(args.date);
      if (isNaN(d.getTime())) {
        consola.error("Invalid date format. Use YYYY-MM-DD or ISO 8601.");
        process.exit(1);
      }
      datetime = d.toISOString().slice(0, 19);
    } else {
      datetime = new Date().toISOString().slice(0, 19);
    }

    const distanceKm = (timeMin / 60) * speedKmh;

    const csvPath = getCsvPath(config);
    await appendRecord(csvPath, {
      datetime,
      time_min: timeMin,
      speed_kmh: speedKmh,
      distance_km: distanceKm,
      weight_kg: config.weight_kg,
    });

    // Record summary line
    let recordLine = `${distanceKm.toFixed(2)} km  |  ${timeMin} min  |  ${speedKmh} km/h`;
    if (config.weight_kg) {
      const cal = calcCalories(speedKmh, timeMin, config.weight_kg);
      recordLine += `  |  ${cal} kcal`;
    }
    consola.success(recordLine);

    // --- Compute all state before HTML generation ---
    const records = await readRecords(csvPath);
    const totalKm = records.reduce((s, r) => s + r.distance_km, 0);

    // Journey
    const journey = config.journey;
    const route = journey ? getRoute(journey.route_id) : undefined;
    let justCompleted = false;
    let newWaypoints: Waypoint[] = [];
    let journeyProgress: ReturnType<typeof getProgress> | undefined;

    if (journey && route) {
      const journeyKm = Math.max(0, totalKm - journey.started_km);
      const prevJourneyKm = Math.max(0, journeyKm - distanceKm);
      journeyProgress = getProgress(route, journeyKm);
      newWaypoints = getNewlyPassedWaypoints(route, prevJourneyKm, journeyKm);
      justCompleted = prevJourneyKm < route.total_km && journeyKm >= route.total_km;
      if (justCompleted && !journey.completed_routes.includes(route.id)) {
        journey.completed_routes.push(route.id);
      }
    }

    // Achievements
    const unlocked = config.achievements ?? {};
    const completedRoutes = journey?.completed_routes ?? [];
    const ctx: AchievementContext = { allRecords: records, totalKm, completedRoutes };
    const newAchievements: Achievement[] = checkNewAchievements(ctx, unlocked);
    for (const a of newAchievements) {
      unlocked[a.id] = new Date().toISOString().slice(0, 19);
    }

    // Save config if anything changed
    if (newAchievements.length > 0 || justCompleted) {
      config.achievements = unlocked;
      await saveConfig(config);
    }

    // --- Git sync (with updated config) runs in parallel with animation ---
    const cwd = config.local_path;
    const gitSync = (async () => {
      await writeFile(join(cwd, "docs", "index.html"), generateIndexHtml(config));
      await gitAdd(["data/walking.csv", "docs/index.html"], cwd);
      try {
        await gitCommit(`Walk: ${timeMin} min, ${distanceKm.toFixed(2)} km`, cwd);
      } catch {
        return "commit-failed";
      }
      try {
        await gitPush(cwd);
        return "pushed";
      } catch {
        return "push-failed";
      }
    })();

    await playWalkAnimation(2000);

    // --- Display notifications ---

    // Waypoint arrivals
    if (newWaypoints.length > 0 && journeyProgress) {
      const names = newWaypoints.map((w) => w.name).join(" and ");
      consola.log("");
      consola.success(`You've arrived in ${names}!`);
      if (journeyProgress.next) {
        consola.info(`Next stop: ${journeyProgress.next.name} \u2014 ${Math.ceil(journeyProgress.nextDistance)} km to go`);
      }
    }

    // Journey completion or progress
    if (journey && route) {
      if (justCompleted) {
        const startDate = journey.started_at.split("T")[0];
        const today = new Date().toISOString().slice(0, 10);
        const days = Math.ceil(
          (new Date(today).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
        consola.log("");
        consola.box(
          `Journey Complete!\n\n` +
            `${route.from} \u2192 ${route.to} (${route.total_km.toLocaleString()} km)\n` +
            `Completed in ${days} days`
        );
      } else if (journeyProgress) {
        consola.log("");
        consola.log(
          `  \u{1F6B6} ${route.from} \u2192 ${route.to}  ` +
            `${journeyProgress.percent.toFixed(1)}%  (${Math.floor(journeyProgress.walkedKm)} / ${route.total_km.toLocaleString()} km)`
        );
        consola.log(`  ${progressBar(journeyProgress.percent)}`);
      }
    }

    // Achievements
    if (newAchievements.length > 0) {
      consola.log("");
      for (const a of newAchievements) {
        consola.success(`\u{1F3C5} ${a.name} \u2014 ${a.description}`);
      }
    }

    // Next route prompt on completion
    if (justCompleted) {
      consola.log("");
      const routeOptions = ROUTES.map(formatRouteOption);
      const selectedOption = await promptSelect("Choose your next journey:", routeOptions);
      const selectedRoute = ROUTES[routeOptions.indexOf(selectedOption)];
      config.journey = {
        route_id: selectedRoute.id,
        started_at: new Date().toISOString().slice(0, 19),
        started_km: totalKm,
        completed_routes: completedRoutes,
      };
      await saveConfig(config);
      consola.success(`New journey: ${selectedRoute.from} \u2192 ${selectedRoute.to} (${selectedRoute.total_km.toLocaleString()} km)`);
    }

    // Git sync result
    const gitResult = await gitSync;
    switch (gitResult) {
      case "pushed":
        consola.success("Pushed to GitHub.");
        break;
      case "push-failed":
        consola.warn("Push failed. Run `stp sync` to retry.");
        break;
      case "commit-failed":
        consola.warn("Commit failed. Run `stp sync` later.");
        break;
    }
  },
});
