import { Image, type ImageProps } from 'expo-image';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  icon: ImageProps['source'];
  /** Text next to the icon, like "Vorige". */
  label?: string;
  accessibilityLabel: string;
  onPress?: () => void;
  /** Icon colour from the theme. Defaults to `midnight`. */
  tintColor?: string;
};

/** Icon (and optional label) button for the stack header. */
export function HeaderButton({ icon, label, accessibilityLabel, onPress, tintColor }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      hitSlop={Spacing.two}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={styles.button}>
      <Image source={icon} tintColor={tintColor ?? theme.midnight} style={styles.icon} />
      {label && <Text style={[styles.label, { color: theme.midnight }]}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },
  icon: { width: 24, height: 24 },
  label: { fontFamily: Fonts.regular, fontSize: 16 },
});
