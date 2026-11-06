import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addFavorite,
  type Favorite,
  getFavorites,
  isFavorite,
  removeFavorite,
} from '@/services/favorites-db';

/** All favorites from SQLite, newest first. */
export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });
}

/** Whether this Pokémon is a favorite. Waits while the id is `undefined`. */
export function useIsFavorite(id: number | undefined) {
  return useQuery({
    queryKey: ['favorites', id],
    queryFn: id === undefined ? skipToken : () => isFavorite(id),
  });
}

type ToggleFavorite = Favorite & { isFavorite: boolean };

/**
 * Adds the Pokémon, or removes it when `isFavorite` is true. Optimistic: the heart and the
 * Favorites tab change at once and go back if SQLite fails.
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (toggle: ToggleFavorite) =>
      toggle.isFavorite ? removeFavorite(toggle.id) : addFavorite(toggle.id, toggle.name),
    onMutate: async (toggle: ToggleFavorite) => {
      // Stop running fetches, so they can't overwrite the optimistic state.
      await queryClient.cancelQueries({ queryKey: ['favorites'] });

      const previousList = queryClient.getQueryData<Favorite[]>(['favorites']);
      const previousIsFavorite = queryClient.getQueryData<boolean>(['favorites', toggle.id]);

      queryClient.setQueryData<boolean>(['favorites', toggle.id], !toggle.isFavorite);
      // Not loaded yet (the tab was never opened): leave it, it loads fresh later.
      queryClient.setQueryData<Favorite[]>(['favorites'], (list) => {
        if (!list) return list;
        const others = list.filter((favorite) => favorite.id !== toggle.id);
        return toggle.isFavorite ? others : [{ id: toggle.id, name: toggle.name }, ...others];
      });

      return { previousList, previousIsFavorite };
    },
    onError: (_error, toggle, context) => {
      queryClient.setQueryData(['favorites'], context?.previousList);
      queryClient.setQueryData(['favorites', toggle.id], context?.previousIsFavorite);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });
}
