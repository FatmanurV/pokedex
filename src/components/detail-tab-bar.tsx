import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export const DETAIL_TABS = [
  { key: 'about', label: 'About' },
  { key: 'stats', label: 'Stats' },
  { key: 'evolution', label: 'Evolution' },
] as const;

export type DetailTab = (typeof DETAIL_TABS)[number]['key'];

type Props = {
  active: DetailTab;
  onChange: (tab: DetailTab) => void;
};

/** About / Stats / Evolution. The active tab is purple and underlined. */
export function DetailTabBar({ active, onChange }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.bar, { borderBottomColor: theme.divider }]} accessibilityRole="tablist">
      {DETAIL_TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={[styles.tab, { borderBottomColor: isActive ? theme.purple : 'transparent' }]}>
            <Text style={[styles.label, { color: isActive ? theme.purple : theme.tabInactive }]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const UNDERLINE = 2;

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', borderBottomWidth: 1 },
  // marginBottom -1 puts the underline over the divider instead of above it.
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderBottomWidth: UNDERLINE,
    marginBottom: -1,
  },
  label: { fontFamily: Fonts.semiBold, fontSize: 14 },
});
