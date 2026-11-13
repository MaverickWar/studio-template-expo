import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Body, Button, Card, Empty, TaskRow, fontFamily } from '@/components/ui';
import { update, useApp } from '@/lib/store';
import { stats, toggleTask } from '@/lib/tasks';
import { theme } from '../../design/adapters/expo/studio-theme';

// The overview. Replace the screens with the ones drawn in Universal App Studio (design/pages/).
const greeting = () => {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
};

export default function Overview() {
  const { tasks, name } = useApp();
  const [hello] = useState(greeting);
  const s = stats(tasks);
  const next = tasks.filter((t) => !t.done).slice(0, 4);
  const percent = s.total ? Math.round(((s.total - s.open) / s.total) * 100) : 0;

  return (
    <Screen title={`${hello}${name ? `, ${name}` : ''}`} subtitle={`Here's where ${theme.name} stands today.`}>
      <View style={styles.stats}>
        {[['Open', s.open], ['Done today', s.doneToday], ['All', s.total]].map(([label, value]) => (
          <Card key={label} style={styles.stat}>
            <Body muted style={styles.label}>{label}</Body>
            <Text style={styles.number}>{value}</Text>
          </Card>
        ))}
      </View>
      <Card>
        <Text style={styles.cardTitle}>Up next</Text>
        {next.length ? next.map((t) => <TaskRow key={t.id} task={t} onToggle={() => update((st) => ({ tasks: toggleTask(st.tasks, t.id) }))} />) : <Empty title="All done" text="Nothing left to do. Enjoy it." />}
        <Button label="Add a task" onPress={() => router.navigate('/tasks')} />
      </Card>
      <Card>
        <Text style={styles.cardTitle}>Progress</Text>
        <Text style={styles.number}>{percent}%</Text>
        <View style={styles.meter} accessibilityLabel={`${percent}% of tasks done`}>
          <View style={[styles.meterFill, { width: `${percent}%` }]} />
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, gap: 2 },
  label: { fontSize: 13, fontWeight: '600' },
  number: { fontFamily: fontFamily.display, fontSize: 30, fontWeight: '700', color: theme.colors.text },
  cardTitle: { fontFamily: fontFamily.display, fontSize: 20, fontWeight: '700', color: theme.colors.text },
  meter: { height: 8, borderRadius: 99, backgroundColor: theme.colors.background, overflow: 'hidden' },
  meterFill: { height: '100%', borderRadius: 99, backgroundColor: theme.colors.accent },
});
