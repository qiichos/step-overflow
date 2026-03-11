import { defineCommand } from "citty";
import { consola } from "consola";
import { join } from "node:path";
import { homedir } from "node:os";
import { mkdir, writeFile } from "node:fs/promises";
import {
  configExists,
  saveConfig,
  getPagesUrl,
  type Config,
  type JourneyState,
} from "../lib/config.js";
import { ROUTES, formatRouteOption } from "../lib/routes.js";
import {
  checkPrerequisites,
  isGhAuthenticated,
  getGhUsername,
  createRepo,
  gitInit,
  gitAdd,
  gitCommit,
  gitAddRemote,
  gitPushFirst,
  enableGitHubPages,
} from "../lib/git.js";
import { initCsv } from "../lib/csv.js";
import { generateIndexHtml } from "../lib/html.js";
import { promptText, promptSelect, promptConfirm } from "../lib/prompt.js";

interface InitInputs {
  repoName: string;
  visibility: "public" | "private";
  defaultSpeed: number;
  weightKg: number | null;
}

async function promptRepoName(current?: string): Promise<string> {
  return promptText("Repository name:", {
    placeholder: "my-walking-log",
    default: current ?? "my-walking-log",
  });
}

async function promptVisibility(current?: string): Promise<"public" | "private"> {
  return promptSelect("Repository visibility:", ["private", "public"], current);
}

async function promptSpeed(current?: number): Promise<number> {
  while (true) {
    const val = await promptText("Default walking speed (km/h):", {
      placeholder: "4.0",
      default: String(current ?? 4.0),
    });
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) return parsed;
    consola.warn("Please enter a valid positive number.");
  }
}

async function promptWeight(current?: number | null): Promise<number | null> {
  while (true) {
    const val = await promptText(
      current ? `Weight (kg) [optional, current: ${current}]:` : "Weight (kg) [optional]:",
      { placeholder: "" }
    );
    if (!val) return null;
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) return parsed;
    consola.warn("Please enter a valid positive number, or press Enter to skip.");
  }
}

async function promptInputs(): Promise<InitInputs> {
  const inputs: InitInputs = {
    repoName: await promptRepoName(),
    visibility: await promptVisibility(),
    defaultSpeed: await promptSpeed(),
    weightKg: await promptWeight(),
  };

  while (true) {
    const weightDisplay = inputs.weightKg ? `${inputs.weightKg} kg` : "not set";
    consola.box(
      `Repository:  ${inputs.repoName} (${inputs.visibility})\n` +
        `Speed:       ${inputs.defaultSpeed} km/h\n` +
        `Weight:      ${weightDisplay}`
    );

    if (await promptConfirm("Confirm settings?", true)) break;

    const field = await promptSelect("Which setting to change?", [
      "Repository name",
      "Visibility",
      "Speed",
      "Weight",
    ]);

    switch (field) {
      case "Repository name":
        inputs.repoName = await promptRepoName(inputs.repoName);
        break;
      case "Visibility":
        inputs.visibility = await promptVisibility(inputs.visibility);
        break;
      case "Speed":
        inputs.defaultSpeed = await promptSpeed(inputs.defaultSpeed);
        break;
      case "Weight":
        inputs.weightKg = await promptWeight(inputs.weightKg);
        break;
    }
  }

  return inputs;
}

