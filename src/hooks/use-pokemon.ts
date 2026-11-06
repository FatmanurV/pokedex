import { useQuery } from '@tanstack/react-query';

import { ONE_HOUR } from '@/constants/query';
import { getPokemon } from '@/services/pokeapi';

/** Everything `/pokemon/{id}` gives: types, stats, height, weight, base experience, abilities. */
export function usePokemon(id: number) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(id),
    staleTime: ONE_HOUR,
  });
}
