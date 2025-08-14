export function isSamePath(path: string, target: string) {
  const p = path.replace(/\/+$/, "");  
  const t = target.replace(/\/+$/, "");
  return p === t || p.startsWith(t + "/");
}
