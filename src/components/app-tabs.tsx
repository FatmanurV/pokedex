import { NativeTabs } from 'expo-router/native-tabs';

import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function AppTabs() {
  const theme = useTheme();
  const label = { fontFamily: Fonts.medium, fontSize: 12 };

  return (
    <NativeTabs
      backgroundColor={theme.white}
      indicatorColor={theme.daylight}
      iconColor={{ default: theme.tabInactive, selected: theme.purple }}
      labelStyle={{
        default: { ...label, color: theme.tabInactive },
        selected: { ...label, color: theme.purple },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Pokémons</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={{
            default: require('@/assets/icons/pokeball.png'),
            selected: require('@/assets/icons/pokeball-filled.png'),
          }}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorites">
        <NativeTabs.Trigger.Label>Favorites</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={{
            default: require('@/assets/icons/heart.png'),
            selected: require('@/assets/icons/heart-filled.png'),
          }}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
