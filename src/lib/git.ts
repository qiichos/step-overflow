import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);

interface ExecResult {
  stdout: string;
  stderr: string;
}

async function run(
  cmd: string,
  args: string[],
  cwd?: string
): Promise<ExecResult> {
  return exec(cmd, args, { cwd });
}

export async function checkPrerequisites(): Promise<{
  git: boolean;
  gh: boolean;
}> {
  let git = false;
  let gh = false;
  try {
    await run("git", ["--version"]);
    git = true;
  } catch {}
  try {
    await run("gh", ["--version"]);
    gh = true;
  } catch {}
  return { git, gh };
}

export async function isGhAuthenticated(): Promise<boolean> {
  try {
    await run("gh", ["auth", "status"]);
    return true;
  } catch {
    return false;
  }
}

export async function getGhUsername(): Promise<string> {
  const { stdout } = await run("gh", [
    "api",
    "user",
    "--jq",
    ".login",
  ]);
  return stdout.trim();
}

export async function createRepo(
  name: string,
  visibility: "public" | "private"
): Promise<string> {
  const { stdout } = await run("gh", [
    "repo",
    "create",
    name,
    `--${visibility}`,
  ]);
  return stdout.trim();
}

export async function enableGitHubPages(
  fullName: string
): Promise<boolean> {
  try {
    await run("gh", [
      "api",
      "--method",
      "POST",
      `repos/${fullName}/pages`,
      "-f",
      "build_type=legacy",
      "-f",
      "source[branch]=main",
      "-f",
      "source[path]=/docs",
    ]);
    return true;
  } catch {
    return false;
  }
}

export async function gitAdd(
  files: string[],
  cwd: string
): Promise<void> {
  await run("git", ["add", ...files], cwd);
}

export async function gitCommit(
  message: string,
  cwd: string
): Promise<void> {
  await run("git", ["commit", "-m", message], cwd);
}

export async function gitPush(cwd: string): Promise<void> {
  await run("git", ["push"], cwd);
}

export async function hasUnpushedCommits(
  cwd: string
): Promise<boolean> {
  try {
    const { stdout } = await run(
      "git",
      ["log", "--oneline", "origin/main..HEAD"],
      cwd
    );
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

export async function gitInit(cwd: string): Promise<void> {
  await run("git", ["init"], cwd);
  await run("git", ["branch", "-M", "main"], cwd);
}

export async function gitAddRemote(
  fullName: string,
  cwd: string
): Promise<void> {
  const url = `https://github.com/${fullName}.git`;
  await run("git", ["remote", "add", "origin", url], cwd);
}

export async function gitPushFirst(cwd: string): Promise<void> {
  await run("git", ["push", "-u", "origin", "main"], cwd);
}
