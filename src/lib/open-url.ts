import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);

export async function openInBrowser(url: string): Promise<void> {
  const platform = process.platform;
  if (platform === "darwin") {
    await exec("open", [url]);
  } else if (platform === "win32") {
    await exec("cmd", ["/c", "start", "", url]);
  } else {
    await exec("xdg-open", [url]);
  }
}
