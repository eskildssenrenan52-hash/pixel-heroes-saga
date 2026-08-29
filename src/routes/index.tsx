import { createFileRoute } from "@tanstack/react-router";
import { BattleScene } from "@/components/game/BattleScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Floresta Sombria — Batalha Automática Pixel RPG" },
      {
        name: "description",
        content:
          "Protótipo de RPG pixel art com batalhas automáticas: seus heróis atacam sozinhos em ondas de inimigos cada vez mais fortes.",
      },
      { property: "og:title", content: "Floresta Sombria — Batalha Automática Pixel RPG" },
      {
        property: "og:description",
        content: "Batalha automática em pixel art: assista seus heróis enfrentarem ondas de inimigos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <BattleScene />;
}
