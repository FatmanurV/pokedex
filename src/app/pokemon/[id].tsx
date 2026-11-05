import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatNumber } from '@/utils/pokemon';

// Placeholder so a card can open this route. Issue #3 "Detail" replaces this screen.
export default function PokemonDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={[styles.container, { backgroundColor: theme.daylight }]}>
      <Text style={[styles.number, { color: theme.midnight }]}>#{formatNumber(Number(id))}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  number: { fontFamily: Fonts.bold, fontSize: 32 },
});
