import { NativeTabs } from 'expo-router/native-tabs';

import { theme } from '../../design/adapters/expo/studio-theme';

// The phone tab bar, in the project's colours.
export default function AppTabs() {
  const { colors } = theme;
  return (
    <NativeTabs backgroundColor={colors.surface} indicatorColor={colors.background} iconColor={{ default: colors.textMuted, selected: colors.primary }} labelStyle={{ default: { color: colors.textMuted }, selected: { color: colors.primary } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Overview</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/home.png')} renderingMode="template" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tasks">
        <NativeTabs.Trigger.Label>Tasks</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/tasks.png')} renderingMode="template" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/settings.png')} renderingMode="template" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
