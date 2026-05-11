export type CaseItem = {
  id: string;
  name: string;
  price: number;
  artIndex: number;
  tone: "gold" | "orange" | "amber" | "green" | "ruby";
  rarity?: "legend" | "epic" | "rare" | "basic";
  tag?: string;
};

export type DropItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  artIndex: number;
  rarity: "consumer" | "industrial" | "milSpec" | "restricted" | "classified" | "covert" | "gold";
  kind?: "gold" | "common";
};

export const liveDrops: DropItem[] = [
  { id: "drop-1", name: "Crossfade", price: 98.5, image: "/live-skins/skin-0.png", artIndex: 0, rarity: "covert", kind: "gold" },
  { id: "drop-2", name: "The End", price: 74.2, image: "/live-skins/skin-1.png", artIndex: 2, rarity: "classified", kind: "gold" },
  { id: "drop-3", name: "90s Print", price: 61.8, image: "/live-skins/skin-2.png", artIndex: 4, rarity: "restricted", kind: "common" },
  { id: "drop-4", name: "Kintsugi", price: 18.8, image: "/live-skins/skin-3.png", artIndex: 1, rarity: "milSpec", kind: "common" },
  { id: "drop-5", name: "Deathgaze", price: 10.4, image: "/live-skins/skin-4.png", artIndex: 3, rarity: "industrial", kind: "common" },
  { id: "drop-6", name: "Crossfade", price: 199.0, image: "/live-skins/skin-0.png", artIndex: 5, rarity: "gold", kind: "gold" },
  { id: "drop-7", name: "The End", price: 421.0, image: "/live-skins/skin-1.png", artIndex: 6, rarity: "gold", kind: "gold" },
  { id: "drop-8", name: "90s Print", price: 125.0, image: "/live-skins/skin-2.png", artIndex: 7, rarity: "gold", kind: "gold" },
  { id: "drop-9", name: "Crossfade", price: 42.1, image: "/live-skins/skin-0.png", artIndex: 8, rarity: "covert", kind: "gold" },
  { id: "drop-10", name: "Kintsugi", price: 7.2, image: "/live-skins/skin-3.png", artIndex: 9, rarity: "milSpec", kind: "common" },
  { id: "drop-11", name: "90s Print", price: 14.9, image: "/live-skins/skin-2.png", artIndex: 10, rarity: "restricted", kind: "common" },
  { id: "drop-12", name: "The End", price: 53.4, image: "/live-skins/skin-1.png", artIndex: 11, rarity: "classified", kind: "gold" },
];

export const cases: CaseItem[] = [
  { id: "bamboo-vault", name: "Bamboo Vault", price: 98500, artIndex: 0, tone: "gold", rarity: "legend", tag: "hot" },
  { id: "ivory-box", name: "Ivory Box", price: 790, artIndex: 1, tone: "orange", rarity: "basic" },
  { id: "onyx-trophy", name: "Onyx Trophy", price: 74200, artIndex: 2, tone: "ruby", rarity: "legend" },
  { id: "honey-bag", name: "Honey Bag", price: 5600, artIndex: 3, tone: "amber", rarity: "rare" },
  { id: "jade-sun", name: "Jade Sun", price: 61800, artIndex: 4, tone: "green", rarity: "epic" },
  { id: "cream-relic", name: "Cream Relic", price: 10400, artIndex: 5, tone: "orange", rarity: "rare" },
  { id: "lucky-drum", name: "Lucky Drum", price: 8800, artIndex: 6, tone: "ruby", rarity: "rare" },
  { id: "gold-lantern", name: "Gold Lantern", price: 19900, artIndex: 7, tone: "gold", rarity: "epic" },
  { id: "panda-vault", name: "Panda Vault", price: 42100, artIndex: 8, tone: "green", rarity: "epic", tag: "new" },
  { id: "bamboo-pack", name: "Bamboo Pack", price: 1250, artIndex: 9, tone: "green", rarity: "basic" },
  { id: "royal-box", name: "Royal Box", price: 31900, artIndex: 10, tone: "gold", rarity: "epic" },
  { id: "jade-crown", name: "Jade Crown", price: 38600, artIndex: 8, tone: "green", rarity: "epic" },
  { id: "fortune-case", name: "Fortune Case", price: 2400, artIndex: 11, tone: "amber", rarity: "basic" },
  { id: "soft-starter", name: "Soft Starter", price: 490, artIndex: 1, tone: "orange", rarity: "basic" },
  { id: "green-cache", name: "Green Cache", price: 14900, artIndex: 4, tone: "green", rarity: "rare" },
  { id: "ember-drum", name: "Ember Drum", price: 13600, artIndex: 6, tone: "ruby", rarity: "rare" },
  { id: "sunny-cookie", name: "Sunny Cookie", price: 3200, artIndex: 11, tone: "amber", rarity: "basic" },
  { id: "cream-guard", name: "Cream Guard", price: 7100, artIndex: 5, tone: "orange", rarity: "rare" },
  { id: "gold-cache", name: "Gold Cache", price: 53400, artIndex: 10, tone: "gold", rarity: "legend" },
  { id: "imperial-drum", name: "Imperial Drum", price: 88900, artIndex: 6, tone: "ruby", rarity: "legend" },
  { id: "sun-temple", name: "Sun Temple", price: 67500, artIndex: 7, tone: "gold", rarity: "legend" },
];

export const stats = [
  { label: "Онлайн", value: "1 573" },
  { label: "Открыто кейсов", value: "8 420 318" },
  { label: "Дропов сегодня", value: "42 109" },
  { label: "Лучший дроп", value: "98 500" },
];

export const rouletteItems = liveDrops;
export const drops = liveDrops;
export const premiumCases = cases.slice(0, 4);
