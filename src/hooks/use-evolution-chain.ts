import { skipToken, useQuery } from '@tanstack/react-query';

import { ONE_HOUR } from '@/constants/query';
import { getEvolutionChain } from '@/services/pokeapi';

/** The whole evolution chain. Waits until the chain id is known. */
export function useEvolutionChain(chainId: number | null | undefined) {
  return useQuery({
    queryKey: ['evolution-chain', chainId],
    queryFn: chainId == null ? skipToken : () => getEvolutionChain(chainId),
    staleTime: ONE_HOUR,
  });
}
