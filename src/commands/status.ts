import { defineCommand } from "citty";
import { consola } from "consola";
import { loadConfig, getPagesUrl, getCsvPath } from "../lib/config.js";
import { isGhAuthenticated, hasUnpushedCommits } from "../lib/git.js";
import { readRecords } from "../lib/csv.js";
import { getRoute, getProgress, progressBar } from "../lib/routes.js";
import { ACHIEVEMENTS } from "../lib/achievements.js";

export const statusCommand = defineCommand({
  meta: { name: "status", description: "Show current status" },
  run: async () => {
    const config = await loadConfig();

    const ghAuth = await isGhAuthenticated();
    const unpushed = await hasUnpushedCommits(config.local_path);

    const pagesUrl =
      getPagesUrl(config) ?? "(private repo - use `stp open` for local view)";

    const records = await readRecords(getCsvPath(config));
    const totalKm = records.reduce((s, r) => s + r.distance_km, 0);
    const totalMin = records.reduce((s, r) => s + r.time_min, 0);
    const totalHours = Math.floor(totalMin / 60);
    const remainMin = Math.round(totalMin % 60);

    let statusText =
      `GitHub repo: ${config.repo}\n` +
      `Local path:  ${config.local_path}\n` +
      `Pages URL:   ${pagesUrl}\n` +
      `Speed:       ${config.default_speed} km/h\n` +
      `Weight:      ${config.weight_kg !== null ? config.weight_kg + " kg" : "not set"}\n` +
      `\n` +
      `Total walks: ${records.length}\n` +
      `Distance:    ${totalKm.toFixed(2)} km\n` +
      `Time:        ${totalHours}h ${remainMin}m\n`;

    // Journey
    const journey = config.journey;
    const route = journey ? getRoute(journey.route_id) : undefined;
    if (journey && route) {
      const journeyKm = Math.max(0, totalKm - journey.started_km);
      const progress = getProgress(route, journeyKm);
      statusText +=
        `\n` +
        `Journey:     ${route.from} \u2192 ${route.to}\n` +
        `Progress:    ${progressBar(progress.percent)} ${progress.percent.toFixed(1)}%\n` +
        `             ${Math.floor(progress.walkedKm)} / ${route.total_km.toLocaleString()} km`;
      if (progress.next) {
        statusText += `\nNext stop:   ${progress.next.name} (${Math.ceil(progress.nextDistance)} km)`;
      }
      statusText += "\n";
    }

    // Achievements
    const unlocked = config.achievements ?? {};
    const unlockedCount = Object.keys(unlocked).length;
    statusText += `\nAchievements: ${unlockedCount} / ${ACHIEVEMENTS.length}`;

    statusText +=
      `\n\n` +
      `Unpushed:    ${unpushed ? "yes - run \`stp sync\`" : "no"}\n` +
      `gh auth:     ${ghAuth ? "authenticated" : "NOT authenticated"}`;

    consola.box(statusText);
  },
});
