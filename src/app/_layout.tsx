import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors, Fonts } from '@/constants/theme';

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

  // Keep the splash screen up until Rubik is ready. On a font error, go on with the system font.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="dark" />
      <AnimatedSplashOverlay />
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pokemon/[id]" options={{ title: '' }} />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
