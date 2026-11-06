import { Image, type ImageProps } from 'expo-image';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Share needs the types from `/pokemon/{id}`: loaded, still loading, or failed. */
export type ShareState = 'ready' | 'loading' | 'error';

type Props = {
  visible: boolean;
  isFavorite: boolean;
  shareState: ShareState;
  onOpen: () => void;
  onToggleFavorite: () => void;
  onShare: () => void;
  onCompare: () => void;
  /** Cancel, the overlay and the Android back button. */
  onClose: () => void;
};

/** The options of a Pokémon card: a grey overlay with a sheet at the bottom. */
export function OptionsMenu({
  visible,
  isFavorite,
  shareState,
  onOpen,
  onToggleFavorite,
  onShare,
  onCompare,
  onClose,
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.overlay }]}
        />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + Spacing.three }]}>
          <View style={[styles.group, { backgroundColor: theme.white }]}>
            <MenuRow icon={require('@/assets/icons/open.png')} label="Open Pokémon" onPress={onOpen} />
            <MenuRow
              icon={
                isFavorite
                  ? require('@/assets/icons/heart-filled.png')
                  : require('@/assets/icons/heart.png')
              }
              iconColor={isFavorite ? theme.red : undefined}
              label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              onPress={onToggleFavorite}
              divider
            />
            <MenuRow
              icon={require('@/assets/icons/share.png')}
              label={shareState === 'error' ? 'Share failed – Try again' : 'Share'}
              loading={shareState === 'loading'}
              onPress={onShare}
              divider
            />
            <MenuRow
              icon={require('@/assets/icons/compare.png')}
              label="Compare"
              onPress={onCompare}
              divider
            />
          </View>
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            style={[styles.group, styles.cancel, { backgroundColor: theme.white }]}>
            <Text style={[styles.label, { color: theme.midnight }]}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

type MenuRowProps = {
  icon: ImageProps['source'];
  label: string;
  onPress: () => void;
  /** Defaults to `midnight`. */
  iconColor?: string;
  /** A small spinner in place of the icon, and taps are ignored. */
  loading?: boolean;
  /** A line above the row. */
  divider?: boolean;
};

function MenuRow({ icon, label, onPress, iconColor, loading, divider }: MenuRowProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      accessibilityState={{ busy: loading }}
      style={[styles.row, divider && { borderTopWidth: 1, borderTopColor: theme.divider }]}>
      {loading ? (
        <ActivityIndicator size="small" color={theme.purple} style={styles.icon} />
      ) : (
        <Image source={icon} tintColor={iconColor ?? theme.midnight} style={styles.icon} />
      )}
      <Text style={[styles.label, { color: theme.midnight }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  sheet: { paddingHorizontal: Spacing.four, gap: Spacing.two },
  group: { borderRadius: Radius.l, overflow: 'hidden' },
  row: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  cancel: { height: 56, alignItems: 'center', justifyContent: 'center' },
  icon: { width: 24, height: 24 },
  label: { fontFamily: Fonts.medium, fontSize: 16 },
});
