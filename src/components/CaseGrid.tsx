import type { CaseItem } from "@/data/mock";
import { CaseCard } from "./CaseCard";

type CaseGridProps = {
  items: CaseItem[];
};

const categoryOrder: Array<NonNullable<CaseItem["rarity"]>> = ["rare", "legend", "epic", "basic"];

const categoryLabels: Record<NonNullable<CaseItem["rarity"]>, string> = {
  rare: "Rare",
  legend: "Legenda",
  epic: "Epic",
  basic: "Basic",
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
    <section id="cases" className="space-y-5">
      <div className="space-y-9">
        {groupedItems.map((group) => (
          <div key={group.rarity} className="space-y-8">
            <h3 className="text-center text-xl font-black text-white sm:text-2xl">{group.label}</h3>
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
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
