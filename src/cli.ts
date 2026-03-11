#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import { readFileSync } from "node:fs";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { syncCommand } from "./commands/sync.js";
import { openCommand } from "./commands/open.js";
import { statusCommand } from "./commands/status.js";
import { configCommand } from "./commands/config.js";
import { logCommand } from "./commands/log.js";

const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8")
);

const main = defineCommand({
  meta: {
    name: "stp",
    version,
    description: "CLI walking log tool",
  },
  subCommands: {
    init: initCommand,
    add: addCommand,
    sync: syncCommand,
    open: openCommand,
    status: statusCommand,
    config: configCommand,
    log: logCommand,
  },
});

runMain(main);
