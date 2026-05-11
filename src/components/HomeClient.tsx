"use client";

import { useMemo, useState } from "react";
import type { CaseItem } from "@/data/mock";
import { CaseFilters, priceFilters } from "./CaseFilters";
import { CaseGrid } from "./CaseGrid";

type HomeClientProps = {
  items: CaseItem[];
};

export function HomeClient({ items }: HomeClientProps) {
  const [query, setQuery] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const priceFilter = priceFilters.find((filter) => filter.label === selectedPrice);

    return items.filter((item) => {
      const matchesQuery = !normalizedQuery || item.name.toLowerCase().includes(normalizedQuery);
      const matchesPrice =
        !priceFilter || (item.price >= priceFilter.min && (priceFilter.max === null || item.price <= priceFilter.max));

      return matchesQuery && matchesPrice;
    });
  }, [items, query, selectedPrice]);

  return (
    <>
      <CaseFilters
        query={query}
        selectedPrice={selectedPrice}
        onQueryChange={setQuery}
        onPriceChange={setSelectedPrice}
      />
      <div className="pt-5 sm:pt-7">
        <CaseGrid items={filteredItems} />
      </div>
    </>
  );
}
