import { readFile, appendFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname } from "node:path";

export interface WalkingRecord {
  datetime: string;
  time_min: number;
  speed_kmh: number;
  distance_km: number;
  weight_kg: number | null;
}

const HEADER = "datetime,time_min,speed_kmh,distance_km,weight_kg";

export async function appendRecord(
  csvPath: string,
  record: WalkingRecord
): Promise<void> {
  const dir = dirname(csvPath);
  await mkdir(dir, { recursive: true });

  if (!existsSync(csvPath)) {
    await writeFile(csvPath, HEADER + "\n");
  }

  const weight = record.weight_kg !== null ? String(record.weight_kg) : "";
  const line = [
    record.datetime,
    record.time_min,
    record.speed_kmh,
    record.distance_km.toFixed(2),
    weight,
  ].join(",");

  await appendFile(csvPath, line + "\n");
}

export async function readRecords(csvPath: string): Promise<WalkingRecord[]> {
  if (!existsSync(csvPath)) return [];
  const content = await readFile(csvPath, "utf-8");
  const lines = content.trim().split("\n");
  if (lines.length < 2) return [];
  return lines.slice(1).flatMap((line) => {
    const parts = line.split(",");
    if (parts.length < 4) return [];
    const [datetime, time_min, speed_kmh, distance_km, weight_kg] = parts;
    const record: WalkingRecord = {
      datetime,
      time_min: parseFloat(time_min),
      speed_kmh: parseFloat(speed_kmh),
      distance_km: parseFloat(distance_km),
      weight_kg: weight_kg ? parseFloat(weight_kg) || null : null,
    };
    if (isNaN(record.time_min) || isNaN(record.speed_kmh) || isNaN(record.distance_km)) {
      return [];
    }
    return [record];
  });
}

export async function initCsv(csvPath: string): Promise<void> {
  await mkdir(dirname(csvPath), { recursive: true });
  try {
    await writeFile(csvPath, HEADER + "\n", { flag: "wx" });
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
  }
}
