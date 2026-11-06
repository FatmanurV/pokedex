import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Share } from 'react-native';

import type { ShareState } from '@/components/options-menu';
import { useIsFavorite, useToggleFavorite } from '@/hooks/use-favorites';
import { usePokemon } from '@/hooks/use-pokemon';
import { getShareMessage } from '@/utils/pokemon';

type Selected = { id: number; name: string };

/**
 * The props for `OptionsMenu`, for the Pokémon whose ⋮ was tapped (`null` while the menu is
 * closed): its favorite state, the types for the share text, and what each item does.
 */
export function usePokemonOptions(selected: Selected | null, onClose: () => void) {
  // Keep the last Pokémon while the menu fades out, so its labels don't change.
  const [shown, setShown] = useState(selected);
  if (selected !== null && selected !== shown) {
    setShown(selected);
  }

  const pokemon = usePokemon(shown?.id);
  const isFavorite = useIsFavorite(shown?.id);
  const toggleFavorite = useToggleFavorite();
  const isSharing = useRef(false);

  let shareState: ShareState;
  if (pokemon.data) {
    shareState = 'ready';
  } else if (pokemon.isPending || pokemon.isFetching) {
    shareState = 'loading';
  } else {
    shareState = 'error';
  }

  function onOpen() {
    if (!shown) return;
    onClose();
    router.push({ pathname: '/pokemon/[id]', params: { id: shown.id } });
  }

  function onToggleFavorite() {
    if (!shown) return;
    // The state could not be read: tapping tries again.
    if (isFavorite.isError && isFavorite.data === undefined) {
      isFavorite.refetch();
      return;
    }
    // Wait for the current state, and ignore taps while a toggle is running.
    if (isFavorite.data === undefined || toggleFavorite.isPending) return;
    toggleFavorite.mutate(
      { id: shown.id, name: shown.name, isFavorite: isFavorite.data },
      { onError: (error) => Alert.alert('Could not save favorite', error.message) },
    );
    onClose();
  }

  async function onShare() {
    if (!pokemon.data) {
      pokemon.refetch();
      return;
    }
    if (isSharing.current) return;
    isSharing.current = true;
    try {
      // Close after the share sheet: on iOS it may not show while the menu is still closing.
      await Share.share({ message: getShareMessage(pokemon.data) });
      onClose();
    } catch (error) {
      Alert.alert('Could not share', error instanceof Error ? error.message : undefined);
    } finally {
      isSharing.current = false;
    }
  }

  function onCompare() {
    if (!shown) return;
    onClose();
    router.push({ pathname: '/compare', params: { first: shown.id } });
  }

  return {
    visible: selected !== null,
    isFavorite: isFavorite.data === true,
    shareState,
    onOpen,
    onToggleFavorite,
    onShare,
    onCompare,
    onClose,
  };
}
