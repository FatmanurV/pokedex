import { skipToken, useQuery } from '@tanstack/react-query';

import { ONE_HOUR } from '@/constants/query';
import { getPokemon } from '@/services/pokeapi';

/**
 * Everything `/pokemon/{id}` gives: types, stats, height, weight, base experience, abilities.
 * Waits while the id is `undefined`.
 */
export function usePokemon(id: number | undefined) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: id === undefined ? skipToken : () => getPokemon(id),
    staleTime: ONE_HOUR,
  });
}
