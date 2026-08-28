import { useEffect, useRef, useState } from "react";
import { Sprite, type SpriteRow } from "./Sprite";
import { ALLY, ENEMIES, HERO, type Fighter } from "@/lib/roster";

type Hit = { id: number; text: string; side: "hero" | "enemy"; crit: boolean };

type Side = {
  fighter: Fighter;
  hp: number;
  cd: number;
  anim: SpriteRow;
  animLeft: number;
  charge: number;
};

function makeSide(fighter: Fighter): Side {
  return { fighter, hp: fighter.maxHp, cd: fighter.speed, anim: "idle", animLeft: 0, charge: 0 };
}

const TICK = 0.1;

export function BattleScene() {
  const [, force] = useState(0);
  const [hits, setHits] = useState<Hit[]>([]);
  const [log, setLog] = useState<string[]>(["A batalha começou!"]);
  const [wave, setWave] = useState(1);
  const [paused, setPaused] = useState(false);

  const hero = useRef<Side>(makeSide(HERO));
  const ally = useRef<Side>(makeSide(ALLY));
  const enemy = useRef<Side>(makeSide(ENEMIES[0]));
  const waveRef = useRef(1);
  const hitId = useRef(0);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  const pushLog = (line: string) =>
    setLog((prev) => [line, ...prev].slice(0, 6));

  const pushHit = (text: string, side: "hero" | "enemy", crit: boolean) => {
    const id = hitId.current++;
    setHits((prev) => [...prev, { id, text, side, crit }]);
    setTimeout(() => setHits((prev) => prev.filter((h) => h.id !== id)), 900);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      const allies = [hero.current, ally.current];
      const foe = enemy.current;

      for (const unit of [...allies, foe]) {
        if (unit.animLeft > 0) {
          unit.animLeft -= TICK;
          if (unit.animLeft <= 0) unit.anim = "idle";
        }
      }

      // aliados atacam
      for (const unit of allies) {
        if (unit.hp <= 0 || foe.hp <= 0) continue;
        unit.cd -= TICK;
        if (unit.cd <= 0) {
          unit.cd = unit.fighter.speed;
          unit.charge += 1;
          const special = unit.charge % 4 === 0;
          unit.anim = special ? "special" : "attack";
          unit.animLeft = special ? 0.9 : 0.6;
          const dmg = Math.round(
            unit.fighter.attack * (special ? 2.4 : 1) * (0.85 + Math.random() * 0.3),
          );
          foe.hp = Math.max(0, foe.hp - dmg);
          pushHit(`-${dmg}`, "enemy", special);
          if (special) pushLog(`${unit.fighter.name} usou o ataque especial! (${dmg})`);
          if (foe.hp === 0) {
            pushLog(`${foe.fighter.name} foi derrotado!`);
            setTimeout(() => {
              waveRef.current += 1;
              setWave(waveRef.current);
              const next = ENEMIES[(waveRef.current - 1) % ENEMIES.length];
              const boost = 1 + Math.floor((waveRef.current - 1) / ENEMIES.length) * 0.6;
              enemy.current = makeSide({
                ...next,
                maxHp: Math.round(next.maxHp * boost),
                attack: Math.round(next.attack * boost),
              });
              for (const a of [hero.current, ally.current]) {
                a.hp = Math.min(a.fighter.maxHp, a.hp + Math.round(a.fighter.maxHp * 0.35));
              }
              pushLog(`Onda ${waveRef.current}: ${next.name} aparece!`);
            }, 900);
          }
        }
      }

      // inimigo ataca
      const alive = allies.filter((a) => a.hp > 0);
      if (foe.hp > 0 && alive.length > 0) {
        foe.cd -= TICK;
        if (foe.cd <= 0) {
          foe.cd = foe.fighter.speed;
          foe.charge += 1;
          const special = foe.charge % 5 === 0;
          foe.anim = special ? "special" : "attack";
          foe.animLeft = special ? 0.9 : 0.6;
          const target = alive[Math.floor(Math.random() * alive.length)];
          const dmg = Math.round(
            foe.fighter.attack * (special ? 2 : 1) * (0.85 + Math.random() * 0.3),
          );
          target.hp = Math.max(0, target.hp - dmg);
          pushHit(`-${dmg}`, "hero", special);
          if (target.hp === 0) pushLog(`${target.fighter.name} caiu!`);
        }
      }

      // derrota
      if (hero.current.hp === 0 && ally.current.hp === 0) {
        pausedRef.current = true;
        setPaused(true);
        pushLog("Seu grupo foi derrotado...");
      }

      force((n) => n + 1);
    }, TICK * 1000);
    return () => clearInterval(timer);
  }, []);

  const restart = () => {
    hero.current = makeSide(HERO);
    ally.current = makeSide(ALLY);
    waveRef.current = 1;
    setWave(1);
    enemy.current = makeSide(ENEMIES[0]);
    setLog(["A batalha começou!"]);
    setPaused(false);
  };

  const defeated = hero.current.hp === 0 && ally.current.hp === 0;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-3 p-3">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-card/80 px-3 py-2">
        <div className="min-w-0">
          <p className="truncate font-pixel text-xs text-accent">Floresta Sombria</p>
          <p className="truncate text-[10px] text-muted-foreground">Batalha automática</p>
        </div>
        <span className="shrink-0 rounded-md bg-secondary px-2 py-1 font-pixel text-[10px] text-secondary-foreground">
          Onda {wave}
        </span>
      </header>

      <div className="battle-stage relative overflow-hidden rounded-xl border border-border">
        <div className="battle-ground" />
        {hits.map((h) => (
          <span
            key={h.id}
            className={`damage-float font-pixel ${h.crit ? "text-accent text-base" : "text-destructive text-xs"}`}
            style={{ left: h.side === "hero" ? "22%" : "72%" }}
          >
            {h.text}
          </span>
        ))}

        <div className="relative flex h-full items-end justify-between px-2 pb-4">
          <div className="flex items-end gap-1">
            {[hero.current, ally.current].map((u) => (
              <div key={u.fighter.id} className={u.hp === 0 ? "opacity-30 grayscale" : ""}>
                <Sprite sheet={u.fighter.sheet} row={u.hp === 0 ? "idle" : u.anim} size={128} />
              </div>
            ))}
          </div>
          <div className={enemy.current.hp === 0 ? "opacity-20 grayscale" : ""}>
            <Sprite
              sheet={enemy.current.fighter.sheet}
              row={enemy.current.hp === 0 ? "idle" : enemy.current.anim}
              size={128}
              flip
            />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        {[hero.current, ally.current, enemy.current].map((u, i) => (
          <div
            key={u.fighter.id + i}
            className="rounded-lg border border-border bg-card/80 px-3 py-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-pixel text-[10px]">{u.fighter.name}</span>
              <span className="shrink-0 text-[10px] text-muted-foreground">
                {u.hp}/{u.fighter.maxHp}
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full transition-all duration-200 ${i === 2 ? "bg-destructive" : "bg-primary"}`}
                style={{ width: `${(u.hp / u.fighter.maxHp) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="min-h-24 flex-1 rounded-lg border border-border bg-card/60 p-3 text-[11px] leading-5 text-muted-foreground">
        {log.map((line, i) => (
          <p key={i} className={i === 0 ? "text-foreground" : ""}>
            {line}
          </p>
        ))}
      </div>

      {defeated && (
        <button
          onClick={restart}
          className="rounded-lg bg-primary px-4 py-3 font-pixel text-xs text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
