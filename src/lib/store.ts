// Shared app state for every screen, saved on the device (SQLite on phones, the browser's storage on
// the web, through expo-sqlite's localStorage). Swap it for your own API or database when ready.
import 'expo-sqlite/localStorage/install';
import { useSyncExternalStore } from 'react';

import { loadTasks, sampleTasks, saveTasks, type Task } from './tasks';

const NAME_KEY = 'studio-starter:name';
type State = { tasks: Task[]; name: string };

// The web version is first drawn on the server, where nothing is saved, so every start begins with the
// examples and then loads what's saved on the device (load(), called once from app/_layout.tsx).
const initial: State = { tasks: sampleTasks(0), name: '' };
let state = initial;
let loaded = false;
const listeners = new Set<() => void>();

export function load() {
  if (loaded) return;
  loaded = true;
  state = { tasks: loadTasks(), name: globalThis.localStorage?.getItem(NAME_KEY) ?? '' };
  listeners.forEach((l) => l());
}

export function update(change: Partial<State> | ((s: State) => Partial<State>)) {
  state = { ...state, ...(typeof change === 'function' ? change(state) : change) };
  saveTasks(state.tasks);
  try {
    globalThis.localStorage?.setItem(NAME_KEY, state.name);
  } catch {
    // Keep working without saving.
  }
  listeners.forEach((l) => l());
}

export function useApp(): State {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => initial,
  );
}
