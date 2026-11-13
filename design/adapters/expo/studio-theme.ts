// Made by Universal App Studio. Reads design/tokens.json for an Expo (React Native) app.
// Change the look in Studio (it rewrites design/tokens.json), never here.
//
// Use it:
//   import { theme, navigationColors } from "../design/adapters/expo/studio-theme";
//   <View style={{ backgroundColor: theme.colors.background, borderRadius: theme.radius.md }} />
// Fonts: load the two fonts named in theme.fonts with expo-font (the @expo-google-fonts packages
// have them), and use the loaded names in your text styles.
import tokens from "../../tokens.json";

type Tokens = {
  name?: string;
  color: Record<string, string>;
  font: { display: string; body: string };
  radius: Record<string, string>;
  space: number[];
};
const t = tokens as unknown as Tokens;
const px = (v: string | undefined, fallback: number) => (v ? parseInt(v, 10) : NaN) || fallback;

export const colors = {
  background: t.color.bg,
  surface: t.color.surface,
  text: t.color.text,
  textMuted: t.color["text-muted"],
  primary: t.color.primary,
  onPrimary: t.color["on-primary"],
  accent: t.color.accent,
  onAccent: t.color["on-accent"],
};
export const fonts = { display: t.font.display, body: t.font.body };
export const radius = { sm: px(t.radius.sm, 4), md: px(t.radius.md, 8), lg: px(t.radius.lg, 16), pill: 999 };
export const space = t.space;
export const theme = { name: t.name || "New project", colors, fonts, radius, space };

/** For React Navigation: spread into its default theme's colours so headers and tab bars match. */
export const navigationColors = {
  primary: colors.primary,
  background: colors.background,
  card: colors.surface,
  text: colors.text,
  border: colors.textMuted,
  notification: colors.accent,
};
