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
      <label className="flex h-[44px] w-[260px] shrink-0 items-center gap-2.5 rounded-[14px] border border-[#161c2a] bg-[linear-gradient(180deg,#0e131e,#070a12)] px-4 text-[#9aa3bd] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] focus-within:border-[#ffe28a]/30">
        <Search size={17} className="text-[#7a8198]" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[13px] font-black text-white outline-none placeholder:text-[#5a6178]"
          placeholder={"Поиск кейса"}
        />
      </label>

      {priceFilters.map((price) => {
        const isSelected = selectedPrice === price.label;

        return (
          <button
            key={price.label}
            onClick={() => onPriceChange(isSelected ? null : price.label)}
            className={`inline-flex h-[44px] items-center gap-2 rounded-[14px] border px-3.5 text-[13px] font-black transition ${
              isSelected
                ? "border-[#ffe28a]/40 bg-[linear-gradient(180deg,#1c1a14,#0a0a0e)] text-[#ffe28a] shadow-[0_8px_22px_rgba(217,168,61,0.18),inset_0_1px_0_rgba(255,226,138,0.08)]"
                : "border-[#161c2a] bg-[linear-gradient(180deg,#0e131e,#070a12)] text-[#9aa3bd] hover:border-[#2a3145] hover:text-[#f0f3ff]"
            }`}
          >
            <span className="coin scale-90" />
            {price.label}
          </button>
        );
      })}

      <button className="ml-auto h-[44px] rounded-[14px] border border-[#161c2a] bg-[linear-gradient(180deg,#0e131e,#070a12)] px-4 text-[13px] font-black text-[#f0f3ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:border-[#ffe28a]/30 hover:text-[#ffe28a]">
        {"Доступные мне"}
      </button>
    </section>
  );
}
