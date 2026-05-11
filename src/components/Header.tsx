"use client";

import { motion } from "framer-motion";
import { Bell, ChevronDown, Gift, Handshake, Plus, ScrollText, Settings, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { CoinPrice } from "./CoinPrice";

const nav = [
  { label: "\u0410\u043f\u0433\u0440\u0435\u0439\u0434", icon: TrendingUp, href: "/upgrade" },
  { label: "\u041a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u044b", icon: ScrollText, href: "/#cases" },
  { label: "\u0411\u043e\u043d\u0443\u0441\u044b", icon: Gift, href: "/#cases" },
  { label: "\u041f\u0430\u0440\u0442\u043d\u0451\u0440\u0430\u043c", icon: Handshake, href: "/#cases" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[linear-gradient(180deg,rgba(29,30,28,0.96),rgba(18,18,17,0.92))] shadow-[0_18px_38px_rgba(0,0,0,0.34)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
      className={`relative flex h-[74px] w-full items-center gap-4 px-4 transition-all duration-300 sm:px-6 xl:px-8 ${
          isScrolled ? "shadow-[inset_0_-1px_0_rgba(113,129,183,0.12)]" : ""
        }`}
      >
        {isScrolled && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[radial-gradient(circle,rgba(174,184,216,0.38)_0%,rgba(174,184,216,0.1)_42%,transparent_72%)]" />
        )}

        <a href="/" className="group/logo flex h-12 w-[186px] shrink-0 items-center">
          <span className="text-[31px] font-black leading-none tracking-[-0.01em] transition duration-300 ease-out group-hover/logo:-translate-y-0.5 group-hover/logo:scale-[1.02]">
            <span className="text-white transition group-hover/logo:text-[#e5ebff]">Case</span>
            <span className="text-[#ff9a3d] transition group-hover/logo:text-[#ffb35c]">GO</span>
          </span>
        </a>

        <nav className="ml-5 hidden items-center gap-7 lg:flex">
          {nav.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="inline-flex items-center gap-2 text-[15.5px] font-extrabold text-[#d8deef]/72 transition hover:text-[#c8d2f2]"
            >
              <Icon size={17} strokeWidth={2.5} />
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <a
            href="/deposit"
            className="header-wallet group/wallet inline-flex h-[44px] items-center overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#171a28,#10131d)] text-sm font-black text-[#dfe6ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_12px_30px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#20273a]"
          >
            <span className="hidden h-full items-center px-4 sm:inline-flex">
              <CoinPrice value={128450} />
            </span>
            <span className="grid h-[44px] w-[44px] place-items-center bg-[linear-gradient(180deg,#ffb35c,#ff7e3f)] text-[#14111a] shadow-[0_0_28px_rgba(255,126,63,0.22)] transition group-hover/wallet:brightness-105 sm:w-[50px]">
              <Plus size={23} strokeWidth={3.2} />
            </span>
          </a>
          <button className="group/profile hidden h-[44px] items-center gap-3 rounded-[18px] bg-[linear-gradient(180deg,#171a28,#10131d)] px-3 pr-4 text-[#aeb8d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_12px_30px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#20273a] hover:text-[#dfe6ff] sm:inline-flex">
            <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full border border-[#ff9a3d]/80 bg-[radial-gradient(circle_at_35%_25%,#ffcf7a,#e96e35_48%,#142033_50%,#0c111d_100%)] shadow-[0_0_18px_rgba(255,126,63,0.18)]">
              <span className="text-[11px] font-black leading-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]">CG</span>
            </span>
            <span className="hidden text-[20px] font-black italic tracking-[-0.05em] text-[#ff9a3d] drop-shadow-[0_2px_8px_rgba(255,126,63,0.2)] md:inline">
              CG
            </span>
            <ChevronDown size={20} strokeWidth={3} className="transition group-hover/profile:translate-y-0.5" />
          </button>
          <button className="hidden h-[44px] w-[44px] place-items-center rounded-[18px] bg-[linear-gradient(180deg,#171a28,#10131d)] text-[#c8d2f2] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_12px_30px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#20273a] hover:text-white md:grid">
            <Bell size={22} strokeWidth={2.5} />
          </button>
          <button className="hidden h-[44px] w-[44px] place-items-center rounded-[18px] bg-[linear-gradient(180deg,#171a28,#10131d)] text-[#c8d2f2] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_12px_30px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#20273a] hover:text-white md:grid">
            <Settings size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
