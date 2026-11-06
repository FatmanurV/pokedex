import { StyleSheet, Text, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { PokemonStat } from '@/services/pokeapi';
import {
  formatStatName,
  getStatRatio,
  getStatTotal,
  getStatWinner,
  type StatWinner,
} from '@/utils/pokemon';

type Props = { first: PokemonStat[]; second: PokemonStat[] };

/**
 * Per stat both values, with a bar per side that grows outward from the centre (relative to 255).
 * The higher side is bold and purple. Below a line, the totals.
 */
export function CompareStats({ first, second }: Props) {
  const theme = useTheme();
  const firstTotal = getStatTotal(first);
  const secondTotal = getStatTotal(second);
  const totalWinner = getStatWinner(firstTotal, secondTotal);

  function valueStyle(winner: StatWinner, side: 'first' | 'second') {
    return winner === side
      ? { fontFamily: Fonts.bold, color: theme.purple }
      : { fontFamily: Fonts.regular, color: theme.textMuted };
  }

  function barColor(winner: StatWinner, side: 'first' | 'second') {
    return winner === side ? theme.purple : theme.barMuted;
  }

  return (
    <View style={styles.list}>
      {first.map((stat) => {
        const label = formatStatName(stat.name);
        // Matched by name, not by position.
        const secondValue = second.find((other) => other.name === stat.name)?.value ?? 0;
        const winner = getStatWinner(stat.value, secondValue);
        return (
          <View
            key={stat.name}
            style={styles.stat}
            accessible
            accessibilityLabel={`${label}: ${stat.value} against ${secondValue}`}>
            <Text style={[styles.label, { color: theme.midnight }]}>{label}</Text>
            <View style={styles.row}>
              <Text style={[styles.value, styles.left, valueStyle(winner, 'first')]}>{stat.value}</Text>
              <View style={[styles.track, styles.towardsCentre, { backgroundColor: theme.track }]}>
                <View
                  style={[
                    styles.fill,
                    {
                      width: `${getStatRatio(stat.value) * 100}%`,
                      backgroundColor: barColor(winner, 'first'),
                    },
                  ]}
                />
              </View>
              <View style={[styles.track, { backgroundColor: theme.track }]}>
                <View
                  style={[
                    styles.fill,
                    {
                      width: `${getStatRatio(secondValue) * 100}%`,
                      backgroundColor: barColor(winner, 'second'),
                    },
                  ]}
                />
              </View>
              <Text style={[styles.value, styles.right, valueStyle(winner, 'second')]}>{secondValue}</Text>
            </View>
          </View>
        );
      })}
      <View style={[styles.divider, { backgroundColor: theme.divider }]} />
      <View style={styles.row} accessible accessibilityLabel={`Total: ${firstTotal} against ${secondTotal}`}>
        <Text style={[styles.value, styles.left, valueStyle(totalWinner, 'first')]}>{firstTotal}</Text>
        <Text style={[styles.label, styles.totalLabel, { color: theme.midnight }]}>Total</Text>
        <Text style={[styles.value, styles.right, valueStyle(totalWinner, 'second')]}>{secondTotal}</Text>
      </View>
    </View>
  );
}

const BAR_HEIGHT = 4;

const styles = StyleSheet.create({
  list: { gap: Spacing.three },
  stat: { gap: Spacing.two },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  label: { fontFamily: Fonts.semiBold, fontSize: 16, textAlign: 'center' },
  totalLabel: { flex: 1 },
  // 40 so three digits fit in bold.
  value: { width: 40, fontSize: 16 },
  left: { textAlign: 'left' },
  right: { textAlign: 'right' },
  track: { flex: 1, height: BAR_HEIGHT, borderRadius: Radius.pill, overflow: 'hidden' },
  // The first Pokémon's bar fills from the centre to the left.
  towardsCentre: { flexDirection: 'row', justifyContent: 'flex-end' },
  fill: { height: BAR_HEIGHT, borderRadius: Radius.pill },
  divider: { height: StyleSheet.hairlineWidth },
});
