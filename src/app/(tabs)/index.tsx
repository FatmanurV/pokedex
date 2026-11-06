import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorView } from '@/components/error-view';
import { OptionsMenu } from '@/components/options-menu';
import { PokemonGrid } from '@/components/pokemon-grid';
import { SearchField } from '@/components/search-field';
import { Fonts, Spacing } from '@/constants/theme';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import { usePokemonOptions } from '@/hooks/use-pokemon-options';
import { useTheme } from '@/hooks/use-theme';
import type { PokemonSummary } from '@/services/pokeapi';
import { filterByName } from '@/utils/pokemon';

const SIDE_PADDING = Spacing.four;

export default function HomeScreen() {
  const theme = useTheme();
  const { data, error, isPending, refetch } = usePokemonList();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<PokemonSummary | null>(null);
  const options = usePokemonOptions(selected, () => setSelected(null));

  let content;
  if (isPending) {
    content = (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.purple} />
      </View>
    );
  } else if (data) {
    content = (
      <PokemonGrid
        pokemon={filterByName(data, query)}
        onPressPokemon={(id) => router.push({ pathname: '/pokemon/[id]', params: { id } })}
        onMorePressPokemon={setSelected}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.textMuted }]}>No Pokémon found</Text>
        }
      />
    );
  } else {
    content = <ErrorView message={error?.message ?? 'Something went wrong'} onRetry={() => refetch()} />;
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: theme.daylight }]}>
      <View style={styles.search}>
        <SearchField value={query} onChangeText={setQuery} />
      </View>
      <Text style={[styles.title, { color: theme.midnight }]}>All Pokémon</Text>
      {content}
      <OptionsMenu {...options} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: { paddingHorizontal: SIDE_PADDING, paddingTop: Spacing.three },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    paddingHorizontal: SIDE_PADDING,
    paddingVertical: Spacing.three,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { fontFamily: Fonts.regular, fontSize: 16, textAlign: 'center', paddingTop: Spacing.five },
});
