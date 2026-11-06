import { StyleSheet, Text, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { PokemonStat } from '@/services/pokeapi';
import { formatStatName, getStatRatio } from '@/utils/pokemon';

type Props = { stats: PokemonStat[] };

/** Each stat with its value and a bar relative to 255, the highest base stat. */
export function StatsTab({ stats }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.list}>
      {stats.map((stat) => {
        const label = formatStatName(stat.name);
        return (
          <View key={stat.name} style={styles.row} accessible accessibilityLabel={`${label} ${stat.value}`}>
            <Text style={[styles.label, { color: theme.midnight }]}>{label}</Text>
            <Text style={[styles.value, { color: theme.textMuted }]}>{stat.value}</Text>
            <View style={[styles.track, { backgroundColor: theme.track }]}>
              <View
                style={[
                  styles.fill,
                  { width: `${getStatRatio(stat.value) * 100}%`, backgroundColor: theme.purple },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const BAR_HEIGHT = 4;

const styles = StyleSheet.create({
  list: { gap: Spacing.three },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  // 140 so "Special Defense" fits on one line.
  label: { width: 140, fontFamily: Fonts.semiBold, fontSize: 16 },
  value: { width: 32, fontFamily: Fonts.regular, fontSize: 16, textAlign: 'right' },
  track: { flex: 1, height: BAR_HEIGHT, borderRadius: Radius.pill, overflow: 'hidden' },
  fill: { height: BAR_HEIGHT, borderRadius: Radius.pill },
});
