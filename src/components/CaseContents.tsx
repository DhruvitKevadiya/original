import { rouletteItems } from "@/data/mock";

const rarityTone = {
  consumer: "from-[#2a3a42] to-[#1a252c]",
  industrial: "from-[#2a414a] to-[#1a2a32]",
  milSpec: "from-[#3a2d5a] to-[#241836]",
  restricted: "from-[#4a2650] to-[#2d162f]",
  classified: "from-[#5b2441] to-[#321628]",
  covert: "from-[#5c2d23] to-[#30181c]",
  gold: "from-[#6a4b22] to-[#31241d]",
};

const rarityAccent = {
  consumer: "bg-[#8fa8b0]",
  industrial: "bg-[#7ac6d6]",
  milSpec: "bg-[#8f86f6]",
  restricted: "bg-[#d17ae3]",
  classified: "bg-[#f47aac]",
  covert: "bg-[#ff8b62]",
  gold: "bg-[#ffd35a]",
};

export function CaseContents() {
  const items = Array.from(
    { length: 30 },
    (_, index) => rouletteItems[index % rouletteItems.length],
  );

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item, index) => (
        <article
          key={`${item.id}-content-${index}`}
          className={`group relative h-[176px] overflow-hidden rounded-[24px] bg-gradient-to-b ${rarityTone[item.rarity]} p-3 shadow-soft`}
        >
          <span
            className={`absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-b-full ${rarityAccent[item.rarity]}`}
          />
          <img
            src="/textures/paw-mark.png"
            alt=""
            className="pointer-events-none absolute left-1/2 top-[42%] h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.18] mix-blend-soft-light"
          />
          <div className="relative flex h-full flex-col items-center justify-between gap-2">
            <div className="grid min-h-0 flex-1 place-items-center">
              <img
                src={item.image}
                alt=""
                className="h-[86%] w-[86%] object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.38)] transition duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.06]"
              />
            </div>
            <div className="w-full text-center">
              <p className="truncate text-xs font-black text-white sm:text-sm">
                {item.name}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
