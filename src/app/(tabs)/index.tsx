import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorView } from '@/components/error-view';
import { PokemonCard } from '@/components/pokemon-card';
import { SearchField } from '@/components/search-field';
import { Fonts, Spacing } from '@/constants/theme';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import { useTheme } from '@/hooks/use-theme';
import { getSpriteUrl } from '@/services/pokeapi';
import { filterByName } from '@/utils/pokemon';

const SIDE_PADDING = Spacing.four;
const GAP = Spacing.three;

export default function HomeScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const { data, error, isPending, refetch } = usePokemonList();
  const [query, setQuery] = useState('');
  const cardWidth = (width - SIDE_PADDING * 2 - GAP) / 2;

  let content;
  if (isPending) {
    content = (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.purple} />
      </View>
    );
  } else if (data) {
    content = (
      <FlatList
        data={filterByName(data, query)}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PokemonCard
            id={item.id}
            name={item.name}
            spriteUrl={getSpriteUrl(item.id)}
            width={cardWidth}
            onPress={() => router.push({ pathname: '/pokemon/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.textMuted }]}>No Pokémon found</Text>
        }
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        initialNumToRender={8}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
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
  list: { paddingHorizontal: SIDE_PADDING, paddingBottom: Spacing.four, gap: GAP },
  row: { gap: GAP },
  empty: { fontFamily: Fonts.regular, fontSize: 16, textAlign: 'center', paddingTop: Spacing.five },
});
