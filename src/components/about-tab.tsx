import { StyleSheet, Text, View } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Pokemon } from '@/services/pokeapi';
import {
  formatBaseExperience,
  formatHeight,
  formatName,
  formatNumber,
  formatWeight,
} from '@/utils/pokemon';

type Props = { pokemon: Pokemon };

export function AboutTab({ pokemon }: Props) {
  const theme = useTheme();

  const rows = [
    { label: 'Name', value: formatName(pokemon.name) },
    { label: 'ID', value: formatNumber(pokemon.id) },
    { label: 'Base', value: formatBaseExperience(pokemon.baseExperience) },
    { label: 'Weight', value: formatWeight(pokemon.weight) },
    { label: 'Height', value: formatHeight(pokemon.height) },
    { label: 'Types', value: pokemon.types.map(formatName).join(', ') },
    { label: 'Abilities', value: pokemon.abilities.map(formatName).join(', ') },
  ];

  return (
    <View style={styles.list}>
      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={[styles.label, { color: theme.midnight }]}>{row.label}</Text>
          <Text style={[styles.value, { color: theme.textMuted }]}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.three },
  row: { flexDirection: 'row', gap: Spacing.three },
  label: { width: 120, fontFamily: Fonts.semiBold, fontSize: 16 },
  value: { flex: 1, fontFamily: Fonts.regular, fontSize: 16 },
});
