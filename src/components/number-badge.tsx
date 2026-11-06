import { StyleSheet, Text, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatNumber } from '@/utils/pokemon';

type Props = { id: number };

/** Purple `001` badge, top left on the image of a card. */
export function NumberBadge({ id }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.badge, { backgroundColor: theme.purple }]}>
      <Text style={[styles.text, { color: theme.white }]}>{formatNumber(id)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: Spacing.two,
    left: Spacing.two,
    paddingHorizontal: 6,
    paddingVertical: Spacing.half,
    borderRadius: Radius.xs,
  },
  text: { fontFamily: Fonts.semiBold, fontSize: 12 },
});
