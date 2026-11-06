import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Keyboard, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CompareEmptySide, CompareSide } from '@/components/compare-side';
import { CompareStats } from '@/components/compare-stats';
import { ErrorView } from '@/components/error-view';
import { PokemonGrid } from '@/components/pokemon-grid';
import { SearchField } from '@/components/search-field';
import { Fonts, Spacing } from '@/constants/theme';
import { usePokemon } from '@/hooks/use-pokemon';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import { useTheme } from '@/hooks/use-theme';
import { filterByName, parsePokemonId } from '@/utils/pokemon';

const SIDE_PADDING = Spacing.four;
const GAP = Spacing.three;

export default function CompareScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams<{ first: string; second?: string }>();
  // Like the detail screen: a bad id gets the normal "not found" error.
  const firstId = Number(params.first);
  const parsedSecond = parsePokemonId(params.second);
  const secondId = parsedSecond === firstId ? undefined : parsedSecond;
  const [query, setQuery] = useState('');

  const first = usePokemon(firstId);
  const second = usePokemon(secondId);
  const list = usePokemonList();

  const halfSize = (width - SIDE_PADDING * 2 - GAP) / 2;

  function onPick(id: number) {
    Keyboard.dismiss();
    setQuery('');
    router.setParams({ second: String(id) });
  }

  function onChange() {
    router.setParams({ second: undefined });
  }

  const firstSide = (
    <CompareSide
      size={halfSize}
      pokemon={first.data}
      isPending={first.isPending}
      error={first.error}
      onRetry={() => first.refetch()}
    />
  );

  if (secondId === undefined) {
    let empty;
    if (list.data) {
      empty = <Text style={[styles.empty, { color: theme.textMuted }]}>No Pokémon found</Text>;
    } else if (list.isPending) {
      empty = <ActivityIndicator size="large" color={theme.purple} style={styles.listState} />;
    } else {
      empty = (
        <View style={styles.listState}>
          <ErrorView message={list.error?.message ?? 'Something went wrong'} onRetry={() => list.refetch()} />
        </View>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor: theme.daylight }]}>
        <PokemonGrid
          pokemon={list.data ? filterByName(list.data, query).filter((pokemon) => pokemon.id !== firstId) : []}
          onPressPokemon={onPick}
          ListEmptyComponent={empty}
          ListHeaderComponent={
            <View style={styles.pickerHeader}>
              <View style={styles.halves}>
                {firstSide}
                <CompareEmptySide size={halfSize} />
              </View>
              <SearchField value={query} onChangeText={setQuery} />
            </View>
          }
        />
      </View>
    );
  }

  // The stats wait for both. If one failed, its half shows the error and the stats stay empty.
  let stats = null;
  if (first.data && second.data) {
    stats = <CompareStats first={first.data.stats} second={second.data.stats} />;
  } else if (!(first.isError && !first.data) && !(second.isError && !second.data)) {
    stats = <ActivityIndicator size="large" color={theme.purple} />;
  }

  return (
    <ScrollView style={{ backgroundColor: theme.daylight }} contentContainerStyle={styles.content}>
      <View style={[styles.halves, styles.top]}>
        {firstSide}
        <CompareSide
          size={halfSize}
          pokemon={second.data}
          isPending={second.isPending}
          error={second.error}
          onRetry={() => second.refetch()}
          onChange={onChange}
        />
      </View>
      <View style={[styles.bottom, { backgroundColor: theme.white, paddingBottom: insets.bottom + Spacing.five }]}>
        {stats}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  // flexGrow so the white part reaches the bottom of the screen when the content is short.
  content: { flexGrow: 1 },
  halves: { flexDirection: 'row', alignItems: 'flex-start', gap: GAP },
  top: { paddingHorizontal: SIDE_PADDING, paddingTop: Spacing.three, paddingBottom: Spacing.four },
  bottom: { flexGrow: 1, paddingHorizontal: SIDE_PADDING, paddingTop: Spacing.four },
  pickerHeader: { paddingTop: Spacing.three, gap: Spacing.four },
  listState: { paddingTop: Spacing.five },
  empty: { fontFamily: Fonts.regular, fontSize: 16, textAlign: 'center', paddingTop: Spacing.five },
});
