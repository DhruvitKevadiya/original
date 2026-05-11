"use client";

import { motion } from "framer-motion";
import type { CaseItem } from "@/data/mock";
import { CoinPrice } from "./CoinPrice";
import { CaseArt } from "./CaseArt";

const toneMap = {
  gold: "from-[#dfe6ff] via-[#8fa1d6] to-[#28314c]",
  orange: "from-[#ffd39b] via-[#f27f2e] to-[#773011]",
  amber: "from-[#f3f6ff] via-[#b7c3ea] to-[#314063]",
  green: "from-[#d8e0ff] via-[#6f7ea8] to-[#212a45]",
  ruby: "from-[#ffc077] via-[#c54b25] to-[#4d1710]",
};

type CaseCardProps = {
  item: CaseItem;
  compact?: boolean;
};

export function CaseCard({ item, compact = false }: CaseCardProps) {
  if (compact) {
    return (
      <motion.a
        href={`/case/${item.id}`}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="group relative flex min-w-[282px] flex-row items-center gap-4 overflow-hidden rounded-[28px] border border-transparent bg-cocoa-850 p-4 shadow-soft"
      >
        <div className={`absolute inset-x-4 top-4 h-3/5 rounded-[28px] bg-gradient-to-br ${toneMap[item.tone]} opacity-95`} />
        <div className="absolute inset-x-5 top-6 h-1/2 rounded-[28px] bg-[#6f7ea8]/10 blur-xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_42%,rgba(12,6,4,0.5))]" />

        {item.tag && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-cocoa-950/70 px-3 py-1 text-[10px] font-black uppercase text-[#dfe6ff]">
            {item.tag}
          </span>
        )}

        <div className="relative grid h-24 w-24 shrink-0 place-items-center">
          <CaseArt index={item.artIndex} className="h-24 w-24" />
        </div>

        <div className="relative mt-auto flex min-w-0 flex-1 flex-col items-start justify-center gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-black leading-tight text-white">{item.name}</h3>
          </div>
          <span className="whitespace-nowrap text-sm font-black text-[#ffe28a] drop-shadow-[0_4px_12px_rgba(217,168,61,0.16)]">
            <CoinPrice value={item.price} />
          </span>
        </div>
      </motion.a>
    );
  }

  return (
    <div className="group flex flex-col items-center">
      <motion.a
        href={`/case/${item.id}`}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="relative flex h-[260px] w-full items-end justify-center overflow-visible rounded-[28px] border border-transparent"
      >
        <div className={`absolute inset-x-8 bottom-2 h-28 rounded-full bg-gradient-to-br ${toneMap[item.tone]} opacity-35 blur-2xl`} />
        <div className="absolute inset-x-10 bottom-0 h-12 rounded-full bg-black/34 blur-xl" />

        {item.tag && (
          <span className="absolute right-5 top-3 z-10 rounded-full bg-cocoa-950/72 px-3 py-1 text-[10px] font-black uppercase text-[#dfe6ff] shadow-insetWarm">
            {item.tag}
          </span>
        )}

        <div className="relative grid place-items-center">
          <CaseArt index={item.artIndex} className="h-[280px] w-[280px]" />
        </div>
      </motion.a>

      <div className="mt-3 min-w-0 px-2 text-center">
        <h3 className="truncate text-lg font-black leading-tight text-white">{item.name}</h3>
      </div>

      <a
        href={`/case/${item.id}`}
        className="mt-2 inline-flex items-center justify-center text-sm font-black text-[#ffe28a] drop-shadow-[0_4px_12px_rgba(217,168,61,0.16)] transition hover:-translate-y-0.5 hover:text-[#fff0be]"
      >
        <CoinPrice value={item.price} />
      </a>
    </div>
  );
}
