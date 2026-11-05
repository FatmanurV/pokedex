/**
 * Every colour, spacing, radius and font name in the app. Values from specs/design.md.
 * The app is light mode only, so there is one palette.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  midnight: '#0E0940',
  purple: '#5631E8',
  red: '#FF4F68',
  daylight: '#EDF6FF',
  white: '#FFFFFF',
  cardImage: '#F6F6FF',
  chip: 'rgba(14, 9, 64, 0.08)',
  textMuted: 'rgba(14, 9, 64, 0.65)',
  textFaint: 'rgba(14, 9, 64, 0.3)',
  tabInactive: 'rgba(14, 9, 64, 0.5)',
  divider: 'rgba(14, 9, 64, 0.15)',
  track: 'rgba(14, 9, 64, 0.05)',
  shadow: 'rgba(14, 9, 64, 0.08)',
} as const;

export type ThemeColor = keyof typeof Colors;

export const TypeColors = {
  normal: '#9099A2',
  fighting: '#CE3F6A',
  flying: '#93A9E2',
  poison: '#AB6AC8',
  ground: '#D87645',
  rock: '#C4BA85',
  bug: '#8FBF2B',
  ghost: '#546AA6',
  steel: '#5A8FA1',
  fire: '#FF4F68',
  water: '#4D90D6',
  grass: '#64BC55',
  electric: '#FFCF00',
  psychic: '#830CB9',
  ice: '#7DE0D0',
  dragon: '#0670BE',
  dark: '#5B5265',
  fairy: '#EB90E6',
  shadow: '#5C5262',
  unknown: '#B6B6B6',
} as const;

/** Rubik, loaded with `useFonts` in `src/app/_layout.tsx`. The names are the keys used there. */
export const Fonts = {
  regular: 'Rubik-Regular',
  medium: 'Rubik-Medium',
  semiBold: 'Rubik-SemiBold',
  bold: 'Rubik-Bold',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const Radius = { xs: 4, s: 8, m: 12, l: 16 } as const;
