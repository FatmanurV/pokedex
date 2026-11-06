import { useQuery } from '@tanstack/react-query';

import { ONE_HOUR } from '@/constants/query';
import { getPokemonList } from '@/services/pokeapi';

/** Every Pokémon name and id. Used by the list and by search. */
export function usePokemonList() {
  return useQuery({
    queryKey: ['pokemon-list'],
    queryFn: getPokemonList,
    staleTime: ONE_HOUR,
  });
}
