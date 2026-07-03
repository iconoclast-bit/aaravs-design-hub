import { useCallback, useEffect, useState } from 'react';

export type GameId = 'dna' | 'spot' | 'estimator' | 'roomBuilder';

export interface GameRecord {
  completed: boolean;
  perkUnlocked: boolean;
  result?: string; // e.g. DNA style label
  completedAt?: string;
}

export type GameProgress = Partial<Record<GameId, GameRecord>>;

const STORAGE_KEY = 'dba:games';

function read(): GameProgress {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GameProgress) : {};
  } catch {
    return {};
  }
}

function write(next: GameProgress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('dba:games:changed'));
  } catch {
    /* noop */
  }
}

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(() => read());

  useEffect(() => {
    const sync = () => setProgress(read());
    window.addEventListener('dba:games:changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('dba:games:changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const markCompleted = useCallback((id: GameId, patch: Partial<GameRecord> = {}) => {
    const current = read();
    const next: GameProgress = {
      ...current,
      [id]: {
        completed: true,
        perkUnlocked: true,
        completedAt: new Date().toISOString(),
        ...current[id],
        ...patch,
      },
    };
    write(next);
    setProgress(next);
  }, []);

  const reset = useCallback((id?: GameId) => {
    if (!id) {
      write({});
      setProgress({});
      return;
    }
    const current = read();
    delete current[id];
    write(current);
    setProgress({ ...current });
  }, []);

  return { progress, markCompleted, reset };
}
