import knight from "@/assets/sprites/knight.png";
import firemage from "@/assets/sprites/firemage.png";
import orc from "@/assets/sprites/orcberserker.png";
import slime from "@/assets/sprites/slimeking.png";
import ghost from "@/assets/sprites/ghost.png";
import golem from "@/assets/sprites/golem.png";
import werewolf from "@/assets/sprites/werewolf.png";
import demon from "@/assets/sprites/demon.png";
import dragonknight from "@/assets/sprites/dragonknight.png";

export type Fighter = {
  id: string;
  name: string;
  sheet: string;
  maxHp: number;
  attack: number;
  speed: number; // segundos entre ataques
};

export const HERO: Fighter = {
  id: "knight",
  name: "Cavaleiro",
  sheet: knight,
  maxHp: 220,
  attack: 22,
  speed: 1.1,
};

export const ALLY: Fighter = {
  id: "firemage",
  name: "Maga de Fogo",
  sheet: firemage,
  maxHp: 140,
  attack: 30,
  speed: 1.6,
};

export const ENEMIES: Fighter[] = [
  { id: "slime", name: "Rei Slime", sheet: slime, maxHp: 120, attack: 10, speed: 1.8 },
  { id: "ghost", name: "Espectro", sheet: ghost, maxHp: 150, attack: 13, speed: 1.5 },
  { id: "orc", name: "Orc Berserker", sheet: orc, maxHp: 200, attack: 16, speed: 1.4 },
  { id: "werewolf", name: "Lobisomem", sheet: werewolf, maxHp: 240, attack: 19, speed: 1.2 },
  { id: "golem", name: "Golem de Pedra", sheet: golem, maxHp: 320, attack: 22, speed: 2 },
  { id: "demon", name: "Demônio", sheet: demon, maxHp: 380, attack: 26, speed: 1.3 },
  {
    id: "dragonknight",
    name: "Cavaleiro Dragão",
    sheet: dragonknight,
    maxHp: 460,
    attack: 30,
    speed: 1.2,
  },
];
