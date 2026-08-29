import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Gem, Sparkles } from "lucide-react";
import { BottomNav } from "@/components/game/BottomNav";
import { HeroPortrait } from "@/components/game/HeroPortrait";
import { Sprite } from "@/components/game/Sprite";
import {
  RARITY_COLOR,
  RARITY_LABEL,
  RARITY_RATE,
  type Character,
  type Rarity,
} from "@/lib/characters";
import { PULL_COST, useGame } from "@/lib/game-state";

export const Route = createFileRoute("/gacha")({
  head: () => ({
    meta: [
      { title: "Portal de Invocação — Gacha Pixel RPG" },
      {
        name: "description",
        content:
          "Gaste gemas no portal de invocação e recrute heróis pixel art comuns, raros, épicos e lendários para o seu grupo.",
      },
      { property: "og:title", content: "Portal de Invocação — Gacha Pixel RPG" },
      {
        property: "og:description",
        content: "Invoque heróis pixel art de 4 raridades diferentes e monte o grupo perfeito.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GachaPage,
});

function GachaPage() {
  const { state, pull } = useGame();
  const [result, setResult] = useState<{ character: Character; duplicate: boolean } | null>(null);
  const [rolling, setRolling] = useState(false);

  const canPull = state.gems >= PULL_COST;

  const doPull = () => {
    if (!canPull || rolling) return;
    const res = pull();
    if (!res) return;
    setRolling(true);
    setResult(null);
    setTimeout(() => {
      setResult(res);
      setRolling(false);
    }, 700);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-3 p-3">
      <header className="flex items-center justify-between rounded-xl border border-border bg-card/80 px-3 py-2">
        <h1 className="font-pixel text-xs text-accent">Invocação</h1>
        <span className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 font-pixel text-[10px]">
          <Gem className="size-3 text-sky-400" />
          {state.gems}
        </span>
      </header>

      <div className="battle-stage relative grid min-h-56 place-items-center overflow-hidden rounded-xl border border-border">
        <div className="battle-ground" />
        {rolling && (
          <p className="relative animate-pulse font-pixel text-[10px] text-accent">
            Invocando...
          </p>
        )}
        {!rolling && result && (
          <div className="relative flex flex-col items-center gap-2">
            <Sprite sheet={result.character.sheet} row="special" size={128} duration={0.8} />
            <p className="font-pixel text-[11px]">{result.character.name}</p>
            <p
              className={`rounded border px-2 py-0.5 font-pixel text-[8px] ${RARITY_COLOR[result.character.rarity]}`}
            >
              {RARITY_LABEL[result.character.rarity]}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {result.duplicate ? "Duplicado! +1 fragmento" : "Novo herói recrutado!"}
            </p>
          </div>
        )}
        {!rolling && !result && (
          <p className="relative font-pixel text-[9px] text-muted-foreground">
            Toque em invocar para tentar a sorte
          </p>
        )}
      </div>

      <button
        onClick={doPull}
        disabled={!canPull || rolling}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-pixel text-[10px] text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
      >
        <Sparkles className="size-4" />
        Invocar ({PULL_COST} gemas)
      </button>

      <div className="grid grid-cols-4 gap-2 rounded-lg border border-border bg-card/60 p-3">
        {(Object.keys(RARITY_RATE) as Rarity[]).map((r) => (
          <div key={r} className="text-center">
            <p className={`font-pixel text-[8px] ${RARITY_COLOR[r].split(" ")[0]}`}>
              {RARITY_LABEL[r]}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {Math.round(RARITY_RATE[r] * 100)}%
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card/60 p-3">
        <p className="mb-2 font-pixel text-[9px] text-muted-foreground">
          Coleção: {Object.keys(state.heroes).length}/40
        </p>
        <div className="grid grid-cols-6 gap-1.5">
          {Object.values(state.heroes)
            .slice(0, 18)
            .map((h) => (
              <HeroPortraitById key={h.id} id={h.id} />
            ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function HeroPortraitById({ id }: { id: string }) {
  const { CHAR_BY_ID } = require_chars();
  const ch = CHAR_BY_ID[id];
  if (!ch) return null;
  return <HeroPortrait character={ch} size={48} />;
}

function require_chars() {
  return charsModule;
}

import * as charsModule from "@/lib/characters";