export const initCommand = defineCommand({
  meta: { name: "init", description: "Initialize step-overflow" },
  run: async () => {
    if (configExists()) {
      consola.error(
        "step-overflow is already initialized. Config exists at ~/.step-overflow/config.json"
      );
      consola.info(
        "To re-initialize, delete ~/.step-overflow/ and the local repo directory first."
      );
      process.exit(1);
    }

    // 1. Check prerequisites
    const prereqs = await checkPrerequisites();
    if (!prereqs.git) {
      consola.error("git is not installed. Please install git first.");
      process.exit(1);
    }
    if (!prereqs.gh) {
      consola.error(
        "GitHub CLI (gh) is not installed. Install from https://cli.github.com/"
      );
      process.exit(1);
    }

    consola.start("Checking GitHub CLI authentication...");
    if (!(await isGhAuthenticated())) {
      consola.error(
        "GitHub CLI is not authenticated. Run `gh auth login` first."
      );
      process.exit(1);
    }
    consola.success("GitHub CLI authenticated.");

    const username = await getGhUsername();

    // 2. Prompt inputs
    const { repoName, visibility, defaultSpeed, weightKg } = await promptInputs();

    const fullName = `${username}/${repoName}`;
    const localPath = join(homedir(), "step-overflow", repoName);

    // 3. Choose journey route
    const routeOptions = ROUTES.map(formatRouteOption);
    const selectedOption = await promptSelect("Choose your journey:", routeOptions);
    const selectedRoute = ROUTES[routeOptions.indexOf(selectedOption)];

    const journey: JourneyState = {
      route_id: selectedRoute.id,
      started_at: new Date().toISOString().slice(0, 19),
      started_km: 0,
      completed_routes: [],
    };

    // Build config early so we can pass it to HTML generator
    const config: Config = {
      repo: fullName,
      local_path: localPath,
      default_speed: defaultSpeed,
      weight_kg: weightKg,
      username,
      visibility,
      journey,
      achievements: {},
    };

    // 4. Create GitHub repo
    consola.start(`Creating repository ${fullName} (${visibility})...`);
    try {
      await createRepo(repoName, visibility);
      consola.success("Repository created.");
    } catch (e) {
      const err = e as { stderr?: string; message?: string };
      if (err.stderr?.includes("already exists")) {
        consola.warn("Repository already exists on GitHub, continuing...");
      } else {
        consola.error(`Failed to create repository: ${err.message}`);
        process.exit(1);
      }
    }

    // 5. Create local directory and init git
    consola.start(`Setting up local directory: ${localPath}`);
    await mkdir(localPath, { recursive: true });
    await gitInit(localPath);
    await gitAddRemote(fullName, localPath);

    // 6. Create initial files
    const csvPath = join(localPath, "data", "walking.csv");
    await initCsv(csvPath);

    const docsDir = join(localPath, "docs");
    await mkdir(docsDir, { recursive: true });
    await writeFile(join(docsDir, "index.html"), generateIndexHtml(config));

    // 7. Initial commit and push
    consola.start("Committing and pushing initial files...");
    await gitAdd(["data/walking.csv", "docs/index.html"], localPath);
    await gitCommit("Initial commit by step-overflow", localPath);
    try {
      await gitPushFirst(localPath);
      consola.success("Pushed to GitHub.");
    } catch (e) {
      const err = e as { message?: string };
      consola.warn(`Push failed: ${err.message}. You can retry with \`stp sync\`.`);
    }

    // 8. Enable GitHub Pages for public repos
    if (visibility === "public") {
      consola.start("Enabling GitHub Pages...");
      const pagesOk = await enableGitHubPages(fullName);
      if (pagesOk) {
        consola.success("GitHub Pages enabled.");
      } else {
        consola.warn("Could not enable GitHub Pages automatically. Enable it manually in repo settings.");
      }
    }

    // 9. Save config and display summary
    await saveConfig(config);

    const pagesUrl = getPagesUrl(config);
    consola.box(
      `step-overflow initialized!\n\n` +
        `Repo:    ${fullName}\n` +
        `Local:   ${localPath}\n` +
        `Speed:   ${defaultSpeed} km/h\n` +
        (weightKg ? `Weight:  ${weightKg} kg\n` : "") +
        `Journey: ${selectedRoute.from} \u2192 ${selectedRoute.to} (${selectedRoute.total_km.toLocaleString()} km)\n` +
        (pagesUrl
          ? `Pages:   ${pagesUrl}`
          : `Visibility: private (use \`stp open\` to view locally)`)
    );
  },
});
