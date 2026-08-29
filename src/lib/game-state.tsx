import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CHAR_BY_ID, rollCharacter, xpToNext, type Character } from "./characters";

export type OwnedHero = { id: string; level: number; xp: number; shards: number };

export type GameState = {
  gems: number;
  heroes: Record<string, OwnedHero>;
  party: string[]; // até 3 ids
  bestWave: number;
};

const STORAGE_KEY = "pixel-gacha-save-v1";

const INITIAL: GameState = {
  gems: 300,
  heroes: { knight: { id: "knight", level: 1, xp: 0, shards: 0 } },
  party: ["knight"],
  bestWave: 1,
};

export const PARTY_LIMIT = 3;
export const PULL_COST = 100;

type Ctx = {
  state: GameState;
  ready: boolean;
  addGems: (n: number) => void;
  pull: () => { character: Character; duplicate: boolean } | null;
  toggleParty: (id: string) => void;
  grantXp: (gained: Record<string, number>) => string[];
  registerWave: (wave: number) => void;
  reset: () => void;
};

const GameContext = createContext<Ctx | null>(null);

function load(): GameState {
  if (typeof window === "undefined") return INITIAL;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL;
    const parsed = JSON.parse(raw) as GameState;
    if (!parsed.heroes || Object.keys(parsed.heroes).length === 0) return INITIAL;
    return { ...INITIAL, ...parsed };
  } catch {
    return INITIAL;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(INITIAL);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  const addGems = useCallback((n: number) => {
    setState((s) => ({ ...s, gems: s.gems + n }));
  }, []);

  const pull = useCallback<Ctx["pull"]>(() => {
    if (state.gems < PULL_COST) return null;
    const character = rollCharacter();
    let duplicate = false;
    setState((s) => {
      if (s.gems < PULL_COST) return s;
      const existing = s.heroes[character.id];
      duplicate = Boolean(existing);
      const heroes = { ...s.heroes };
      heroes[character.id] = existing
        ? { ...existing, shards: existing.shards + 1 }
        : { id: character.id, level: 1, xp: 0, shards: 0 };
      return { ...s, gems: s.gems - PULL_COST, heroes };
    });
    return { character, duplicate };
  }, [state.gems]);

  const toggleParty = useCallback((id: string) => {
    setState((s) => {
      if (s.party.includes(id)) {
        if (s.party.length === 1) return s;
        return { ...s, party: s.party.filter((p) => p !== id) };
      }
      if (s.party.length >= PARTY_LIMIT) return s;
      return { ...s, party: [...s.party, id] };
    });
  }, []);

  const grantXp = useCallback<Ctx["grantXp"]>((gained) => {
    const leveled: string[] = [];
    setState((s) => {
      const heroes = { ...s.heroes };
      for (const [id, amount] of Object.entries(gained)) {
        const hero = heroes[id];
        if (!hero) continue;
        let { level, xp } = hero;
        xp += amount;
        while (xp >= xpToNext(level) && level < 60) {
          xp -= xpToNext(level);
          level += 1;
          leveled.push(CHAR_BY_ID[id]?.name ?? id);
        }
        heroes[id] = { ...hero, level, xp };
      }
      return { ...s, heroes };
    });
    return leveled;
  }, []);

  const registerWave = useCallback((wave: number) => {
    setState((s) => (wave > s.bestWave ? { ...s, bestWave: wave } : s));
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  const value = useMemo(
    () => ({ state, ready, addGems, pull, toggleParty, grantXp, registerWave, reset }),
    [state, ready, addGems, pull, toggleParty, grantXp, registerWave, reset],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame precisa estar dentro de GameProvider");
  return ctx;
}
