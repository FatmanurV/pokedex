import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { DefaultTheme, router, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { HeaderButton } from '@/components/header-button';
import { Colors, Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// Light mode only: always the light navigation theme, on the design's background.
const navigationTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: Colors.daylight },
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [Fonts.regular]: require('@/assets/fonts/Rubik-Regular.ttf'),
    [Fonts.medium]: require('@/assets/fonts/Rubik-Medium.ttf'),
    [Fonts.semiBold]: require('@/assets/fonts/Rubik-SemiBold.ttf'),
    [Fonts.bold]: require('@/assets/fonts/Rubik-Bold.ttf'),
  });

  const theme = useTheme();

  // Keep the splash screen up until Rubik is ready. On a font error, go on with the system font.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const backButton = (
    <HeaderButton
      icon={require('@/assets/icons/back.png')}
      label="Vorige"
      accessibilityLabel="Vorige"
      onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
    />
  );

  // No title, "Vorige" on the left, on the daylight background. Detail and compare.
  const backHeaderOptions = {
    title: '',
    headerStyle: { backgroundColor: theme.daylight },
    headerShadowVisible: false,
    // Android and older iOS.
    headerLeft: () => backButton,
    // iOS 26: the same button, without the Liquid Glass pill behind it.
    unstable_headerLeftItems: () => [
      { type: 'custom' as const, element: backButton, hidesSharedBackground: true },
    ],
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="dark" />
      <AnimatedSplashOverlay />
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pokemon/[id]" options={backHeaderOptions} />
          <Stack.Screen name="compare" options={backHeaderOptions} />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
