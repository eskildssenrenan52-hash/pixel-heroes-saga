import { Sprite } from "./Sprite";
import { RARITY_COLOR, RARITY_GLOW, type Character } from "@/lib/characters";

export function HeroPortrait({
  character,
  size = 72,
  className = "",
}: {
  character: Character;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid place-items-center overflow-hidden rounded-lg border bg-secondary/40 ${RARITY_COLOR[character.rarity]} ${RARITY_GLOW[character.rarity]} ${className}`}
      style={{ width: size, height: size }}
    >
      <Sprite sheet={character.sheet} row="idle" size={size} duration={0.9} />
    </div>
  );
}
