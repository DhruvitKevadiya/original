"use client";

import { ChevronDown, Search, SlidersHorizontal, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { LiveDropTicker } from "@/components/LiveDropTicker";
import { CoinPrice } from "@/components/CoinPrice";
import { StatsFooter } from "@/components/StatsFooter";
import { UpgradeLayeredStage } from "@/components/UpgradeLayeredStage";
import { liveDrops } from "@/data/mock";

const upgradeFaqs = [
  {
    question: "\u0428\u0430\u0433 1 \u2014 \u0412\u044b\u0431\u0435\u0440\u0438 \u0441\u0432\u043e\u0439 \u0441\u043a\u0438\u043d",
    answer:
      "\u041e\u0442\u043c\u0435\u0442\u044c \u043f\u0440\u0435\u0434\u043c\u0435\u0442 \u0438\u0437 \u0438\u043d\u0432\u0435\u043d\u0442\u0430\u0440\u044f, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0445\u043e\u0447\u0435\u0448\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0432 \u0430\u043f\u0433\u0440\u0435\u0439\u0434.",
  },
  {
    question: "\u0428\u0430\u0433 2 \u2014 \u0412\u044b\u0431\u0435\u0440\u0438 \u0446\u0435\u043b\u044c",
    answer:
      "\u041f\u043e\u0434\u0431\u0435\u0440\u0438 \u0441\u043a\u0438\u043d \u0434\u043e\u0440\u043e\u0436\u0435. \u0427\u0435\u043c \u0432\u044b\u0448\u0435 \u0446\u0435\u043d\u0430 \u0446\u0435\u043b\u0438, \u0442\u0435\u043c \u043d\u0438\u0436\u0435 \u0448\u0430\u043d\u0441 \u0443\u0441\u043f\u0435\u0445\u0430.",
  },
  {
    question: "\u0428\u0430\u0433 3 \u2014 \u041f\u0440\u043e\u0432\u0435\u0440\u044c \u0448\u0430\u043d\u0441",
    answer:
      "\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0438 \u043f\u0440\u043e\u0446\u0435\u043d\u0442 \u0443\u0441\u043f\u0435\u0445\u0430 \u0438 \u043c\u043d\u043e\u0436\u0438\u0442\u0435\u043b\u044c \u043f\u0435\u0440\u0435\u0434 \u0437\u0430\u043f\u0443\u0441\u043a\u043e\u043c \u0430\u043f\u0433\u0440\u0435\u0439\u0434\u0430.",
  },
  {
    question: "\u0428\u0430\u0433 4 \u2014 \u0417\u0430\u0431\u0435\u0440\u0438 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442",
    answer:
      "\u041f\u0440\u0438 \u0443\u0434\u0430\u0447\u043d\u043e\u043c \u0430\u043f\u0433\u0440\u0435\u0439\u0434\u0435 \u043d\u043e\u0432\u044b\u0439 \u0441\u043a\u0438\u043d \u0441\u0440\u0430\u0437\u0443 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u0441\u044f \u0432 \u0438\u043d\u0432\u0435\u043d\u0442\u0430\u0440\u044c.",
  },
];

const upgradeInventory = Array.from({ length: 16 }, (_, index) => liveDrops[index % liveDrops.length]);
const upgradeTargets = Array.from({ length: 16 }, (_, index) => liveDrops[(index + 2) % liveDrops.length]);

const skinTone = {
  consumer: "from-[#16252a] to-[#11181b]",
  industrial: "from-[#14323b] to-[#11181c]",
  milSpec: "from-[#1c244d] to-[#121528]",
  restricted: "from-[#28164a] to-[#151022]",
  classified: "from-[#461334] to-[#201018]",
  covert: "from-[#4c1c14] to-[#20100c]",
  gold: "from-[#47351a] to-[#17111c]",
};

const skinAccent = {
  consumer: "bg-[#6f8790]",
  industrial: "bg-[#5aa6b6]",
  milSpec: "bg-[#4e73ff]",
  restricted: "bg-[#8e52e8]",
  classified: "bg-[#d84d9a]",
  covert: "bg-[#f06a3f]",
  gold: "bg-[#ffd35a]",
};

function getSkinImageClass(name: string) {
  const isGloves = name.toLowerCase().includes("gloves");

  return isGloves
    ? "absolute left-1/2 top-[18px] h-[58%] w-[88%] -translate-x-1/2 object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.38)]"
    : "absolute left-1/2 top-[4px] h-[76%] w-[165%] -translate-x-1/2 object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.38)]";
}

function UpgradeSkinGrid({
  items,
  selectedId,
  onSelect,
}: {
  items: typeof liveDrops;
  selectedId: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="h-[410px] rounded-[20px] bg-[#0d1019] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <div className="upgrade-scroll grid h-full grid-cols-2 content-start gap-2 overflow-y-auto p-1 sm:grid-cols-3 xl:grid-cols-4 xl:auto-rows-[126px]">
        {items.map((item, index) => {
          const itemId = `${item.id}-${index}`;

          return (
            <button
              key={itemId}
              onClick={() => onSelect(itemId)}
              className={`relative h-full overflow-hidden rounded-[13px] bg-gradient-to-b ${skinTone[item.rarity]} p-2 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] transition hover:-translate-y-0.5 ${
                selectedId === itemId ? "ring-2 ring-inset ring-[#6f7ea8]" : "ring-1 ring-inset ring-white/6"
              }`}
            >
              <span className={`absolute left-1/2 top-0 h-1 w-10 -translate-x-1/2 rounded-b-full ${skinAccent[item.rarity]}`} />
              <CoinPrice value={item.price} className="absolute right-3 top-2 text-xs font-black text-[#ffd35a]" />
              <img
                src="/textures/paw-mark.png"
                alt=""
                className="pointer-events-none absolute left-1/2 top-[44%] h-[105%] w-[105%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.12] mix-blend-soft-light"
              />
              <div className="relative h-full">
                <img src={item.image} alt="" className={getSkinImageClass(item.name)} />
                <div className="absolute inset-x-0 bottom-0">
                  <p className="truncate text-[11px] font-black text-amber-100/45">{item.name.split(" ")[0]}</p>
                  <p className="truncate text-xs font-black leading-tight text-white sm:text-[13px]">{item.name}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function UpgradePage() {
  const [selectedInventory, setSelectedInventory] = useState("drop-1-0");
  const [selectedTarget, setSelectedTarget] = useState("drop-3-0");
  const [openFaq, setOpenFaq] = useState(1);

  return (
    <>
      <LiveDropTicker />
      <Header />
      <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 xl:px-8">
        <UpgradeLayeredStage />

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[26px] border border-[#242838] bg-[linear-gradient(180deg,#171a28,#10131d)] p-3 shadow-[0_18px_42px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.035)]">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex h-10 items-center gap-3">
                <Target className="text-[#7f879f]" size={22} strokeWidth={2.8} />
                <h2 className="text-xl font-black text-white">{"\u0412\u0430\u0448\u0438 \u0441\u043a\u0438\u043d\u044b"}</h2>
              </div>
              <div className="flex gap-2">
                <label className="flex h-10 w-[112px] items-center gap-2 rounded-[16px] bg-[#0d1019]/88 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <input
                    className="min-w-0 flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder:text-[#8d96b3]/70"
                    placeholder={"\u0426\u0435\u043d\u0430 \u0434\u043e"}
                  />
                  <Search size={16} className="shrink-0 text-[#7f879f]/72" />
                </label>
                <button className="inline-flex h-10 items-center gap-3 rounded-[16px] bg-[#0d1019]/88 px-4 text-sm font-black text-[#7f879f] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:text-white">
                  {"\u0426\u0435\u043d\u0430"}
                  <SlidersHorizontal size={17} />
                </button>
              </div>
            </div>

            <UpgradeSkinGrid items={upgradeInventory} selectedId={selectedInventory} onSelect={setSelectedInventory} />
          </div>

          <div className="rounded-[26px] border border-[#242838] bg-[linear-gradient(180deg,#171a28,#10131d)] p-3 shadow-[0_18px_42px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.035)]">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex h-10 items-center gap-3">
                <Sparkles className="text-[#7f879f]" size={22} strokeWidth={2.8} />
                <h2 className="text-xl font-black text-white">{"\u0421\u043a\u0438\u043d \u0430\u043f\u0433\u0440\u0435\u0439\u0434\u0430"}</h2>
              </div>
              <div className="flex gap-2">
                <label className="flex h-10 min-w-[170px] items-center gap-3 rounded-[16px] bg-[#0d1019]/88 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <input
                    className="min-w-0 flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder:text-[#8d96b3]/70"
                    placeholder={"\u041f\u043e\u0438\u0441\u043a"}
                  />
                  <Search size={18} className="text-[#7f879f]/72" />
                </label>
                <button className="inline-flex h-10 items-center gap-3 rounded-[16px] bg-[#0d1019]/88 px-4 text-sm font-black text-[#7f879f] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:text-white">
                  {"\u0426\u0435\u043d\u0430"}
                  <SlidersHorizontal size={17} />
                </button>
              </div>
            </div>

            <UpgradeSkinGrid items={upgradeTargets} selectedId={selectedTarget} onSelect={setSelectedTarget} />
          </div>
        </section>

        <section className="mt-11">
          <h2 className="mb-3 text-xl font-black text-white">{"\u041a\u0430\u043a \u044d\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442"}</h2>
          <div className="space-y-2">
            {upgradeFaqs.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <article
                  key={item.question}
                  className={`overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#171a28,#10131d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition ${
                    isOpen ? "border border-[#6f7ea8]/46" : "border border-[#242838]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex min-h-[58px] w-full items-center justify-between gap-4 px-5 text-left text-sm font-black text-[#8d96b3] transition hover:text-white focus:outline-none focus-visible:outline-[#4d7cff]/70 sm:text-base"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-[12px] transition ${
                        isOpen
                        ? "bg-[#292d43] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                          : "bg-[#0d1019]/86 text-[#7f879f] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                      }`}
                    >
                      <ChevronDown size={20} strokeWidth={3} className={`transition duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>
                  {isOpen ? <div className="px-5 pb-5 pr-20 text-sm font-bold leading-relaxed text-[#8d96b3]">{item.answer}</div> : null}
                </article>
              );
            })}
          </div>
        </section>

        <div className="pt-16">
          <StatsFooter />
        </div>
      </main>
    </>
  );
}
