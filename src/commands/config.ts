import { defineCommand } from "citty";
import { consola } from "consola";
import { loadConfig, saveConfig, getCsvPath } from "../lib/config.js";
import { readRecords } from "../lib/csv.js";
import { ROUTES, formatRouteOption } from "../lib/routes.js";
import { promptSelect, promptConfirm } from "../lib/prompt.js";

export const configCommand = defineCommand({
  meta: { name: "config", description: "Update configuration" },
  args: {
    key: {
      type: "positional",
      description: "Config key (speed, weight, route)",
      required: true,
    },
    value: {
      type: "positional",
      description: "New value (not needed for route)",
      required: false,
    },
  },
  run: async ({ args }) => {
    const config = await loadConfig();

    switch (args.key) {
      case "speed": {
        if (!args.value) {
          consola.error("Usage: stp config speed <value>");
          process.exit(1);
        }
        const speed = parseFloat(args.value);
        if (isNaN(speed) || speed <= 0) {
          consola.error("Invalid speed. Provide a positive number.");
          process.exit(1);
        }
        config.default_speed = speed;
        await saveConfig(config);
        consola.success(`Default speed updated to ${speed} km/h`);
        break;
      }
      case "weight": {
        if (!args.value) {
          consola.error("Usage: stp config weight <value|none>");
          process.exit(1);
        }
        if (args.value === "none" || args.value === "null" || args.value === "0") {
          config.weight_kg = null;
          await saveConfig(config);
          consola.success("Weight cleared.");
          break;
        }
        const weight = parseFloat(args.value);
        if (isNaN(weight) || weight <= 0) {
          consola.error("Invalid weight. Provide a positive number, or 'none' to clear.");
          process.exit(1);
        }
        config.weight_kg = weight;
        await saveConfig(config);
        consola.success(`Weight updated to ${weight} kg`);
        break;
      }
      case "route": {
        if (config.journey) {
          const currentRoute = ROUTES.find((r) => r.id === config.journey!.route_id);
          if (currentRoute) {
            consola.info(`Current route: ${currentRoute.from} \u2192 ${currentRoute.to}`);
          }
          const confirmed = await promptConfirm(
            "Changing route will reset your journey progress. Continue?",
            false
          );
          if (!confirmed) {
            consola.info("Cancelled.");
            return;
          }
        }
        const routeOptions = ROUTES.map(formatRouteOption);
        const selectedOption = await promptSelect("Choose your journey:", routeOptions);
        const selectedRoute = ROUTES[routeOptions.indexOf(selectedOption)];

        const records = await readRecords(getCsvPath(config));
        const totalKm = records.reduce((s, r) => s + r.distance_km, 0);

        config.journey = {
          route_id: selectedRoute.id,
          started_at: new Date().toISOString().slice(0, 19),
          started_km: totalKm,
          completed_routes: config.journey?.completed_routes ?? [],
        };
        await saveConfig(config);
        consola.success(
          `Journey set: ${selectedRoute.from} \u2192 ${selectedRoute.to} (${selectedRoute.total_km.toLocaleString()} km)`
        );
        break;
      }
      default:
        consola.error(
          `Unknown config key: "${args.key}". Available: speed, weight, route`
        );
        process.exit(1);
    }
  },
});
