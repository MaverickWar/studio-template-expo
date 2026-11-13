import { DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { load } from '@/lib/store';

import { navigationColors, theme } from '../../design/adapters/expo/studio-theme';

// Headers and tab bars take the project's colours from design/tokens.json.
const studioNavigationTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, ...navigationColors } };

// On the web, load the project's two fonts from Google Fonts. (Phones: see docs/STACK-NOTES.md.)
if (Platform.OS === 'web' && typeof document !== 'undefined' && !document.getElementById('studio-fonts')) {
  const link = document.createElement('link');
  link.id = 'studio-fonts';
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${[...new Set([theme.fonts.display, theme.fonts.body])].map((f) => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@400;600;700`).join('&')}&display=swap`;
  document.head.appendChild(link);
}

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  useEffect(() => {
    load();
    SplashScreen.hideAsync();
  }, []);
  return (
    <ThemeProvider value={studioNavigationTheme}>
      <StatusBar style="dark" />
      <AppTabs />
    </ThemeProvider>
  );
}
