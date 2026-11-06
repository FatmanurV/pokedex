import { skipToken, useQuery } from '@tanstack/react-query';

import { ONE_HOUR } from '@/constants/query';
import { getPokemonSpecies } from '@/services/pokeapi';

/** Only the link to the evolution chain. Waits until the species id is known. */
export function usePokemonSpecies(speciesId: number | undefined) {
  return useQuery({
    queryKey: ['pokemon-species', speciesId],
    queryFn: speciesId === undefined ? skipToken : () => getPokemonSpecies(speciesId),
    staleTime: ONE_HOUR,
  });
}
