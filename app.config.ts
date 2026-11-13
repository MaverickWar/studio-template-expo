// The app's settings. Its name and splash colours come from design/tokens.json (Universal App Studio
// writes it), so they follow the look you choose in Studio.
import type { ConfigContext, ExpoConfig } from 'expo/config';

import tokens from './design/tokens.json';

const slug = (tokens.name || 'studio-app').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'studio-app';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: tokens.name || 'App',
  slug,
  scheme: slug,
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  android: {
    adaptiveIcon: {
      backgroundColor: tokens.color.bg,
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: { output: 'server', favicon: './assets/images/favicon.png' },
  plugins: [
    'expo-router',
    'expo-sqlite',
    ['expo-splash-screen', { backgroundColor: tokens.color.bg, image: './assets/images/splash-icon.png', imageWidth: 96 }],
  ],
  experiments: { typedRoutes: true, reactCompiler: true },
});
