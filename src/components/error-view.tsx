import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = { message: string; onRetry: () => void };

export function ErrorView({ message, onRetry }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.message, { color: theme.midnight }]}>{message}</Text>
      <Pressable onPress={onRetry} style={[styles.button, { backgroundColor: theme.purple }]}>
        <Text style={[styles.buttonLabel, { color: theme.white }]}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three },
  message: { fontFamily: Fonts.regular, fontSize: 16, textAlign: 'center' },
  button: { paddingHorizontal: Spacing.three, paddingVertical: Spacing.two, borderRadius: Radius.s },
  buttonLabel: { fontFamily: Fonts.semiBold, fontSize: 16 },
});
