import { ArrowRight, Sparkles, Swords, Trophy } from "lucide-react";
import { CoinPrice } from "./CoinPrice";

const copy = {
  hotLabel: "Hot drop",
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
    <section className="grid gap-3 lg:grid-cols-[1.18fr_0.82fr]">
      <a
        href="/case/honey-bag"
        className="group relative min-h-[200px] overflow-hidden rounded-[22px] border border-[#161c2a] bg-[radial-gradient(ellipse_at_top_right,rgba(255,126,63,0.16),transparent_40%),linear-gradient(135deg,#0c1018_0%,#05080f_55%,#0d1322_100%)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_30px_70px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,226,138,0.25),transparent)]" />
        <div className="absolute inset-0 bg-[url('/textures/paw-mark.png')] bg-[length:240px] bg-[position:92%_60%] bg-no-repeat opacity-[0.06]" />

        <img
          src="/case-png/case-0.png"
          alt=""
          className="pointer-events-none absolute bottom-[-14px] right-[72px] h-[188px] w-[188px] rotate-[-8deg] object-contain drop-shadow-[0_30px_36px_rgba(0,0,0,0.6)] transition duration-300 group-hover:-translate-y-1.5 group-hover:rotate-[-11deg]"
        />
        <img
          src="/live-skins/skin-0.png"
          alt=""
          className="pointer-events-none absolute right-[136px] top-[28px] h-[110px] w-[110px] -rotate-[14deg] object-contain opacity-90 drop-shadow-[0_18px_22px_rgba(0,0,0,0.5)] transition duration-300 group-hover:-translate-x-1"
        />
        <img
          src="/live-skins/skin-3.png"
          alt=""
          className="pointer-events-none absolute bottom-[14px] right-[12px] h-[122px] w-[122px] rotate-[12deg] object-contain opacity-95 drop-shadow-[0_18px_22px_rgba(0,0,0,0.55)] transition duration-300 group-hover:-translate-y-1"
        />

        <div className="relative z-10 flex h-full max-w-[54%] flex-col justify-between">
          <div className="space-y-3.5">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-[8px] border border-[#ffe28a]/25 bg-[#0a0e18]/70 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#ffe28a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm">
              <Trophy size={12} strokeWidth={3} />
              {copy.hotLabel}
            </span>
            <div className="space-y-2.5">
              <h2 className="text-[34px] font-black uppercase leading-[0.92] text-white sm:text-[44px]">
                {copy.heroLine1}
                <span className="block bg-gradient-to-r from-[#ffe28a] to-[#ff9a3d] bg-clip-text text-transparent">
                  {copy.heroLine2}
                </span>
              </h2>
              <p className="max-w-[340px] text-[13px] font-bold leading-[1.45] text-[#9aa3bd]">
                {copy.heroText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <span className="bevel-cta inline-flex h-[44px] items-center justify-center bg-gradient-to-b from-[#ffd266] to-[#d9a83d] px-6 text-[13px] font-black uppercase tracking-[0.08em] text-[#201707] shadow-[0_14px_32px_rgba(217,168,61,0.32)] transition duration-200 group-hover:brightness-110">
              {copy.openCase}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-black text-[#9aa3bd]">
              {copy.from}{" "}
              <CoinPrice
                value={249}
                className="text-[13px] font-black text-[#f0f3ff]"
              />
            </span>
          </div>
        </div>
      </a>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <SideBoard
          href="/deposit"
          tag="Bonus"
          TagIcon={Sparkles}
          title={copy.bonusTitle}
          text={copy.bonusText}
          accent="rgba(255,153,61,0.18)"
        />
        <SideBoard
          href="/upgrade"
          tag="Upgrade"
          TagIcon={Swords}
          title={copy.upgradeTitle}
          text={copy.upgradeText}
          accent="rgba(120,150,255,0.18)"
          decorImg="/live-skins/skin-4.png"
        />
      </div>
    </section>
  );
}

function SideBoard({
  href,
  tag,
  TagIcon,
  title,
  text,
  accent,
  decorImg,
}: {
  href: string;
  tag: string;
  TagIcon: typeof Trophy;
  title: string;
  text: string;
  accent: string;
  decorImg?: string;
}) {
  return (
    <a
      href={href}
      className="group relative min-h-[94px] overflow-hidden rounded-[22px] border border-[#161c2a] bg-[linear-gradient(135deg,#0c1018_0%,#05080f_50%,#0d1322_100%)] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.03)] transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_24px_56px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[55%] transition duration-300 group-hover:scale-[1.04]"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${accent}, transparent 70%)`,
        }}
      />
      {decorImg ? (
        <img
          src={decorImg}
          alt=""
          className="pointer-events-none absolute bottom-[-4px] right-[14px] h-[98px] w-[98px] rotate-[9deg] object-contain opacity-90 drop-shadow-[0_16px_20px_rgba(0,0,0,0.5)] transition duration-300 group-hover:-translate-y-1"
        />
      ) : null}
      <div className="relative z-10 flex h-full items-center justify-between gap-4">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#ffe28a]/25 bg-[#0a0e18]/70 px-2 py-1 text-[9.5px] font-black uppercase tracking-[0.22em] text-[#ffe28a]">
            <TagIcon size={11} strokeWidth={3} />
            {tag}
          </span>
          <h3 className="text-[19px] font-black leading-tight text-white">
            {title}
          </h3>
          <p className="text-[11.5px] font-bold leading-tight text-[#7a8198]">
            {text}
          </p>
        </div>
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[#1e2536] bg-[#0a0e18] text-[#ffe28a] transition duration-300 group-hover:border-[#ffe28a] group-hover:bg-[#ffe28a] group-hover:text-[#201707]">
          <ArrowRight size={17} strokeWidth={3} />
        </span>
      </div>
    </a>
  );
}
