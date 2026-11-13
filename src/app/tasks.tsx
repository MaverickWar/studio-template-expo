import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/screen';
import { Button, Card, Empty, Input, TaskRow, fontFamily } from '@/components/ui';
import { update, useApp } from '@/lib/store';
import { addTask, filterTasks, removeTask, toggleTask, type Filter } from '@/lib/tasks';
import { theme } from '../../design/adapters/expo/studio-theme';

export default function Tasks() {
  const { tasks } = useApp();
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const shown = filterTasks(tasks, filter);
  const add = () => {
    update((s) => ({ tasks: addTask(s.tasks, title) }));
    setTitle('');
  };

  return (
    <Screen title="Tasks" subtitle="Add what needs doing and tick it off.">
      <Card>
        <View style={styles.addRow}>
          <Input value={title} onChangeText={setTitle} placeholder="What needs doing?" accessibilityLabel="New task" returnKeyType="done" onSubmitEditing={add} />
          <Button label="Add" onPress={add} disabled={!title.trim()} />
        </View>
        <View style={styles.tabs} role="tablist">
          {(['all', 'open', 'done'] as const).map((f) => (
            <Pressable key={f} role="tab" aria-selected={filter === f} onPress={() => setFilter(f)} style={[styles.tab, filter === f && styles.tabOn]}>
              <Text style={[styles.tabText, filter === f && { color: theme.colors.text }]}>{f[0].toUpperCase() + f.slice(1)}</Text>
            </Pressable>
          ))}
        </View>
        {shown.length ? (
          shown.map((t) => (
            <TaskRow key={t.id} task={t} onToggle={() => update((s) => ({ tasks: toggleTask(s.tasks, t.id) }))} onRemove={() => update((s) => ({ tasks: removeTask(s.tasks, t.id) }))} />
          ))
        ) : (
          <Empty title={filter === 'done' ? 'Nothing done yet' : 'No tasks here'} text={filter === 'done' ? 'Ticked tasks show up here.' : 'Add your first one above.'} />
        )}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  addRow: { flexDirection: 'row', gap: 10 },
  tabs: { flexDirection: 'row', gap: 4, padding: 4, borderRadius: theme.radius.md, backgroundColor: theme.colors.background, alignSelf: 'flex-start' },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: theme.radius.md - 2 },
  tabOn: { backgroundColor: theme.colors.surface },
  tabText: { fontFamily: fontFamily.body, fontWeight: '600', color: theme.colors.textMuted },
});
