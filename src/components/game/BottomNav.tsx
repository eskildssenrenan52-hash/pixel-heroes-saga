import { Link } from "@tanstack/react-router";
import { Swords, Sparkles, Users } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Batalha", icon: Swords },
  { to: "/gacha", label: "Invocar", icon: Sparkles },
  { to: "/heroes", label: "Heróis", icon: Users },
] as const;

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-20 mt-auto grid grid-cols-3 gap-1 border-t border-border bg-card/95 p-2 backdrop-blur">
      {ITEMS.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-muted-foreground transition-colors hover:bg-secondary"
          activeProps={{ className: "bg-secondary text-accent" }}
          activeOptions={{ exact: to === "/" }}
        >
          <Icon className="size-5" />
          <span className="font-pixel text-[8px]">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
