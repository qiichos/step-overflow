import { defineCommand } from "citty";
import { consola } from "consola";
import { join, extname, resolve } from "node:path";
import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { loadConfig, getPagesUrl } from "../lib/config.js";
import { openInBrowser } from "../lib/open-url.js";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".csv": "text/csv",
  ".json": "application/json",
};

export const openCommand = defineCommand({
  meta: { name: "open", description: "Open walking log in browser" },
  args: {
    remote: {
      type: "boolean",
      description: "Open GitHub Pages URL instead of local file",
      default: false,
    },
  },
  run: async ({ args }) => {
    const config = await loadConfig();

    if (args.remote) {
      const url = getPagesUrl(config);
      if (!url) {
        consola.error(
          "GitHub Pages is not available for private repositories."
        );
        consola.info("Use `stp open` without --remote to open locally.");
        process.exit(1);
      }
      consola.info(`Opening ${url}`);
      await openInBrowser(url);
      return;
    }

    const repoRoot = config.local_path;
    const docsDir = join(repoRoot, "docs");
    if (!existsSync(join(docsDir, "index.html"))) {
      consola.error("docs/index.html not found. Run `stp init` first.");
      process.exit(1);
    }

    // Start local HTTP server serving the repo root
    const server = createServer(async (req, res) => {
      const rawUrl = new URL(req.url!, "http://localhost").pathname;
      const urlPath = rawUrl === "/" ? "/docs/index.html" : rawUrl;
      const filePath = resolve(repoRoot, urlPath.replace(/^\//, ""));

      // Prevent path traversal
      if (!filePath.startsWith(repoRoot + "/") && filePath !== repoRoot) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      try {
        const content = await readFile(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });

    server.listen(0, "127.0.0.1", async () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        consola.error("Failed to start server.");
        return;
      }
      const url = `http://127.0.0.1:${addr.port}`;
      consola.success(`Server running at ${url}`);
      consola.info("Press Ctrl+C to stop.");
      await openInBrowser(url);
    });
  },
});
