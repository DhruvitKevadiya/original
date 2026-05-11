import type { CaseItem } from "@/data/mock";
import { CaseCard } from "./CaseCard";

export function PremiumRail({ items }: { items: CaseItem[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-black text-white sm:text-2xl">Дорогие кейсы</h2>
      <div className="grid grid-flow-col auto-cols-[282px] gap-4 overflow-x-auto pb-2 hide-scrollbar xl:grid-flow-row xl:grid-cols-4 xl:auto-cols-auto xl:overflow-visible">
        {items.map((item) => (
          <CaseCard key={item.id} item={item} compact />
        ))}
      </div>
    </section>
  );
}
