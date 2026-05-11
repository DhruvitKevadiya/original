import { ArrowRight, Sparkles, Swords, Trophy } from "lucide-react";
import { CoinPrice } from "./CoinPrice";

const copy = {
  heroLine1: "Открывай",
  heroLine2: "ярче",
  heroText: "Свежий дроп, жирные скины и быстрый вход в самый горячий кейс витрины.",
  openCase: "Открыть кейс",
  from: "от",
  bonusTitle: "Бонус к пополнению",
  bonusText: "Забери +13% и усили первый заход",
  upgradeTitle: "Разгоняй дроп",
  upgradeText: "Меняй низкий вход на более жирную цель",
};

export function HubBoards() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.14fr_0.86fr]">
      <a
        href="/case/honey-bag"
        className="group relative min-h-[176px] overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_top_left,rgba(94,124,255,0.14),transparent_32%),radial-gradient(circle_at_84%_30%,rgba(255,126,63,0.12),transparent_28%),linear-gradient(135deg,#10131d_0%,#090c14_48%,#171a28_100%)] p-6 shadow-soft transition duration-300 hover:-translate-y-1"
      >
        <div className="absolute inset-0 bg-[url('/textures/paw-mark.png')] bg-[length:260px] bg-[position:92%_54%] bg-no-repeat opacity-[0.08]" />
        <div className="absolute inset-y-0 right-0 w-[52%] bg-[radial-gradient(circle_at_72%_42%,rgba(94,124,255,0.2),transparent_30%),radial-gradient(circle_at_78%_65%,rgba(255,126,63,0.14),transparent_26%)]" />
        <img
          src="/case-png/case-0.png"
          alt=""
          className="pointer-events-none absolute bottom-[-10px] right-[82px] h-[176px] w-[176px] rotate-[-8deg] object-contain drop-shadow-[0_26px_28px_rgba(0,0,0,0.58)] transition duration-300 group-hover:translate-y-[-4px] group-hover:rotate-[-11deg]"
        />
        <img
          src="/live-skins/skin-0.png"
          alt=""
          className="pointer-events-none absolute right-[132px] top-[32px] h-[112px] w-[112px] -rotate-[14deg] object-contain opacity-90 drop-shadow-[0_16px_20px_rgba(0,0,0,0.45)] transition duration-300 group-hover:translate-x-[-4px]"
        />
        <img
          src="/live-skins/skin-3.png"
          alt=""
          className="pointer-events-none absolute bottom-[16px] right-[12px] h-[118px] w-[118px] rotate-[12deg] object-contain opacity-95 drop-shadow-[0_18px_22px_rgba(0,0,0,0.5)] transition duration-300 group-hover:translate-y-[-3px]"
        />

        <div className="relative z-10 flex h-full max-w-[52%] flex-col justify-between">
          <div className="space-y-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cocoa-950/60 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#dfe6ff]">
              <Trophy size={14} strokeWidth={2.8} />
              Hot Case
            </span>
            <div className="space-y-2">
              <h2 className="text-[34px] font-black uppercase leading-[0.92] text-white sm:text-[42px]">
                {copy.heroLine1}
                <span className="block text-[#dfe6ff]">{copy.heroLine2}</span>
              </h2>
              <p className="max-w-[360px] text-sm font-bold leading-5 text-amber-100/70">{copy.heroText}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <span className="inline-flex h-[44px] items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,#ffe28a,#d9a83d)] px-5 text-sm font-black text-[#201707] shadow-[0_14px_32px_rgba(217,168,61,0.18)]">
              {copy.openCase}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#dfe6ff]">
              {copy.from} <CoinPrice value={249} className="text-sm font-black text-[#dfe6ff]" />
            </span>
          </div>
        </div>
      </a>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <a
          href="/deposit"
          className="group relative min-h-[84px] overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#10131d_0%,#090c14_52%,#171a28_100%)] p-4 shadow-soft transition duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_42%,rgba(94,124,255,0.14),transparent_28%),radial-gradient(circle_at_72%_88%,rgba(255,126,63,0.08),transparent_32%)] transition duration-300 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,18,0.92),rgba(8,11,18,0.68)_58%,rgba(8,11,18,0.46))]" />
          <div className="relative z-10 flex h-full items-center justify-between gap-4">
            <div className="space-y-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-cocoa-950/62 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffe28a]">
              <Sparkles size={13} strokeWidth={2.8} />
              Bonus
            </span>
              <h3 className="text-xl font-black text-white">{copy.bonusTitle}</h3>
              <p className="text-xs font-bold text-amber-100/64">{copy.bonusText}</p>
            </div>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-white/10 text-[#ffe28a] transition duration-300 group-hover:bg-[#ffe28a] group-hover:text-[#201707]">
              <ArrowRight size={18} strokeWidth={3} />
            </span>
          </div>
        </a>

        <a
          href="/upgrade"
          className="group relative min-h-[84px] overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#10131d_0%,#090c14_44%,#171a28_100%)] p-4 shadow-soft transition duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-y-0 right-0 w-[48%] bg-[radial-gradient(circle_at_70%_48%,rgba(94,124,255,0.16),transparent_36%),radial-gradient(circle_at_88%_68%,rgba(255,126,63,0.09),transparent_32%)] transition duration-300 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,18,0.93),rgba(8,11,18,0.72)_58%,rgba(8,11,18,0.4))]" />
          <img
            src="/live-skins/skin-4.png"
            alt=""
            className="pointer-events-none absolute bottom-[-6px] right-[12px] h-[96px] w-[96px] rotate-[9deg] object-contain opacity-90 drop-shadow-[0_16px_18px_rgba(0,0,0,0.45)] transition duration-300 group-hover:translate-y-[-3px]"
          />
          <div className="relative z-10 flex h-full items-center justify-between gap-4">
            <div className="space-y-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-cocoa-950/62 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#ffe28a]">
              <Swords size={13} strokeWidth={2.8} />
              Upgrade
            </span>
              <h3 className="text-xl font-black text-white">{copy.upgradeTitle}</h3>
              <p className="text-xs font-bold text-amber-100/64">{copy.upgradeText}</p>
            </div>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-white/10 text-[#ffe28a] transition duration-300 group-hover:bg-[#ffe28a] group-hover:text-[#201707]">
              <ArrowRight size={18} strokeWidth={3} />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
