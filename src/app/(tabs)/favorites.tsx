import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorView } from '@/components/error-view';
import { PokemonGrid } from '@/components/pokemon-grid';
import { Fonts, Spacing } from '@/constants/theme';
import { useFavorites } from '@/hooks/use-favorites';
import { useTheme } from '@/hooks/use-theme';

const SIDE_PADDING = Spacing.four;

export default function FavoritesScreen() {
  const theme = useTheme();
  const { data, error, isPending, refetch } = useFavorites();

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
        pokemon={data}
        onPressPokemon={(id) => router.push({ pathname: '/pokemon/[id]', params: { id } })}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyTitle, { color: theme.midnight }]}>No favorites yet</Text>
            <Text style={[styles.emptyHint, { color: theme.textMuted }]}>
              Tap the heart on a Pokémon to save it here.
            </Text>
          </View>
        }
      />
    );
  } else {
    content = <ErrorView message={error?.message ?? 'Something went wrong'} onRetry={() => refetch()} />;
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: theme.daylight }]}>
      <Text style={[styles.title, { color: theme.midnight }]}>My favorites</Text>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    paddingHorizontal: SIDE_PADDING,
    paddingVertical: Spacing.three,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { alignItems: 'center', gap: Spacing.two, paddingTop: Spacing.five },
  emptyTitle: { fontFamily: Fonts.semiBold, fontSize: 18 },
  emptyHint: { fontFamily: Fonts.regular, fontSize: 16, textAlign: 'center' },
});
