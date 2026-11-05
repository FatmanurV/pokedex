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
