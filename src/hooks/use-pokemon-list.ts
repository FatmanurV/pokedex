import { useQuery } from '@tanstack/react-query';

import { getPokemonList } from '@/services/pokeapi';

const ONE_HOUR = 60 * 60 * 1000;

/** Every Pokémon name and id. Used by the list and by search. */
export function usePokemonList() {
  return useQuery({
    queryKey: ['pokemon-list'],
    queryFn: getPokemonList,
    staleTime: ONE_HOUR,
  });
}
