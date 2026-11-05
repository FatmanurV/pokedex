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

/** 1 → `001`, 25 → `025`, 1025 and 10001 stay as they are. */
export function formatNumber(id: number): string {
  return String(id).padStart(3, '0');
}
