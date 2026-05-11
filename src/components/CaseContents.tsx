import { rouletteItems } from "@/data/mock";

const rarityTone = {
  consumer: "from-[#16252a] to-[#10181c]",
  industrial: "from-[#15313a] to-[#10191d]",
  milSpec: "from-[#1e1d4a] to-[#141126]",
  restricted: "from-[#3a1640] to-[#1d101f]",
  classified: "from-[#4b1531] to-[#211018]",
  covert: "from-[#4c1b13] to-[#20100c]",
  gold: "from-[#5a3b12] to-[#21170d]",
};

const rarityAccent = {
  consumer: "bg-[#6f8790]",
  industrial: "bg-[#5aa6b6]",
  milSpec: "bg-[#6f66d6]",
  restricted: "bg-[#b15ac3]",
  classified: "bg-[#d45a8c]",
  covert: "bg-[#df6b42]",
  gold: "bg-honey-300",
};

export function CaseContents() {
  const items = Array.from({ length: 30 }, (_, index) => rouletteItems[index % rouletteItems.length]);

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item, index) => (
        <article
          key={`${item.id}-content-${index}`}
          className={`group relative h-[176px] overflow-hidden rounded-[24px] bg-gradient-to-b ${rarityTone[item.rarity]} p-3 shadow-soft`}
        >
          <span className={`absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-b-full ${rarityAccent[item.rarity]}`} />
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
              <p className="truncate text-xs font-black text-white sm:text-sm">{item.name}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
