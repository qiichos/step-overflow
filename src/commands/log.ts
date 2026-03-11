import { defineCommand } from "citty";
import { consola } from "consola";
import { loadConfig, getCsvPath } from "../lib/config.js";
import { readRecords } from "../lib/csv.js";
import { calcCalories } from "../lib/calories.js";

export const logCommand = defineCommand({
  meta: { name: "log", description: "Show recent walking records" },
  args: {
    count: {
      type: "string",
      description: "Number of records to show (default: 10)",
      default: "10",
    },
  },
  run: async ({ args }) => {
    const config = await loadConfig();
    const csvPath = getCsvPath(config);
    const records = await readRecords(csvPath);

    if (records.length === 0) {
      consola.info("No records yet. Run `stp add <minutes>` to start.");
      return;
    }

    const count = Math.min(parseInt(args.count) || 10, records.length);
    const recent = records.slice(-count).reverse();

    const lines = recent.map((r) => {
      const date = r.datetime.split("T")[0];
      const time = r.datetime.split("T")[1]?.slice(0, 5) || "";
      let line = `  ${date} ${time}  ${String(r.time_min).padStart(4)} min  ${r.speed_kmh} km/h  ${r.distance_km.toFixed(2)} km`;
      if (r.weight_kg) {
        const cal = calcCalories(r.speed_kmh, r.time_min, r.weight_kg);
        line += `  ${cal} kcal`;
      }
      return line;
    });

    consola.log(`\nLast ${count} records:\n`);
    for (const line of lines) {
      consola.log(line);
    }
    consola.log("");
  },
});
