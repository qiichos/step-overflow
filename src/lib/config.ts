import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export interface JourneyState {
  route_id: string;
  started_at: string;
  started_km: number;
  completed_routes: string[];
}

export interface Config {
  repo: string;
  local_path: string;
  default_speed: number;
  weight_kg: number | null;
  username: string;
  visibility: "public" | "private";
  journey?: JourneyState;
  achievements?: Record<string, string>;
}

const CONFIG_DIR = join(homedir(), ".step-overflow");
const CONFIG_PATH = join(CONFIG_DIR, "config.json");

export function configExists(): boolean {
  return existsSync(CONFIG_PATH);
}

export async function loadConfig(): Promise<Config> {
  if (!configExists()) {
    throw new Error(
      "step-overflow is not initialized. Run `stp init` first."
    );
  }
  const raw = await readFile(CONFIG_PATH, "utf-8");
  return JSON.parse(raw) as Config;
}

export async function saveConfig(config: Config): Promise<void> {
  await mkdir(CONFIG_DIR, { recursive: true });
  await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");
}

export function getCsvPath(config: Config): string {
  return join(config.local_path, "data", "walking.csv");
}

export function getPagesUrl(config: Config): string | null {
  if (config.visibility === "private") return null;
  const repoName = config.repo.split("/")[1];
  return `https://${config.username}.github.io/${repoName}/`;
}
