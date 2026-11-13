// Building blocks in the project's look. Every colour, corner and font comes from design/tokens.json
// through design/adapters/expo/studio-theme.ts.
import { Platform, Pressable, StyleSheet, Text, TextInput, View, type PressableProps, type TextProps, type TextInputProps, type ViewProps } from 'react-native';

import { theme } from '../../design/adapters/expo/studio-theme';
import type { Task } from '@/lib/tasks';

const { colors, radius } = theme;
// On the web the fonts load from Google Fonts (see app/_layout.tsx). On phones the system font is used
// until you add the two fonts with expo-font (see docs/STACK-NOTES.md).
export const fontFamily = {
  display: Platform.select({ web: `'${theme.fonts.display}', Georgia, serif`, default: undefined }),
  body: Platform.select({ web: `'${theme.fonts.body}', system-ui, sans-serif`, default: undefined }),
};

export function Title({ style, ...p }: TextProps) {
  return <Text accessibilityRole="header" style={[s.title, style]} {...p} />;
}
export function Body({ muted, style, ...p }: TextProps & { muted?: boolean }) {
  return <Text style={[s.body, muted && { color: colors.textMuted }, style]} {...p} />;
}
export function Card({ style, ...p }: ViewProps) {
  return <View style={[s.card, style]} {...p} />;
}

export function Button({ label, variant = 'primary', style, ...p }: PressableProps & { label: string; variant?: 'primary' | 'ghost' }) {
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      style={(state) => [s.button, primary ? s.primary : s.ghost, state.pressed && { opacity: 0.85 }, p.disabled && { opacity: 0.5 }, typeof style === 'function' ? style(state) : style]}
      {...p}>
      <Text style={[s.buttonText, { color: primary ? colors.onPrimary : colors.text }]}>{label}</Text>
    </Pressable>
  );
}

export function Input(p: TextInputProps) {
  return <TextInput placeholderTextColor={colors.textMuted} {...p} style={[s.input, p.style]} />;
}

export function TaskRow({ task, onToggle, onRemove }: { task: Task; onToggle: () => void; onRemove?: () => void }) {
  return (
    <View style={s.task}>
      <Pressable role="checkbox" aria-checked={task.done} aria-label={task.title} onPress={onToggle} style={s.taskMain} hitSlop={6}>
        <View style={[s.box, task.done && s.boxOn]}>{task.done && <Text style={s.tick}>✓</Text>}</View>
        <Text style={[s.body, s.taskText, task.done && s.taskDone]}>{task.title}</Text>
      </Pressable>
      {onRemove && (
        <Pressable accessibilityRole="button" accessibilityLabel={`Delete "${task.title}"`} onPress={onRemove} hitSlop={8} style={({ pressed }) => [s.remove, pressed && { opacity: 0.6 }]}>
          <Text style={s.removeText}>Delete</Text>
        </Pressable>
      )}
    </View>
  );
}

export function Empty({ title, text }: { title: string; text: string }) {
  return (
    <View style={s.empty}>
      <Text style={[s.body, { fontWeight: '700' }]}>{title}</Text>
      <Body muted>{text}</Body>
    </View>
  );
}

export const s = StyleSheet.create({
  title: { fontFamily: fontFamily.display, fontSize: 32, lineHeight: 38, fontWeight: '700', color: colors.text },
  body: { fontFamily: fontFamily.body, fontSize: 16, lineHeight: 23, color: colors.text },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: 16, gap: 12 },
  button: { minHeight: 48, paddingHorizontal: 18, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: colors.primary },
  ghost: { borderWidth: 1, borderColor: colors.textMuted + '55' },
  buttonText: { fontFamily: fontFamily.body, fontSize: 16, fontWeight: '600' },
  input: { flex: 1, minHeight: 48, paddingHorizontal: 14, borderRadius: radius.md, borderWidth: 1, borderColor: colors.textMuted + '55', backgroundColor: colors.background, color: colors.text, fontFamily: fontFamily.body, fontSize: 16 },
  task: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 12, borderRadius: radius.md, backgroundColor: colors.background },
  taskMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 32 },
  box: { width: 24, height: 24, borderRadius: 7, borderWidth: 2, borderColor: colors.textMuted, alignItems: 'center', justifyContent: 'center' },
  boxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  tick: { color: colors.onPrimary, fontSize: 14, fontWeight: '700', lineHeight: 16 },
  taskText: { flex: 1 },
  taskDone: { color: colors.textMuted, textDecorationLine: 'line-through' },
  remove: { paddingHorizontal: 8, paddingVertical: 6 },
  removeText: { fontFamily: fontFamily.body, color: colors.textMuted, fontSize: 14, fontWeight: '600' },
  empty: { alignItems: 'center', gap: 4, paddingVertical: 28, borderRadius: radius.lg, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.textMuted + '33' },
});
