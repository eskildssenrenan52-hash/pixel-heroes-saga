import angel from "@/assets/sprites/angel.png";
import archer from "@/assets/sprites/archer.png";
import bard from "@/assets/sprites/bard.png";
import beastmaster from "@/assets/sprites/beastmaster.png";
import chaoswarrior from "@/assets/sprites/chaoswarrior.png";
import cleric from "@/assets/sprites/cleric.png";
import cyborg from "@/assets/sprites/cyborg.png";
import darkknight from "@/assets/sprites/darkknight.png";
import demon from "@/assets/sprites/demon.png";
import desertnomad from "@/assets/sprites/desertnomad.png";
import dragonknight from "@/assets/sprites/dragonknight.png";
import druid from "@/assets/sprites/druid.png";
import dwarf from "@/assets/sprites/dwarf.png";
import firemage from "@/assets/sprites/firemage.png";
import forestspirit from "@/assets/sprites/forestspirit.png";
import ghost from "@/assets/sprites/ghost.png";
import gladiator from "@/assets/sprites/gladiator.png";
import golem from "@/assets/sprites/golem.png";
import icesorceress from "@/assets/sprites/icesorceress.png";
import inventor from "@/assets/sprites/inventor.png";
import knight from "@/assets/sprites/knight.png";
import monk from "@/assets/sprites/monk.png";
import moonwitch from "@/assets/sprites/moonwitch.png";
import necromancer from "@/assets/sprites/necromancer.png";
import ninja from "@/assets/sprites/ninja.png";
import orcberserker from "@/assets/sprites/orcberserker.png";
import paladin from "@/assets/sprites/paladin.png";
import phoenixmage from "@/assets/sprites/phoenixmage.png";
import pirate from "@/assets/sprites/pirate.png";
import rogue from "@/assets/sprites/rogue.png";
import samurai from "@/assets/sprites/samurai.png";
import seahunter from "@/assets/sprites/seahunter.png";
import shadowstalker from "@/assets/sprites/shadowstalker.png";
import slimeking from "@/assets/sprites/slimeking.png";
import sunpriest from "@/assets/sprites/sunpriest.png";
import thundergod from "@/assets/sprites/thundergod.png";
import valkyrie from "@/assets/sprites/valkyrie.png";
import vampire from "@/assets/sprites/vampire.png";
import voidtraveler from "@/assets/sprites/voidtraveler.png";
import werewolf from "@/assets/sprites/werewolf.png";

export type Rarity = "common" | "rare" | "epic" | "legendary";

export type Character = {
  id: string;
  name: string;
  sheet: string;
  rarity: Rarity;
  role: string;
  hp: number;
  atk: number;
  speed: number; // segundos entre ataques
};

export const RARITY_LABEL: Record<Rarity, string> = {
  common: "Comum",
  rare: "Raro",
  epic: "Épico",
  legendary: "Lendário",
};

export const RARITY_COLOR: Record<Rarity, string> = {
  common: "text-muted-foreground border-muted-foreground/40",
  rare: "text-sky-400 border-sky-400/50",
  epic: "text-fuchsia-400 border-fuchsia-400/50",
  legendary: "text-amber-400 border-amber-400/60",
};

export const RARITY_GLOW: Record<Rarity, string> = {
  common: "shadow-[0_0_0_1px_hsl(var(--border))]",
  rare: "shadow-[0_0_12px_-2px_rgb(56_189_248/0.7)]",
  epic: "shadow-[0_0_14px_-2px_rgb(232_121_249/0.7)]",
  legendary: "shadow-[0_0_18px_-2px_rgb(251_191_36/0.8)]",
};

export const RARITY_RATE: Record<Rarity, number> = {
  common: 0.58,
  rare: 0.28,
  epic: 0.11,
  legendary: 0.03,
};

const c = (
  id: string,
  name: string,
  sheet: string,
  rarity: Rarity,
  role: string,
  hp: number,
  atk: number,
  speed: number,
): Character => ({ id, name, sheet, rarity, role, hp, atk, speed });

