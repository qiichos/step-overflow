import { consola } from "consola";

export async function promptText(
  message: string,
  opts?: { placeholder?: string; default?: string }
): Promise<string> {
  const val = await consola.prompt(message, { type: "text", ...opts });
  if (typeof val === "symbol") process.exit(1);
  return val as string;
}

export async function promptSelect<T extends string>(
  message: string,
  options: T[],
  initial?: string
): Promise<T> {
  const val = await consola.prompt(message, { type: "select", options, initial });
  if (typeof val === "symbol") process.exit(1);
  return val as T;
}

export async function promptConfirm(
  message: string,
  initial?: boolean
): Promise<boolean> {
  const val = await consola.prompt(message, { type: "confirm", initial });
  if (typeof val === "symbol") process.exit(1);
  return val as boolean;
}
