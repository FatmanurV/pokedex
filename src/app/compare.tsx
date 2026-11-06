import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Placeholder so "Compare" in the options menu has a route. Issue #6 builds the screen. */
export default function CompareScreen() {
  const theme = useTheme();
  const { first } = useLocalSearchParams<{ first?: string }>();

  return (
    <View style={[styles.center, { backgroundColor: theme.daylight }]}>
      <Text style={[styles.text, { color: theme.textMuted }]}>Compare #{first} comes with issue #6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.four },
  text: { fontFamily: Fonts.regular, fontSize: 16, textAlign: 'center' },
});