export const CHARACTERS: Character[] = [
  // Comuns
  c("knight", "Cavaleiro", knight, "common", "Tanque", 220, 20, 1.2),
  c("archer", "Arqueiro", archer, "common", "Atirador", 150, 24, 1.0),
  c("rogue", "Ladino", rogue, "common", "Assassino", 145, 26, 0.9),
  c("cleric", "Clériga", cleric, "common", "Suporte", 175, 17, 1.3),
  c("firemage", "Maga de Fogo", firemage, "common", "Mago", 140, 28, 1.5),
  c("monk", "Monge", monk, "common", "Lutador", 185, 21, 1.0),
  c("pirate", "Pirata", pirate, "common", "Duelista", 170, 23, 1.2),
  c("dwarf", "Anão Ferreiro", dwarf, "common", "Tanque", 240, 18, 1.5),
  c("slimeking", "Rei Slime", slimeking, "common", "Tanque", 260, 14, 1.7),
  c("desertnomad", "Nômade do Deserto", desertnomad, "common", "Duelista", 165, 22, 1.1),
  // Raros
  c("samurai", "Samurai", samurai, "rare", "Duelista", 200, 32, 1.1),
  c("ninja", "Ninja", ninja, "rare", "Assassino", 170, 36, 0.85),
  c("icesorceress", "Feiticeira do Gelo", icesorceress, "rare", "Maga", 155, 38, 1.4),
  c("gladiator", "Gladiador", gladiator, "rare", "Tanque", 265, 27, 1.2),
  c("druid", "Druida", druid, "rare", "Suporte", 205, 29, 1.3),
  c("bard", "Bardo", bard, "rare", "Suporte", 180, 26, 1.1),
  c("orcberserker", "Orc Berserker", orcberserker, "rare", "Berserker", 250, 34, 1.3),
  c("seahunter", "Caçador dos Mares", seahunter, "rare", "Atirador", 190, 31, 1.1),
  c("inventor", "Inventor", inventor, "rare", "Atirador", 175, 33, 1.2),
  c("werewolf", "Lobisomem", werewolf, "rare", "Berserker", 235, 35, 1.0),
  c("ghost", "Espectro", ghost, "rare", "Assassino", 160, 34, 1.0),
  c("golem", "Golem de Pedra", golem, "rare", "Tanque", 330, 24, 1.8),
  // Épicos
  c("paladin", "Paladino", paladin, "epic", "Tanque", 330, 38, 1.2),
  c("darkknight", "Cavaleiro Negro", darkknight, "epic", "Duelista", 300, 44, 1.1),
  c("necromancer", "Necromante", necromancer, "epic", "Mago", 220, 48, 1.4),
  c("valkyrie", "Valquíria", valkyrie, "epic", "Duelista", 285, 43, 1.0),
  c("vampire", "Vampiro", vampire, "epic", "Assassino", 260, 46, 0.95),
  c("cyborg", "Ciborgue", cyborg, "epic", "Atirador", 275, 45, 1.1),
  c("shadowstalker", "Espreitador Sombrio", shadowstalker, "epic", "Assassino", 245, 50, 0.9),
  c("beastmaster", "Domador de Feras", beastmaster, "epic", "Invocador", 290, 41, 1.2),
  c("forestspirit", "Espírito da Floresta", forestspirit, "epic", "Suporte", 270, 40, 1.2),
  c("sunpriest", "Sacerdote do Sol", sunpriest, "epic", "Suporte", 260, 42, 1.25),
  c("moonwitch", "Bruxa da Lua", moonwitch, "epic", "Maga", 235, 49, 1.35),
  // Lendários
  c("dragonknight", "Cavaleiro Dragão", dragonknight, "legendary", "Duelista", 400, 60, 1.05),
  c("phoenixmage", "Maga Fênix", phoenixmage, "legendary", "Maga", 320, 68, 1.2),
  c("thundergod", "Deus do Trovão", thundergod, "legendary", "Mago", 350, 70, 1.15),
  c("angel", "Arcanjo", angel, "legendary", "Suporte", 380, 62, 1.1),
  c("demon", "Demônio", demon, "legendary", "Berserker", 410, 66, 1.15),
  c("voidtraveler", "Viajante do Vazio", voidtraveler, "legendary", "Mago", 330, 74, 1.2),
  c("chaoswarrior", "Guerreiro do Caos", chaoswarrior, "legendary", "Berserker", 395, 72, 1.1),
];

export const CHAR_BY_ID: Record<string, Character> = Object.fromEntries(
  CHARACTERS.map((ch) => [ch.id, ch]),
);

export function byRarity(rarity: Rarity) {
  return CHARACTERS.filter((ch) => ch.rarity === rarity);
}

/** Estatísticas escaladas pelo nível (+12% por nível). */
export function statsAt(ch: Character, level: number) {
  const m = 1 + (level - 1) * 0.12;
  return {
    maxHp: Math.round(ch.hp * m),
    attack: Math.round(ch.atk * m),
    speed: ch.speed,
  };
}

export function xpToNext(level: number) {
  return 40 + (level - 1) * 30;
}

export function rollRarity(): Rarity {
  const r = Math.random();
  let acc = 0;
  for (const rarity of ["legendary", "epic", "rare", "common"] as Rarity[]) {
    acc += RARITY_RATE[rarity];
    if (r < acc) return rarity;
  }
  return "common";
}

export function rollCharacter(): Character {
  const pool = byRarity(rollRarity());
  return pool[Math.floor(Math.random() * pool.length)]!;
}
