import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "revanio_admin";

// Deterministic session token derived from the admin password. The raw
// password is never stored in the cookie — only this hash.
export function sessionToken() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD env var is not set");
  return createHash("sha256").update(`revanio:${pw}`).digest("hex");
}

export async function isAuthed() {
  try {
    const jar = await cookies();
    return jar.get(ADMIN_COOKIE)?.value === sessionToken();
  } catch {
    return false;
  }
}
