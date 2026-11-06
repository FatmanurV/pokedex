import { getIdFromUrl } from '@/utils/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';
const SPRITES_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

type NamedApiResource = { name: string; url: string };

type PokemonListResponse = {
  count: number;
  results: NamedApiResource[];
};

export type PokemonSummary = { id: number; name: string };

export async function getPokemonList(): Promise<PokemonSummary[]> {
  const response = await fetch(`${API_URL}/pokemon?limit=100000`);
  if (!response.ok) {
    throw new Error(`Could not load the Pokémon (${response.status})`);
  }
  const data: PokemonListResponse = await response.json();
  return data.results.map((result) => ({ id: getIdFromUrl(result.url), name: result.name }));
}

/** Pixel sprite for cards. Built from the id, no request needed. */
export function getSpriteUrl(id: number): string {
  return `${SPRITES_URL}/${id}.png`;
}

/** Official artwork for the detail screen. Built from the id, no request needed. */
export function getArtworkUrl(id: number): string {
  return `${SPRITES_URL}/other/official-artwork/${id}.png`;
}

/** `/pokemon/{id}`, only the fields we use. */
type PokemonResponse = {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  species: NamedApiResource;
  types: { slot: number; type: NamedApiResource }[];
  abilities: { ability: NamedApiResource }[];
  stats: { base_stat: number; stat: NamedApiResource }[];
};

export type PokemonStat = { name: string; value: number };

export type Pokemon = {
  id: number;
  name: string;
  /** Not the same as `id` for forms (10001 and up), so it comes from `species.url`. */
  speciesId: number;
  baseExperience: number | null;
  /** In decimetres. */
  height: number;
  /** In hectograms. */
  weight: number;
  types: string[];
  abilities: string[];
  stats: PokemonStat[];
};

export async function getPokemon(id: number): Promise<Pokemon> {
  const response = await fetch(`${API_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Could not load this Pokémon (${response.status})`);
  }
  const data: PokemonResponse = await response.json();
  return {
    id: data.id,
    name: data.name,
    speciesId: getIdFromUrl(data.species.url),
    baseExperience: data.base_experience,
    height: data.height,
    weight: data.weight,
    types: [...data.types].sort((a, b) => a.slot - b.slot).map((item) => item.type.name),
    abilities: data.abilities.map((item) => item.ability.name),
    stats: data.stats.map((item) => ({ name: item.stat.name, value: item.base_stat })),
  };
}

/** `/pokemon-species/{id}`, only the link to the evolution chain. */
type PokemonSpeciesResponse = {
  evolution_chain: { url: string } | null;
};

export type PokemonSpecies = { evolutionChainId: number | null };

export async function getPokemonSpecies(speciesId: number): Promise<PokemonSpecies> {
  const response = await fetch(`${API_URL}/pokemon-species/${speciesId}`);
  if (!response.ok) {
    throw new Error(`Could not load the evolutions (${response.status})`);
  }
  const data: PokemonSpeciesResponse = await response.json();
  return { evolutionChainId: data.evolution_chain ? getIdFromUrl(data.evolution_chain.url) : null };
}

/** One step in an evolution chain, with the steps that evolve from it. */
export type EvolutionNode = {
  species: NamedApiResource;
  evolves_to: EvolutionNode[];
};

type EvolutionChainResponse = {
  id: number;
  chain: EvolutionNode;
};

/** `/evolution-chain/{id}`. Returns the first step of the chain. */
export async function getEvolutionChain(chainId: number): Promise<EvolutionNode> {
  const response = await fetch(`${API_URL}/evolution-chain/${chainId}`);
  if (!response.ok) {
    throw new Error(`Could not load the evolutions (${response.status})`);
  }
  const data: EvolutionChainResponse = await response.json();
  return data.chain;
}
