export function getActivePath(pathname?: string | null) {
  if (!pathname) return null;

  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, "");
  const parts = path.split("/");

  return parts[1] === "admin" && parts.length >= 3 ? parts[2] : null;
}
