import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AboutTab } from '@/components/about-tab';
import { type DetailTab, DetailTabBar } from '@/components/detail-tab-bar';
import { ErrorView } from '@/components/error-view';
import { EvolutionTab } from '@/components/evolution-tab';
import { HeaderButton } from '@/components/header-button';
import { StatsTab } from '@/components/stats-tab';
import { TypeChip } from '@/components/type-chip';
import { Fonts, Spacing } from '@/constants/theme';
import { useEvolutionChain } from '@/hooks/use-evolution-chain';
import { useIsFavorite, useToggleFavorite } from '@/hooks/use-favorites';
import { usePokemon } from '@/hooks/use-pokemon';
import { usePokemonSpecies } from '@/hooks/use-pokemon-species';
import { useTheme } from '@/hooks/use-theme';
import { getArtworkUrl, getSpriteUrl } from '@/services/pokeapi';
import { flattenEvolutionChain, formatName, formatNumber } from '@/utils/pokemon';

const SIDE_PADDING = Spacing.four;

export default function PokemonDetailScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = Number(id);
  const [tab, setTab] = useState<DetailTab>('about');

  const pokemon = usePokemon(pokemonId);
  // Loaded here, not in the tab, so switching to Evolution shows it right away.
  const species = usePokemonSpecies(pokemon.data?.speciesId);
  const evolutionChain = useEvolutionChain(species.data?.evolutionChainId);

  const isFavorite = useIsFavorite(pokemonId);
  const toggleFavorite = useToggleFavorite();
  const favorite = isFavorite.data === true;

  function onHeartPress() {
    // The state could not be read: tapping tries again, the heart stays empty.
    if (isFavorite.isError && isFavorite.data === undefined) {
      isFavorite.refetch();
      return;
    }
    // Wait for the name and the current state, and ignore taps while a toggle is running.
    if (!pokemon.data || isFavorite.data === undefined || toggleFavorite.isPending) return;
    toggleFavorite.mutate(
      { id: pokemonId, name: pokemon.data.name, isFavorite: isFavorite.data },
      { onError: (error) => Alert.alert('Could not save favorite', error.message) },
    );
  }

  const heartButton = (
    <HeaderButton
      icon={favorite ? require('@/assets/icons/heart-filled.png') : require('@/assets/icons/heart.png')}
      tintColor={favorite ? theme.red : theme.midnight}
      accessibilityLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}
      onPress={onHeartPress}
    />
  );
  const header = (
    <Stack.Screen
      options={{
        headerRight: () => heartButton,
        unstable_headerRightItems: () => [
          { type: 'custom', element: heartButton, hidesSharedBackground: true },
        ],
      }}
    />
  );

  if (!pokemon.data) {
    return (
      <View style={[styles.center, { backgroundColor: theme.daylight }]}>
        {header}
        {pokemon.isPending ? (
          <ActivityIndicator size="large" color={theme.purple} />
        ) : (
          <ErrorView
            message={pokemon.error?.message ?? 'Something went wrong'}
            onRetry={() => pokemon.refetch()}
          />
        )}
      </View>
    );
  }

  const { data } = pokemon;
  const artworkSize = width - SIDE_PADDING * 2;

  let chain;
  if (evolutionChain.data) {
    chain = flattenEvolutionChain(evolutionChain.data);
  } else if (species.data && species.data.evolutionChainId === null) {
    // No chain: the Pokémon is the only step.
    chain = [{ id: data.speciesId, name: data.name }];
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.daylight }}
      contentContainerStyle={styles.content}>
      {header}
      <View style={styles.top}>
        <Text style={[styles.name, { color: theme.midnight }]}>
          {formatName(data.name)}{' '}
          <Text style={[styles.number, { color: theme.textFaint }]}>#{formatNumber(data.id)}</Text>
        </Text>
        <View style={styles.types}>
          {data.types.map((type) => (
            <TypeChip key={type} type={type} />
          ))}
        </View>
        <Image
          source={getArtworkUrl(data.id)}
          contentFit="contain"
          accessibilityLabel={`Artwork of ${formatName(data.name)}`}
          style={{ width: artworkSize, height: artworkSize }}
        />
      </View>
      <View style={[styles.bottom, { backgroundColor: theme.white, paddingBottom: insets.bottom + Spacing.five }]}>
        <DetailTabBar active={tab} onChange={setTab} />
        <View style={styles.tabContent}>
          {tab === 'about' && <AboutTab pokemon={data} />}
          {tab === 'stats' && <StatsTab stats={data.stats} />}
          {tab === 'evolution' && (
            <EvolutionTab
              chain={chain?.map((step) => ({ ...step, spriteUrl: getSpriteUrl(step.id) }))}
              error={species.error ?? evolutionChain.error}
              onRetry={() => (species.error ? species.refetch() : evolutionChain.refetch())}
              currentId={data.id}
              onPressPokemon={(stepId) =>
                router.push({ pathname: '/pokemon/[id]', params: { id: stepId } })
              }
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  // flexGrow so the white part reaches the bottom of the screen when the content is short.
  content: { flexGrow: 1 },
  top: { paddingHorizontal: SIDE_PADDING, paddingTop: Spacing.three, gap: Spacing.three },
  name: { fontFamily: Fonts.bold, fontSize: 32 },
  number: { fontFamily: Fonts.regular, fontSize: 32 },
  types: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  bottom: { flexGrow: 1, paddingHorizontal: SIDE_PADDING },
  tabContent: { paddingTop: Spacing.four },
});
