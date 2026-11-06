/** `https://pokeapi.co/api/v2/pokemon/25/` → 25 */
export function getIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}

/** `mr-mime` → `Mr Mime` */
export function formatName(name: string): string {
  return name
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Lowercase, with hyphens as spaces, so `Mr Mime` and `mr-mime` compare equal. */
function normalizeName(name: string): string {
  return name.toLowerCase().replace(/-/g, ' ');
}

/**
 * Items whose name contains the query, ignoring case and surrounding spaces.
 * `pika` and ` PIKA ` find `pikachu`, `mr mime` finds `mr-mime`. An empty query returns the list as is.
 */
export function filterByName<T extends { name: string }>(items: T[], query: string): T[] {
  const needle = normalizeName(query.trim());
  if (needle === '') {
    return items;
  }
  return items.filter((item) => normalizeName(item.name).includes(needle));
}

/** 1 → `001`, 25 → `025`, 1025 and 10001 stay as they are. */
export function formatNumber(id: number): string {
  return String(id).padStart(3, '0');
}
