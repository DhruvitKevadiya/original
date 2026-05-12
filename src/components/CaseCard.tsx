"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
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

const toneGlow: Record<CaseItem["tone"], string> = {
  gold: "rgba(255,186,82,0.55)",
  orange: "rgba(255,126,63,0.55)",
  amber: "rgba(255,206,110,0.5)",
  green: "rgba(120,150,255,0.42)",
  ruby: "rgba(255,90,80,0.55)",
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
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="relative flex h-[224px] w-full items-end justify-center overflow-visible"
      >
        <div
          className="pointer-events-none absolute inset-x-4 bottom-3 h-32 rounded-[50%] opacity-55 blur-2xl transition duration-300 group-hover:scale-110 group-hover:opacity-90"
          style={{
            background: `radial-gradient(ellipse at center, ${toneGlow[item.tone]}, transparent 65%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-x-12 bottom-1 h-8 rounded-full bg-black/60 blur-xl transition duration-300 group-hover:translate-y-1" />

        {item.tag === "hot" ? (
          <span className="absolute left-2 top-1 z-10 inline-flex items-center gap-1 rounded-[8px] border border-[#ff6a2a]/40 bg-[#1a0e08]/90 px-2 py-[3px] text-[10px] font-black uppercase tracking-[0.16em] text-[#ffb368] shadow-[0_4px_12px_rgba(255,106,42,0.25)]">
            <Flame size={11} strokeWidth={2.6} className="flame-flicker text-[#ff8a30]" />
            Trending
          </span>
        ) : item.tag === "new" ? (
          <span className="absolute left-2 top-1 z-10 inline-flex items-center gap-1 rounded-[8px] border border-[#42ff8b]/35 bg-[#06140e]/90 px-2 py-[3px] text-[10px] font-black uppercase tracking-[0.16em] text-[#7cf0a9] shadow-[0_4px_12px_rgba(66,255,139,0.18)]">
            <Sparkles size={11} strokeWidth={2.6} />
            New
          </span>
        ) : null}

        <CaseArt
          index={item.artIndex}
          className="relative h-[240px] w-[240px] transition duration-300 ease-out group-hover:-translate-y-1"
        />
      </motion.a>

      <h3 className="mt-2 max-w-full truncate px-2 text-center text-[15px] font-black leading-tight text-white sm:text-base">
        {item.name}
      </h3>

      <a
        href={`/case/${item.id}`}
        className="mt-2.5 inline-flex h-[34px] items-center gap-1.5 rounded-[12px] border border-[#222b41] bg-[linear-gradient(180deg,#0e1320,#070a12)] px-4 text-[13px] font-black text-[#ffe28a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_6px_16px_rgba(0,0,0,0.36)] transition duration-200 hover:-translate-y-0.5 hover:border-[#ffe28a]/35 hover:text-[#fff0be]"
      >
        <CoinPrice value={item.price} />
      </a>
    </div>
  );
}
