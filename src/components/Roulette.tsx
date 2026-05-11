"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { rouletteItems, type CaseItem, type DropItem } from "@/data/mock";
import { CoinPrice } from "./CoinPrice";
import { CaseArt } from "./CaseArt";

const openCounts = [1, 2, 3, 4, 5];
const SINGLE_STRIP_COUNT = 72;
const SINGLE_WIN_INDEX = 55;
const SPIN_DURATION_MS = 5600;
const FAST_SPIN_DURATION_MS = 1850;

const rarityTone = {
  consumer: "from-[#16252a] to-[#10181c]",
  industrial: "from-[#15313a] to-[#10191d]",
  milSpec: "from-[#1e1d4a] to-[#141126]",
  restricted: "from-[#3a1640] to-[#1d101f]",
  classified: "from-[#4b1531] to-[#211018]",
  covert: "from-[#4c1b13] to-[#20100c]",
  gold: "from-[#4a3615] to-[#1c1308]",
};

function buildDisplayItems(
  winningItem: DropItem,
  seed: number,
  count = SINGLE_STRIP_COUNT,
  targetIndex = SINGLE_WIN_INDEX,
) {
  const items = Array.from({ length: count }, (_, index) => {
    const poolIndex = (seed * 11 + index * 7 + Math.floor(index / 3)) % rouletteItems.length;
    return rouletteItems[poolIndex];
  });

  items[targetIndex] = winningItem;

  return items;
}

function normalizeSpinResult(result: DropItem | DropItem[], fallbackCount: number) {
  if (Array.isArray(result)) {
    return result.slice(0, fallbackCount);
  }

  return [result];
}

function createFallbackResult(count: number, seed: number) {
  return Array.from({ length: count }, (_, index) => rouletteItems[(seed + index * 3) % rouletteItems.length]);
}

function waitForNextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function MultiOpenDisplay({
  items,
  isSpinning,
  showPrices,
}: {
  items: DropItem[];
  isSpinning: boolean;
  showPrices: boolean;
}) {
  const slotHeight = 252;
  const columnCount = items.length;

  return (
    <div className="flex h-[255px] items-center justify-center px-1.5">
      <div className="grid w-full gap-1" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
        {items.map((item, index) => {
          const strip = [item, ...rouletteItems.slice(index, index + 5)];

          return (
            <div
              key={`${item.id}-multi-${index}`}
              className="relative h-[252px] min-w-0 overflow-hidden rounded-[24px] border border-[#242838] bg-gradient-to-b from-[#171a28] to-[#10131d] shadow-soft"
            >
              <motion.div
                initial={{ y: -slotHeight * (strip.length - 1) }}
                animate={{ y: 0 }}
                transition={{
                  duration: isSpinning ? 1.45 + index * 0.12 : 0,
                  ease: [0.16, 0.84, 0.22, 1],
                }}
              >
                {strip.map((stripItem, stripIndex) => (
                  <div
                    key={`${item.id}-${stripItem.id}-${stripIndex}`}
                    className={`relative grid h-[252px] place-items-center overflow-hidden bg-gradient-to-b ${rarityTone[stripItem.rarity]} p-2.5`}
                  >
                    <img
                      src="/textures/paw-mark.png"
                      alt=""
                      className="pointer-events-none absolute left-1/2 top-[43%] h-[96%] w-[96%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.16] mix-blend-soft-light"
                    />
                    <img
                      src={stripItem.image}
                      alt=""
                      className="relative h-[156px] w-[156px] object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.38)]"
                    />
                    <div className="relative mt-1 text-center">
                      <p className="text-sm font-black text-white">{stripItem.name}</p>
                      {showPrices ? (
                        <CoinPrice value={stripItem.price} className="mt-1 justify-center text-xs font-black text-[#ffd35a]" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type RouletteProps = {
  caseItem: CaseItem;
  frameVariant?: "current" | "rail" | "double" | "glass" | "split" | "dock" | "shelf";
  winningItem?: DropItem;
  winningItems?: DropItem[];
  onFinish?: (items: DropItem[]) => void;
  onSpinRequest?: (count: number) => Promise<DropItem | DropItem[]> | DropItem | DropItem[];
};

const frameVariants = {
  current: {
    wrapper: "",
    controlsShell: "",
    section:
      "overflow-hidden rounded-[32px] border border-[#242838] bg-[linear-gradient(180deg,#171a28,#10131d)] p-1.5 pb-5 shadow-soft sm:p-1.5 sm:pb-6",
    viewport:
      "relative overflow-hidden rounded-[28px] bg-[#10131d] py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
    viewportOverlay: "",
    edgeFade:
      "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#10131d] to-transparent",
    edgeFadeRight:
      "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#10131d] to-transparent",
  },
  rail: {
    wrapper: "",
    controlsShell: "",
    section:
      "overflow-hidden rounded-[28px] border border-[#20283a] bg-[linear-gradient(180deg,#141a28,#0f131d)] p-3 pb-5 shadow-[0_22px_56px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.03)] sm:pb-6",
    viewport:
      "relative overflow-hidden rounded-[18px] border border-[#28324a] bg-[linear-gradient(180deg,#0f141f,#0b1018)] py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.035),inset_0_-14px_24px_rgba(0,0,0,0.18)]",
    viewportOverlay:
      "pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(174,184,216,0.28),transparent)]",
    edgeFade:
      "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0b1018] via-[#0b1018]/92 to-transparent",
    edgeFadeRight:
      "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0b1018] via-[#0b1018]/92 to-transparent",
  },
  double: {
    wrapper: "",
    controlsShell: "",
    section:
      "overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#1a2234,#0b1018)] p-[9px] pb-5 shadow-[0_28px_62px_rgba(0,0,0,0.3)] sm:pb-6",
    viewport:
      "relative overflow-hidden rounded-[26px] border border-[#2b3650] bg-[linear-gradient(180deg,#101724,#0b1018)] py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.04)]",
    viewportOverlay:
      "pointer-events-none absolute inset-[8px] rounded-[20px] border border-[#1c2436] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]",
    edgeFade:
      "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0b1018] to-transparent",
    edgeFadeRight:
      "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0b1018] to-transparent",
  },
  glass: {
    wrapper: "",
    controlsShell: "",
    section:
      "overflow-hidden rounded-[30px] border border-[#263149] bg-[linear-gradient(180deg,rgba(23,26,40,0.94),rgba(12,16,24,0.92))] p-2 pb-5 shadow-[0_24px_58px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:pb-6",
    viewport:
      "relative overflow-hidden rounded-[24px] border border-[#33415d] bg-[linear-gradient(180deg,rgba(17,23,34,0.96),rgba(10,15,24,0.98))] py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_0_0_1px_rgba(111,126,168,0.04)]",
    viewportOverlay:
      "pointer-events-none absolute inset-x-0 top-0 h-12 bg-[linear-gradient(180deg,rgba(223,230,255,0.06),transparent)]",
    edgeFade:
      "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0c121c] via-[#0c121c]/88 to-transparent",
    edgeFadeRight:
      "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0c121c] via-[#0c121c]/88 to-transparent",
  },
  split: {
    wrapper: "space-y-3",
    section:
      "overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#172033,#0e1522)] p-[9px] shadow-[0_28px_62px_rgba(0,0,0,0.3)]",
    viewport:
      "relative overflow-hidden rounded-[26px] border border-[#2b3650] bg-[linear-gradient(180deg,#111927,#0c121d)] py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.04)]",
    viewportOverlay:
      "pointer-events-none absolute inset-[8px] rounded-[20px] border border-[#1c2436] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]",
    edgeFade:
      "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0b1018] to-transparent",
    edgeFadeRight:
      "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0b1018] to-transparent",
    controlsShell:
      "rounded-[28px] border border-[#263149] bg-[linear-gradient(180deg,#141a28,#10131d)] px-4 py-4 shadow-[0_20px_44px_rgba(0,0,0,0.24)] sm:px-5",
  },
  dock: {
    wrapper: "space-y-4",
    section:
      "overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#172033,#0e1522)] p-[9px] shadow-[0_28px_62px_rgba(0,0,0,0.3)]",
    viewport:
      "relative overflow-hidden rounded-[26px] border border-[#2b3650] bg-[linear-gradient(180deg,#111927,#0c121d)] py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.04)]",
    viewportOverlay:
      "pointer-events-none absolute inset-[8px] rounded-[20px] border border-[#1c2436] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]",
    edgeFade:
      "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0b1018] to-transparent",
    edgeFadeRight:
      "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0b1018] to-transparent",
    controlsShell:
      "mx-auto max-w-[780px] rounded-[26px] border border-[#263149] bg-[linear-gradient(180deg,rgba(20,26,40,0.96),rgba(16,19,29,0.98))] px-4 py-4 shadow-[0_20px_44px_rgba(0,0,0,0.26)] backdrop-blur-sm sm:px-5",
  },
  shelf: {
    wrapper: "space-y-3",
    section:
      "overflow-hidden rounded-[30px] border border-[#22304a] bg-[linear-gradient(180deg,#12192a,#0d121c)] p-3 shadow-[0_24px_52px_rgba(0,0,0,0.28)]",
    viewport:
      "relative overflow-hidden rounded-[20px] border border-[#2a3550] bg-[linear-gradient(180deg,#0f1624,#0b1018)] py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]",
    viewportOverlay:
      "pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(174,184,216,0.26),transparent)]",
    edgeFade:
      "pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0b1018] via-[#0b1018]/92 to-transparent",
    edgeFadeRight:
      "pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0b1018] via-[#0b1018]/92 to-transparent",
    controlsShell:
      "rounded-[22px] border border-[#263149] bg-[linear-gradient(180deg,#131827,#0f131d)] px-4 py-3 shadow-[0_14px_30px_rgba(0,0,0,0.22)] sm:px-5",
  },
} as const;

export function Roulette({
  caseItem,
  frameVariant = "current",
  winningItem,
  winningItems,
  onFinish,
  onSpinRequest,
}: RouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [showCasePreview, setShowCasePreview] = useState(true);
  const [winner, setWinner] = useState(rouletteItems[2]);
  const [winners, setWinners] = useState<DropItem[]>([rouletteItems[2]]);
  const [openCount, setOpenCount] = useState(1);
  const [isFastOpen, setIsFastOpen] = useState(false);
  const [displayItems, setDisplayItems] = useState<DropItem[]>(() => buildDisplayItems(rouletteItems[2], 1));
  const [translateX, setTranslateX] = useState(0);
  const [transitionValue, setTransitionValue] = useState("none");
  const showMultiOpen = openCount > 1 && (isSpinning || hasResult);
  const showPrices = hasResult && !isSpinning;
  const sellValue = winners.reduce((sum, item) => sum + item.price, 0);
  const frame = frameVariants[frameVariant];
  const detachedControls = frameVariant === "split" || frameVariant === "dock" || frameVariant === "shelf";
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const sampleCardRef = useRef<HTMLDivElement | null>(null);
  const latestMetricsRef = useRef({ containerWidth: 0, cardWidth: 0, gap: 0, stripPaddingLeft: 0 });
  const transitionRunRef = useRef(0);
  const finishPayloadRef = useRef<DropItem[] | null>(null);
  const spinSequenceRef = useRef(0);

  useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const strip = stripRef.current;
      const sampleCard = sampleCardRef.current;

      if (!viewport || !strip || !sampleCard) return;

      const viewportRect = viewport.getBoundingClientRect();
      const sampleRect = sampleCard.getBoundingClientRect();
      const stripStyles = window.getComputedStyle(strip);

      latestMetricsRef.current = {
        containerWidth: viewportRect.width,
        cardWidth: sampleRect.width,
        gap: Number.parseFloat(stripStyles.gap || stripStyles.columnGap || "0") || 0,
        stripPaddingLeft: Number.parseFloat(stripStyles.paddingLeft || "0") || 0,
      };
    };

    measure();

    const resizeObserver = new ResizeObserver(() => measure());

    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    if (stripRef.current) resizeObserver.observe(stripRef.current);
    if (sampleCardRef.current) resizeObserver.observe(sampleCardRef.current);

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!isSpinning || showMultiOpen) return;

    const currentRun = transitionRunRef.current;
    const timeout = window.setTimeout(() => {
      if (transitionRunRef.current !== currentRun) return;

      setIsSpinning(false);
      setHasResult(true);

      if (finishPayloadRef.current) {
        onFinish?.(finishPayloadRef.current);
      }
    }, (isFastOpen ? FAST_SPIN_DURATION_MS : SPIN_DURATION_MS) + 120);

    return () => window.clearTimeout(timeout);
  }, [isFastOpen, isSpinning, onFinish, showMultiOpen]);

  function completeSingleSpin() {
    if (!isSpinning || showMultiOpen) return;

    setIsSpinning(false);
    setHasResult(true);

    if (finishPayloadRef.current) {
      onFinish?.(finishPayloadRef.current);
    }
  }

  const controlsContent = (
    <div
      className={
        detachedControls ? "flex min-h-[64px] items-center justify-center" : "mt-5 flex min-h-[64px] items-center justify-center"
      }
    >
      {hasResult ? (
        <div className="grid w-full max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-center">
            <button
              onClick={openCase}
              disabled={isSpinning}
              className="h-[46px] w-full rounded-[19px] bg-[#171a28] px-5 text-sm font-black text-[#dfe6ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] transition hover:-translate-y-0.5 hover:text-[#ffe28a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              Попробовать еще раз
            </button>
          </div>
          <button
            onClick={sellResult}
            disabled={isSpinning}
            className="inline-flex h-[52px] items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffb35c] to-[#ff7e3f] px-5 text-sm font-black text-[#14111a] shadow-[0_18px_34px_rgba(255,126,63,0.22)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Продать
            <CoinPrice value={openCount > 1 ? sellValue : winner.price} className="ml-2" />
          </button>
          <div className="flex items-center justify-center">
            <button className="h-[46px] w-full rounded-[19px] bg-[#171a28] px-5 text-sm font-black text-[#dfe6ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] transition hover:-translate-y-0.5 hover:bg-[#20273a]">
              Upgrade
            </button>
          </div>
        </div>
      ) : isSpinning ? (
        <div className="grid w-full max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-3">
          <div />
          <button
            disabled
            className="h-[52px] rounded-[20px] bg-gradient-to-b from-[#ffb35c] to-[#ff7e3f] px-5 text-sm font-black text-[#14111a] opacity-75 shadow-[0_18px_34px_rgba(255,126,63,0.18)]"
          >
            Открываем...
          </button>
          <div />
        </div>
      ) : (
        <div className="grid w-full max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">
          <div className="flex items-center justify-center">
            <div className="inline-flex h-[46px] w-full items-center justify-between gap-1 rounded-[19px] bg-[#171a28] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]">
              {openCounts.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setOpenCount(count)}
                  className={`h-[38px] w-[38px] rounded-[16px] text-sm font-black transition ${
                    openCount === count
                      ? "bg-[#ffe28a] text-[#201707] shadow-[0_10px_22px_rgba(217,168,61,0.22)]"
                      : "text-amber-100/62 hover:bg-[#20273a] hover:text-[#dfe6ff]"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={openCase}
            disabled={isSpinning}
            className="h-[52px] rounded-[20px] bg-gradient-to-b from-[#ffb35c] to-[#ff7e3f] px-5 text-sm font-black text-[#14111a] shadow-[0_18px_34px_rgba(255,126,63,0.22)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Открыть {openCount > 1 ? `${openCount} кейса` : "кейс"}
          </button>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsFastOpen((value) => !value)}
              disabled={isSpinning}
              className="h-[46px] w-full rounded-[19px] bg-[#171a28] px-5 text-sm font-black text-[#dfe6ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] transition hover:-translate-y-0.5 hover:bg-[#20273a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              Открывать быстро
            </button>
          </div>
        </div>
      )}
    </div>
  );

  async function resolveSpinResult() {
    if (onSpinRequest) {
      return normalizeSpinResult(await onSpinRequest(openCount), openCount);
    }

    if (openCount > 1) {
      if (winningItems && winningItems.length > 0) {
        return winningItems.slice(0, openCount);
      }

      return createFallbackResult(openCount, spinSequenceRef.current + 1);
    }

    if (winningItem) {
      return [winningItem];
    }

    return createFallbackResult(1, spinSequenceRef.current + 1);
  }

  function getTargetTranslateX(targetIndex: number) {
    const { cardWidth, containerWidth, gap, stripPaddingLeft } = latestMetricsRef.current;

    if (!cardWidth || !containerWidth) return 0;

    const winningCardCenter = stripPaddingLeft + targetIndex * (cardWidth + gap) + cardWidth / 2;
    return Math.max(0, winningCardCenter - containerWidth / 2);
  }

  async function openCase() {
    if (isSpinning) return;

    setIsSpinning(true);
    setHasResult(false);
    setShowCasePreview(false);
    spinSequenceRef.current += 1;

    const nextWinners = await resolveSpinResult();
    setWinners(nextWinners);
    setWinner(nextWinners[0]);
    finishPayloadRef.current = nextWinners;

    if (openCount > 1) {
      await new Promise((resolve) => window.setTimeout(resolve, isFastOpen ? 900 : 1800));
      setIsSpinning(false);
      setHasResult(true);
      onFinish?.(nextWinners);
      return;
    }

    const nextStrip = buildDisplayItems(nextWinners[0], spinSequenceRef.current);
    transitionRunRef.current += 1;
    setTransitionValue("none");
    setTranslateX(0);
    setDisplayItems(nextStrip);
    await waitForNextPaint();

    const targetTranslate = getTargetTranslateX(SINGLE_WIN_INDEX);
    const duration = isFastOpen ? FAST_SPIN_DURATION_MS : SPIN_DURATION_MS;

    setTransitionValue(`transform ${duration}ms cubic-bezier(0.08, 0.78, 0.16, 1)`);
    setTranslateX(-targetTranslate);
  }

  function sellResult() {
    setHasResult(false);
  }

  return (
    <div className={frame.wrapper}>
      <section className={frame.section}>
        <div ref={viewportRef} className={frame.viewport}>
          {frame.viewportOverlay ? <div className={frame.viewportOverlay} /> : null}
          {showCasePreview ? (
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="pointer-events-none absolute inset-0 z-30 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(255,226,138,0.14),rgba(23,26,20,0.64)_48%,rgba(23,26,20,0.86)_100%)]"
            >
              <div className="relative grid place-items-center">
                <div className="absolute h-48 w-48 rounded-full bg-[#ffe28a]/12 blur-3xl" />
                <CaseArt index={caseItem.artIndex} className="relative h-60 w-60" />
              </div>
            </motion.div>
          ) : null}

          {showMultiOpen ? (
            <MultiOpenDisplay items={winners} isSpinning={isSpinning} showPrices={showPrices} />
          ) : (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#ffe28a] to-[#d9a83d] shadow-[0_0_22px_rgba(217,168,61,0.28)]" />
              <div className={frame.edgeFade} />
              <div className={frame.edgeFadeRight} />
              <div
                ref={stripRef}
                className="flex gap-1 px-1.5 will-change-transform"
                onTransitionEnd={(event) => {
                  if (event.propertyName === "transform") {
                    completeSingleSpin();
                  }
                }}
                style={{ transform: `translateX(${translateX}px)`, transition: transitionValue }}
              >
                {displayItems.map((item, index) => (
                  <div
                    ref={index === 0 ? sampleCardRef : null}
                    key={`${item.id}-${index}`}
                    className={`relative grid h-[252px] min-w-0 flex-none basis-[calc((100%-20px)/6)] place-items-center overflow-hidden rounded-[24px] border border-transparent bg-gradient-to-b ${rarityTone[item.rarity]} p-2.5 shadow-soft`}
                  >
                    <img
                      src="/textures/paw-mark.png"
                      alt=""
                      className="pointer-events-none absolute left-1/2 top-[43%] h-[96%] w-[96%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.16] mix-blend-soft-light"
                    />
                    <img
                      src={item.image}
                      alt=""
                      className="relative h-[156px] w-[156px] object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.38)]"
                    />
                    <div className="relative mt-1 text-center">
                      <p className="text-sm font-black text-white">{item.name}</p>
                      {showPrices ? (
                        <CoinPrice value={item.price} className="mt-1 justify-center text-xs font-black text-[#ffd35a]" />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {!detachedControls ? controlsContent : null}
      </section>

      {detachedControls ? <div className={frame.controlsShell}>{controlsContent}</div> : null}
    </div>
  );
}
