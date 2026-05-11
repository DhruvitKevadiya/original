import { Search } from "lucide-react";

export type PriceFilter = {
  label: string;
  min: number;
  max: number | null;
};

type CaseFiltersProps = {
  query: string;
  selectedPrice: string | null;
  onQueryChange: (value: string) => void;
  onPriceChange: (value: string | null) => void;
};

export const priceFilters: PriceFilter[] = [
  { label: "10-100", min: 10, max: 100 },
  { label: "100-199", min: 100, max: 199 },
  { label: "200-299", min: 200, max: 299 },
  { label: "300-399", min: 300, max: 399 },
  { label: "400-499", min: 400, max: 499 },
  { label: "500+", min: 500, max: null },
];

export function CaseFilters({ query, selectedPrice, onQueryChange, onPriceChange }: CaseFiltersProps) {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <label className="flex h-[46px] w-[260px] shrink-0 items-center gap-3 rounded-[19px] border border-[#242838] bg-[linear-gradient(180deg,#1b2233,#10131d)] px-4 text-[#dfe6ff]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <Search size={18} className="text-[#c6d0ec]/82" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm font-black text-white outline-none placeholder:text-[#aeb8d8]/50"
          placeholder={"Поиск кейса"}
        />
      </label>

      {priceFilters.map((price) => {
        const isSelected = selectedPrice === price.label;

        return (
          <button
            key={price.label}
            onClick={() => onPriceChange(isSelected ? null : price.label)}
            className={`inline-flex h-[46px] items-center gap-2 rounded-[19px] border border-[#242838] px-4 text-sm font-black transition ${
              isSelected
                ? "bg-[linear-gradient(180deg,#2a3550,#161d2f)] text-[#f0f4ff] shadow-[0_14px_32px_rgba(17,19,29,0.32)]"
                : "bg-[linear-gradient(180deg,#1c2233,#121726)] text-[#c6d0ec]/84 hover:bg-[linear-gradient(180deg,#232b40,#151b2c)] hover:text-[#f0f4ff]"
            }`}
          >
            <span className="coin scale-90" />
            {price.label}
          </button>
        );
      })}

      <button className="ml-auto h-[46px] rounded-[19px] border border-[#242838] bg-[linear-gradient(180deg,#20273a,#141a2a)] px-4 text-sm font-black text-[#f0f4ff] shadow-[0_14px_32px_rgba(17,19,29,0.32)] transition hover:brightness-110">
        {"Доступные мне"}
      </button>
    </section>
  );
}
