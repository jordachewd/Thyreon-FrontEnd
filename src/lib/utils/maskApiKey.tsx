/**
 * Mask an API key for display purposes.
 * Shows only the first `visibleCount` characters, masks the rest with '*'.
 *
 * @param apiKey - The full API key string
 * @param visibleCount - Number of characters to show at the start (default: 4)
 * @returns A masked string like "abcd****************"
 */

export function maskApiKey(apiKey: string, visibleCount: number = 6): string {
  if (!apiKey || typeof apiKey !== "string") return "";
  const visible = apiKey.slice(0, visibleCount);
  const masked = "*".repeat(Math.max(0, apiKey.length - visibleCount));
  return visible + masked;
}
