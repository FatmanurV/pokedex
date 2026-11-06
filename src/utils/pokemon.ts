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

/**
 * `pikachu` → `https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pokémon)`.
 * Names with punctuation (Mr. Mime, Farfetch'd) are not handled.
 */
export function getBulbapediaUrl(speciesName: string): string {
  return `https://bulbapedia.bulbagarden.net/wiki/${formatName(speciesName).replace(/ /g, '_')}_(Pokémon)`;
}

/** `Pikachu #025 – Electric` and the Bulbapedia link on the next line. Two types: `Grass/Poison`. */
export function getShareMessage(pokemon: {
  id: number;
  name: string;
  speciesName: string;
  types: string[];
}): string {
  const types = pokemon.types.map(formatName).join('/');
  return `${formatName(pokemon.name)} #${formatNumber(pokemon.id)} – ${types}\n${getBulbapediaUrl(pokemon.speciesName)}`;
}

/** Hectograms → `6.9 kg`. */
export function formatWeight(hectograms: number): string {
  return `${hectograms / 10} kg`;
}

/** Decimetres → `0.7 m`. */
export function formatHeight(decimetres: number): string {
  return `${decimetres / 10} m`;
}

/** `64` → `64 XP`. Some forms have no base experience: `–`. */
export function formatBaseExperience(baseExperience: number | null): string {
  return baseExperience === null ? '–' : `${baseExperience} XP`;
}

/** `hp` → `HP`, `special-attack` → `Special Attack`. */
export function formatStatName(name: string): string {
  return name === 'hp' ? 'HP' : formatName(name);
}

/** The highest base stat any Pokémon has. */
const MAX_BASE_STAT = 255;

/** How full a stat bar is, from 0 to 1. */
export function getStatRatio(value: number): number {
  return Math.min(Math.max(value / MAX_BASE_STAT, 0), 1);
}

/** The shape of a step in `/evolution-chain/{id}`. */
type EvolutionStep = {
  species: { name: string; url: string };
  evolves_to: EvolutionStep[];
};

/**
 * The whole chain as one list, top to bottom. Branches follow each other:
 * Oddish → Gloom → Vileplume, Bellossom gives Oddish, Gloom, Vileplume, Bellossom.
 */
export function flattenEvolutionChain(step: EvolutionStep): { id: number; name: string }[] {
  return [
    { id: getIdFromUrl(step.species.url), name: step.species.name },
    ...step.evolves_to.flatMap(flattenEvolutionChain),
  ];
}
