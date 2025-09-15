
export function formatTitle(rawTitle: string): string {
  if (!rawTitle) return "";

  const onlyEnglish = rawTitle.replace(/[^a-zA-Z ]/g, " ");

  const normalized = onlyEnglish.trim().replace(/\s+/g, " ");

  return normalized
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
