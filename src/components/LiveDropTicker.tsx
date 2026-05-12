import { Crown, Grid2X2 } from "lucide-react";
import { liveDrops } from "@/data/mock";

const rarityClass = {
  consumer: "from-[#1f2933] to-[#111827]",
  industrial: "from-[#172b3d] to-[#101923]",
  milSpec: "from-[#162350] to-[#101529]",
  restricted: "from-[#2b1750] to-[#161022]",
  classified: "from-[#431537] to-[#1b0e18]",
  covert: "from-[#4a171d] to-[#1a0d0f]",
  gold: "from-[#4a3615] to-[#1c1308]",
};

const rarityAccent = {
  consumer: "bg-[#9aa5b1]",
  industrial: "bg-[#6fd3ff]",
  milSpec: "bg-[#536dff]",
  restricted: "bg-[#884dff]",
  classified: "bg-[#d64bc2]",
  covert: "bg-[#ff4f68]",
  gold: "bg-[#dfe6ff]",
};

const filterButtons = [
  { label: "Gold", icon: Crown, className: "bg-[linear-gradient(180deg,#ffd266,#d9a83d)] text-[#201707] shadow-[0_4px_10px_rgba(217,168,61,0.32)]" },
  { label: "\u041E\u0431\u044B\u0447\u043D\u044B\u0435", icon: Grid2X2, className: "bg-[linear-gradient(180deg,#0e131e,#070a12)] text-[#9aa3bd] border border-[#161c2a] hover:text-white" },
];

const players = ["PandaMaster", "BambooKid", "LuckyBao", "HoneySpin", "JadeFox", "GoldRush"];

export function LiveDropTicker() {
  const tickerItems = [...liveDrops, ...liveDrops, ...liveDrops, ...liveDrops];

  return (
    <section className="w-full bg-transparent">
      <div className="flex w-full items-start gap-2 overflow-hidden px-1.5 pb-1 pt-1.5">
        <div className="grid h-[94px] w-[84px] shrink-0 grid-cols-2 gap-1 rounded-[14px] border border-[#161c2a] bg-[linear-gradient(180deg,#0d1220,#070a12)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="relative col-span-2 overflow-hidden rounded-[12px] bg-[#04060b]/70 text-center">
            <div className="grid h-[48px] place-items-center px-1 py-1">
              <p className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase leading-none tracking-[0.14em] text-[#7a8198]">
                <span className="online-pulse h-1.5 w-1.5 rounded-full bg-[#42ff8b]" />
                {"\u041E\u043D\u043B\u0430\u0439\u043D"}
              </p>
              <p className="text-[13px] font-black leading-none text-white">3 744</p>
            </div>
          </div>
          {filterButtons.map(({ label, icon: Icon, className }) => (
            <button
              key={label}
              className={`grid h-[31px] place-items-center rounded-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] transition hover:-translate-y-0.5 ${className}`}
              title={label}
            >
              <Icon size={14} strokeWidth={2.7} />
            </button>
          ))}
        </div>

        <div className="group/live h-[106px] min-w-0 flex-1 overflow-hidden rounded-[14px] border border-[#161c2a] bg-[linear-gradient(180deg,#0d1220,#070a12)] px-1.5 py-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="live-marquee flex w-max items-center gap-[2px] pl-0.5 group-hover/live:[animation-play-state:paused]">
            {tickerItems.map((drop, index) => (
              <div
                key={`${drop.id}-${index}`}
                className={`${index === 0 ? "live-drop-insert" : ""} group/drop relative flex h-[100px] min-w-[117px] flex-col overflow-hidden rounded-[16px] bg-gradient-to-b px-1 pb-1 pt-1 ${rarityClass[drop.rarity]}`}
              >
                <span className={`absolute left-1/2 top-0 z-10 h-1 w-10 -translate-x-1/2 rounded-b-full ${rarityAccent[drop.rarity]}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.09),transparent_0_4.2rem)]" />
                <img
                  src="/textures/paw-mark.png"
                  alt=""
                  className="pointer-events-none absolute left-1/2 top-[40%] h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.24] mix-blend-multiply brightness-75"
                />

                <div className="relative grid h-[62px] place-items-center">
                  <img
                    src={drop.image}
                    alt={drop.name}
                    className="max-h-[58px] w-[96px] object-contain opacity-100 drop-shadow-[0_10px_12px_rgba(0,0,0,0.55)] transition duration-200 group-hover/drop:scale-90 group-hover/drop:opacity-0"
                  />
                  <div className="absolute inset-0 grid translate-y-2 place-items-center opacity-0 transition duration-200 group-hover/drop:translate-y-0 group-hover/drop:opacity-100">
                    <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-cocoa-950/75 shadow-insetWarm">
                      <img
                        src={`/case-png/case-${drop.artIndex % 5}.png`}
                        alt=""
                        className="h-9 w-9 object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.42)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative mx-auto mt-auto max-w-[98px] truncate rounded-md bg-black/52 px-1.5 py-0.5 text-[9px] font-black leading-3 text-white transition duration-200 group-hover/drop:text-[#dfe6ff]">
                  <span className="block group-hover/drop:hidden">{drop.name}</span>
                  <span className="hidden group-hover/drop:block">{players[index % players.length]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

