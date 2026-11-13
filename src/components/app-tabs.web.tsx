import { Tabs, TabList, TabTrigger, TabSlot, type TabTriggerSlotProps, type TabListProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { theme } from '../../design/adapters/expo/studio-theme';
import { fontFamily } from './ui';

// On the web the tabs sit at the bottom like a phone app, centred on wide screens.
export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="index" href="/" asChild><TabButton>Overview</TabButton></TabTrigger>
          <TabTrigger name="tasks" href="/tasks" asChild><TabButton>Tasks</TabButton></TabTrigger>
          <TabTrigger name="settings" href="/settings" asChild><TabButton>Settings</TabButton></TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...(props as PressableProps)} style={({ pressed }) => [styles.tab, isFocused && styles.tabOn, pressed && { opacity: 0.8 }]}>
      <Text style={[styles.tabText, { color: isFocused ? theme.colors.onPrimary : theme.colors.textMuted }]}>{children}</Text>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.bar}>
      <View style={styles.inner}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { position: 'absolute', bottom: 0, width: '100%', padding: 12, alignItems: 'center' },
  inner: { flexDirection: 'row', gap: 4, padding: 6, borderRadius: theme.radius.pill, backgroundColor: theme.colors.surface, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
  tab: { minHeight: 44, paddingHorizontal: 18, borderRadius: theme.radius.pill, justifyContent: 'center' },
  tabOn: { backgroundColor: theme.colors.primary },
  tabText: { fontFamily: fontFamily.body, fontWeight: '600', fontSize: 15 },
});
