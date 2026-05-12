import type { CaseItem } from "@/data/mock";
import { CaseCard } from "./CaseCard";

type CaseGridProps = {
  items: CaseItem[];
};

const categoryOrder: Array<NonNullable<CaseItem["rarity"]>> = ["legend", "epic", "rare", "basic"];

const categoryLabels: Record<NonNullable<CaseItem["rarity"]>, string> = {
  rare: "Rare",
  legend: "Legenda",
  epic: "Epic",
  basic: "Basic",
};

const categoryDot: Record<NonNullable<CaseItem["rarity"]>, string> = {
  legend: "bg-[#ffd266] shadow-[0_0_10px_rgba(255,210,102,0.7)]",
  epic: "bg-[#b07aff] shadow-[0_0_10px_rgba(176,122,255,0.55)]",
  rare: "bg-[#6f8eff] shadow-[0_0_10px_rgba(111,142,255,0.55)]",
  basic: "bg-[#566077] shadow-[0_0_8px_rgba(86,96,119,0.5)]",
};

export function CaseGrid({ items }: CaseGridProps) {
  const groupedItems = categoryOrder
    .map((rarity) => ({
      rarity,
      label: categoryLabels[rarity],
      items: items.filter((item) => item.rarity === rarity),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="cases" className="space-y-6">
      <div className="space-y-7">
        {groupedItems.map((group) => (
          <div key={group.rarity} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${categoryDot[group.rarity]}`} />
              <h3 className="text-[13px] font-black uppercase tracking-[0.24em] text-white/85">
                {group.label}
              </h3>
              <span className="h-px flex-1 bg-gradient-to-r from-[#1a2030] via-[#1a2030]/40 to-transparent" />
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#5a6178]">
                {group.items.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item) => (
                <CaseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
