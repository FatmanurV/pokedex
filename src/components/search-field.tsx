import { Image } from 'expo-image';
import { StyleSheet, TextInput, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchField({ value, onChangeText }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.field,
        {
          backgroundColor: theme.white,
          boxShadow: [{ offsetX: 0, offsetY: 4, blurRadius: 16, color: theme.shadow }],
        },
      ]}>
      <Image source={require('@/assets/icons/search.png')} tintColor={theme.midnight} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for Pokémon.."
        placeholderTextColor={theme.textMuted}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        accessibilityLabel="Search for Pokémon"
        style={[styles.input, { color: theme.midnight }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    borderRadius: Radius.m,
  },
  icon: { width: 24, height: 24 },
  // Padding 0 so Android's default TextInput padding doesn't make the field taller than on iOS.
  input: { flex: 1, padding: 0, fontFamily: Fonts.regular, fontSize: 16 },
});
