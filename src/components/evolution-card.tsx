import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatName } from '@/utils/pokemon';

type Props = {
  id: number;
  name: string;
  spriteUrl: string;
  /** Leave out to make the card not pressable (the Pokémon you are already on). */
  onPress?: () => void;
};

const IMAGE_SIZE = 80;

/** One step in the evolution list: sprite with number badge, name to the right. */
export function EvolutionCard({ id, name, spriteUrl, onPress }: Props) {
  const theme = useTheme();
  const displayName = formatName(name);

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={displayName}
      style={[
        styles.card,
        {
          backgroundColor: theme.white,
          boxShadow: [{ offsetX: 0, offsetY: 4, blurRadius: 16, color: theme.shadow }],
        },
      ]}>
      <View style={[styles.imageArea, { backgroundColor: theme.cardImage }]}>
        <Image source={spriteUrl} recyclingKey={String(id)} contentFit="contain" style={styles.sprite} />
        <NumberBadge id={id} />
      </View>
      <Text numberOfLines={1} style={[styles.name, { color: theme.midnight }]}>
        {displayName}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', borderRadius: Radius.m },
  imageArea: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderTopLeftRadius: Radius.m,
    borderBottomLeftRadius: Radius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sprite: { width: '100%', height: '100%' },
  name: { flex: 1, paddingHorizontal: Spacing.three, fontFamily: Fonts.semiBold, fontSize: 18 },
});
