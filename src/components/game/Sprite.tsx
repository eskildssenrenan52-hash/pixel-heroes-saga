export type SpriteRow = "idle" | "walk" | "attack" | "special";

const ROW_INDEX: Record<SpriteRow, number> = {
  idle: 0,
  walk: 1,
  attack: 2,
  special: 3,
};

type SpriteProps = {
  sheet: string;
  row: SpriteRow;
  size?: number;
  duration?: number;
  flip?: boolean;
  className?: string;
};

/** Sprite sheets: 5 columns (frames) x 4 rows (idle / walk / attack / special). */
export function Sprite({
  sheet,
  row,
  size = 160,
  duration = 0.7,
  flip = false,
  className,
}: SpriteProps) {
  return (
    <div
      key={row}
      className={`sprite-frame ${className ?? ""}`}
      style={
        {
          "--frame": `${size}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `url(${sheet})`,
          backgroundSize: `${size * 5}px ${size * 4}px`,
          backgroundPositionY: `${-ROW_INDEX[row] * size}px`,
          animationDuration: `${duration}s`,
          transform: flip ? "scaleX(-1)" : undefined,
        } as React.CSSProperties
      }
    />
  );
}
