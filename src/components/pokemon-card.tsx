import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatName, formatNumber } from '@/utils/pokemon';

type Props = {
  id: number;
  name: string;
  spriteUrl: string;
  width: number;
  onPress: () => void;
  /** The ⋮ icon is always shown. Its menu comes with the feature "Options menu". */
  onMorePress?: () => void;
};

export function PokemonCard({ id, name, spriteUrl, width, onPress, onMorePress }: Props) {
  const theme = useTheme();
  const displayName = formatName(name);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={displayName}
      style={[
        styles.card,
        {
          width,
          backgroundColor: theme.white,
          boxShadow: [{ offsetX: 0, offsetY: 4, blurRadius: 16, color: theme.shadow }],
        },
      ]}>
      <View style={[styles.imageArea, { width, height: width, backgroundColor: theme.cardImage }]}>
        {/* No placeholder: a missing sprite leaves the image area empty. */}
        <Image source={spriteUrl} recyclingKey={String(id)} contentFit="contain" style={styles.sprite} />
        <View style={[styles.badge, { backgroundColor: theme.purple }]}>
          <Text style={[styles.badgeText, { color: theme.white }]}>{formatNumber(id)}</Text>
        </View>
      </View>
      <View style={styles.nameRow}>
        <Text numberOfLines={1} style={[styles.name, { color: theme.midnight }]}>
          {displayName}
        </Text>
        <Pressable
          onPress={onMorePress}
          hitSlop={Spacing.two}
          accessibilityRole="button"
          accessibilityLabel={`Options for ${displayName}`}>
          <Image source={require('@/assets/icons/more.png')} tintColor={theme.midnight} style={styles.icon} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: Radius.m },
  imageArea: {
    borderTopLeftRadius: Radius.m,
    borderTopRightRadius: Radius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprite: { width: '100%', height: '100%' },
  badge: {
    position: 'absolute',
    top: Spacing.two,
    left: Spacing.two,
    paddingHorizontal: 6,
    paddingVertical: Spacing.half,
    borderRadius: Radius.xs,
  },
  badgeText: { fontFamily: Fonts.semiBold, fontSize: 12 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  name: { flex: 1, fontFamily: Fonts.semiBold, fontSize: 18 },
  icon: { width: 24, height: 24 },
});
