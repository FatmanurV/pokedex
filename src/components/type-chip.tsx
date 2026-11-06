import { StyleSheet, Text, View } from 'react-native';

import { Fonts, getTypeColor, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatName } from '@/utils/pokemon';

type Props = { type: string };

/** Pill with a dot in the type colour and the type name. */
export function TypeChip({ type }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.chip, { backgroundColor: theme.chip }]}>
      <View style={[styles.dot, { backgroundColor: getTypeColor(type) }]} />
      <Text style={[styles.label, { color: theme.midnight }]}>{formatName(type)}</Text>
    </View>
  );
}

const DOT_SIZE = 8;

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: 12,
    paddingVertical: Spacing.one,
    borderRadius: Radius.pill,
  },
  dot: { width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2 },
  label: { fontFamily: Fonts.regular, fontSize: 14 },
});
