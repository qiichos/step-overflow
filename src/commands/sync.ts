import { defineCommand } from "citty";
import { consola } from "consola";
import { loadConfig } from "../lib/config.js";
import { gitPush, hasUnpushedCommits } from "../lib/git.js";

export const syncCommand = defineCommand({
  meta: { name: "sync", description: "Push unpushed commits to GitHub" },
  run: async () => {
    const config = await loadConfig();
    const cwd = config.local_path;

    if (!(await hasUnpushedCommits(cwd))) {
      consola.info("Nothing to push. Already in sync.");
      return;
    }

    consola.start("Pushing to GitHub...");
    try {
      await gitPush(cwd);
      consola.success("Pushed successfully.");
    } catch (e) {
      const err = e as { message?: string };
      consola.error(`Push failed: ${err.message}`);
      process.exit(1);
    }
  },
});
