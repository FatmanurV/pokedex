import { Fragment } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ErrorView } from '@/components/error-view';
import { EvolutionCard } from '@/components/evolution-card';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  /** The whole chain, top to bottom. Undefined while it loads or when it failed. */
  chain: { id: number; name: string; spriteUrl: string }[] | undefined;
  error: Error | null;
  onRetry: () => void;
  /** The Pokémon on this screen. Its card does nothing when tapped. */
  currentId: number;
  onPressPokemon: (id: number) => void;
};

export function EvolutionTab({ chain, error, onRetry, currentId, onPressPokemon }: Props) {
  const theme = useTheme();

  if (chain) {
    return (
      <View>
        {chain.map((step, index) => (
          <Fragment key={step.id}>
            {index > 0 && <DottedLine color={theme.divider} />}
            <EvolutionCard
              id={step.id}
              name={step.name}
              spriteUrl={step.spriteUrl}
              onPress={step.id === currentId ? undefined : () => onPressPokemon(step.id)}
            />
          </Fragment>
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.state}>
        <ErrorView message={error.message} onRetry={onRetry} />
      </View>
    );
  }

  return (
    <View style={styles.state}>
      <ActivityIndicator size="large" color={theme.purple} />
    </View>
  );
}

const DOT_COUNT = 4;
const DOT_SIZE = 4;

/** A column of dots. React Native can't draw a dotted border on one side on iOS. */
function DottedLine({ color }: { color: string }) {
  return (
    <View style={styles.line}>
      {Array.from({ length: DOT_COUNT }, (_, index) => (
        <View key={index} style={[styles.dot, { backgroundColor: color }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  state: { paddingVertical: Spacing.five },
  line: { alignItems: 'center', gap: Spacing.one, paddingVertical: Spacing.two },
  dot: { width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2 },
});
