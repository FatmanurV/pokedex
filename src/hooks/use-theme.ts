import { Colors } from '@/constants/theme';

/** The app is light mode only: always the same palette, whatever the phone's setting. */
export function useTheme() {
  return Colors;
}
