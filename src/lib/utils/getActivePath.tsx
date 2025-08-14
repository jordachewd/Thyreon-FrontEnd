export function getActivePath(pathname?: string | null, key?: string) {
  if (!pathname) return null;
  const theKey = key || "admin";

  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, "");
  const parts = path.split("/");

  return parts[1] === theKey && parts.length >= 3 ? parts[2] : null;
}
