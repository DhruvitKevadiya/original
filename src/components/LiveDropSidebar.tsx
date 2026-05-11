import { drops } from "@/data/mock";

const rarityClass = {
  consumer: "bg-slate-400/16 text-slate-200",
  industrial: "bg-cyan-300/16 text-cyan-100",
  milSpec: "bg-blue-400/16 text-blue-100",
  restricted: "bg-purple-400/16 text-purple-100",
  classified: "bg-pink-400/16 text-pink-100",
  covert: "bg-red-400/16 text-red-100",
  gold: "bg-honey-300/16 text-honey-300",
};

export function LiveDropSidebar() {
  return (
    <aside className="hidden w-[260px] shrink-0 overflow-hidden rounded-[28px] border border-transparent bg-cocoa-850 shadow-soft xl:block">
      <div className="border-b border-transparent bg-cocoa-800 px-5 py-4">
        <h2 className="text-lg font-black text-white">Live drop</h2>
      </div>
      <div className="max-h-[820px] space-y-2 overflow-y-auto p-3 hide-scrollbar">
        {drops.map((drop) => (
          <div key={drop.id} className="flex items-center gap-3 rounded-3xl bg-cocoa-900/76 p-3 shadow-insetWarm">
            <span className={`grid h-12 w-12 place-items-center rounded-2xl ${rarityClass[drop.rarity]}`}>
              <img src={drop.image} alt="" className="h-9 w-11 object-contain" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-amber-50">{drop.name}</p>
              <p className="mt-1 text-xs font-black text-honey-300">€{drop.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
