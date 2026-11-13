import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Body, Button, Card, Input, fontFamily } from '@/components/ui';
import { update, useApp } from '@/lib/store';
import { sampleTasks } from '@/lib/tasks';
import { theme } from '../../design/adapters/expo/studio-theme';

export default function Settings() {
  const { name } = useApp();
  return (
    <Screen title="Settings" subtitle="Saved on this device as you type.">
      <Card>
        <Text style={styles.label} nativeID="name-label">Your name</Text>
        <View style={styles.row}>
          <Input value={name} onChangeText={(v) => update({ name: v })} placeholder="Shown on the overview" accessibilityLabelledBy="name-label" autoComplete="given-name" />
        </View>
        <Body muted>Everything here is saved on this device. Swap it for your own data when you’re ready.</Body>
        <Button variant="ghost" label="Start again with the example tasks" onPress={() => update({ tasks: sampleTasks() })} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fontFamily.body, fontWeight: '600', color: theme.colors.text },
  row: { flexDirection: 'row' },
});
