import { Image } from 'expo-image';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { ErrorView } from '@/components/error-view';
import { TypeChip } from '@/components/type-chip';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getArtworkUrl, type Pokemon } from '@/services/pokeapi';
import { formatName, formatNumber } from '@/utils/pokemon';

type Props = {
  /** Width of the half, and the size of the square artwork. */
  size: number;
  pokemon: Pokemon | undefined;
  isPending: boolean;
  error: Error | null;
  onRetry: () => void;
  /** Shows a "Change" button below the chips. */
  onChange?: () => void;
};

/** One half of the compare screen: artwork, name with number, type chips. */
export function CompareSide({ size, pokemon, isPending, error, onRetry, onChange }: Props) {
  const theme = useTheme();

  if (!pokemon) {
    return (
      <View style={[styles.side, { width: size }]}>
        {isPending ? (
          <View style={[styles.square, { width: size, height: size }]}>
            <ActivityIndicator size="large" color={theme.purple} />
          </View>
        ) : (
          <View style={{ width: size, minHeight: size }}>
            <ErrorView message={error?.message ?? 'Something went wrong'} onRetry={onRetry} />
          </View>
        )}
      </View>
    );
  }

  const name = formatName(pokemon.name);

  return (
    <View style={[styles.side, { width: size }]}>
      <Image
        source={getArtworkUrl(pokemon.id)}
        contentFit="contain"
        accessibilityLabel={`Artwork of ${name}`}
        style={{ width: size, height: size }}
      />
      <View style={styles.nameRow}>
        <Text numberOfLines={1} style={[styles.name, { color: theme.midnight }]}>
          {name}
        </Text>
        <Text style={[styles.number, { color: theme.textFaint }]}>#{formatNumber(pokemon.id)}</Text>
      </View>
      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <TypeChip key={type} type={type} />
        ))}
      </View>
      {onChange && (
        <Pressable
          onPress={onChange}
          hitSlop={Spacing.two}
          accessibilityRole="button"
          accessibilityLabel="Change the second Pokémon">
          <Text style={[styles.change, { color: theme.purple }]}>Change</Text>
        </Pressable>
      )}
    </View>
  );
}

/** The second half before a Pokémon is picked. */
export function CompareEmptySide({ size }: { size: number }) {
  const theme = useTheme();

  return (
    <View style={[styles.side, { width: size }]}>
      <View style={[styles.square, styles.empty, { width: size, height: size, backgroundColor: theme.cardImage }]}>
        <Image source={require('@/assets/icons/pokeball.png')} tintColor={theme.textFaint} style={styles.pokeball} />
      </View>
      <Text numberOfLines={1} style={[styles.name, { color: theme.textMuted }]}>
        Pick a Pokémon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  side: { alignItems: 'center', gap: Spacing.two },
  square: { alignItems: 'center', justifyContent: 'center' },
  empty: { borderRadius: Radius.m },
  pokeball: { width: 48, height: 48 },
  nameRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: Spacing.one },
  name: { flexShrink: 1, fontFamily: Fonts.semiBold, fontSize: 18 },
  number: { fontFamily: Fonts.regular, fontSize: 18 },
  types: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: Spacing.two },
  change: { fontFamily: Fonts.semiBold, fontSize: 14 },
});
