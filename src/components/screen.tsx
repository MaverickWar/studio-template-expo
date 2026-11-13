import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth } from '@/constants/theme';
import { theme } from '../../design/adapters/expo/studio-theme';

import { Body, Title } from './ui';

/** A scrolling screen with a title, sized for phones and centred on wide screens. */
export function Screen({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.inner}>
          <View style={styles.head}>
            <Title>{title}</Title>
            {subtitle ? <Body muted>{subtitle}</Body> : null}
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: BottomTabInset + 32, alignItems: 'center' },
  inner: { width: '100%', maxWidth: MaxContentWidth, gap: 16 },
  head: { gap: 4, marginBottom: 4 },
});
