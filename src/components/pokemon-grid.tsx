import type { ReactElement } from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';

import { PokemonCard } from '@/components/pokemon-card';
import { Spacing } from '@/constants/theme';
import { getSpriteUrl } from '@/services/pokeapi';

const SIDE_PADDING = Spacing.four;
const GAP = Spacing.three;

type Props = {
  pokemon: { id: number; name: string }[];
  onPressPokemon: (id: number) => void;
  /** Shown when `pokemon` is empty. */
  ListEmptyComponent: ReactElement;
};

/** Two-column grid of Pokémon cards, used by the list and the favorites. */
export function PokemonGrid({ pokemon, onPressPokemon, ListEmptyComponent }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - SIDE_PADDING * 2 - GAP) / 2;

  return (
    <FlatList
      data={pokemon}
      numColumns={2}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <PokemonCard
          id={item.id}
          name={item.name}
          spriteUrl={getSpriteUrl(item.id)}
          width={cardWidth}
          onPress={() => onPressPokemon(item.id)}
        />
      )}
      ListEmptyComponent={ListEmptyComponent}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
      initialNumToRender={8}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: SIDE_PADDING, paddingBottom: Spacing.four, gap: GAP },
  row: { gap: GAP },
});
