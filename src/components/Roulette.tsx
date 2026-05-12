"use client";

import { rouletteItems, type CaseItem, type DropItem } from "@/data/mock";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CaseArt } from "./CaseArt";
import { CoinPrice } from "./CoinPrice";

const openCounts = [1, 2, 3, 4, 5];
const SINGLE_STRIP_COUNT = 72;
const SINGLE_WIN_INDEX = 55;
const SPIN_DURATION_MS = 4600;
const FAST_SPIN_DURATION_MS = 1500;

const rarityTone = {
  consumer: "from-[#2a3a42] to-[#1a252c]",
  industrial: "from-[#2a414a] to-[#1a2a32]",
  milSpec: "from-[#3a2d5a] to-[#241836]",
  restricted: "from-[#4a2650] to-[#2d162f]",
  classified: "from-[#5b2441] to-[#321628]",
  covert: "from-[#5c2d23] to-[#30181c]",
  gold: "from-[#6a4b22] to-[#31241d]",
};

function buildDisplayItems(
  winningItem: DropItem,
  seed: number,
  count = SINGLE_STRIP_COUNT,
  targetIndex = SINGLE_WIN_INDEX,
) {
  const items = Array.from({ length: count }, (_, index) => {
    const poolIndex =
      (seed * 11 + index * 7 + Math.floor(index / 3)) % rouletteItems.length;
    return rouletteItems[poolIndex];
  });

  items[targetIndex] = winningItem;

  return items;
}

function normalizeSpinResult(
  result: DropItem | DropItem[],
  fallbackCount: number,
) {
  if (Array.isArray(result)) {
    return result.slice(0, fallbackCount);
  }

  return [result];
}

function createFallbackResult(count: number, seed: number) {
  return Array.from(
    { length: count },
    (_, index) => rouletteItems[(seed + index * 3) % rouletteItems.length],
  );
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
    <div className="flex h-[252px] items-center justify-center px-1.5">
      <div
        className="grid w-full gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item, index) => {
          const strip = [item, ...rouletteItems.slice(index, index + 5)];
          const startY = -slotHeight * (strip.length - 1);
          const overshootY = 14;

          return (
            <motion.div
              key={`${item.id}-multi-${index}`}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative h-[252px] min-w-0 overflow-hidden rounded-[20px] border border-[#222b41] bg-[linear-gradient(180deg,#0d1320,#070b13)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)]"
            >
              <motion.div
                initial={{ y: startY }}
                animate={{ y: isSpinning ? [startY, overshootY, -6, 0] : 0 }}
                transition={
                  isSpinning
                    ? {
                        duration: 1.7 + index * 0.18,
                        times: [0, 0.86, 0.94, 1],
                        ease: [
                          [0.08, 0.7, 0.18, 1],
                          [0.25, 0.46, 0.45, 0.94],
                          [0.4, 0, 0.25, 1],
                        ],
                      }
                    : { duration: 0 }
                }
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
                      <p className="text-sm font-black text-white">
                        {stripItem.name}
                      </p>
                      {showPrices ? (
                        <CoinPrice
                          value={stripItem.price}
                          className="mt-1 justify-center text-xs font-black text-[#ffd35a]"
                        />
                      ) : null}
                    </div>
                  </div>
                ))}
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#070b13] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#070b13] to-transparent" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

type RouletteProps = {
  caseItem: CaseItem;
  frameVariant?:
    | "current"
    | "rail"
    | "double"
    | "glass"
    | "split"
    | "dock"
    | "shelf";
  winningItem?: DropItem;
  winningItems?: DropItem[];
  onFinish?: (items: DropItem[]) => void;
  onSpinRequest?: (
    count: number,
  ) => Promise<DropItem | DropItem[]> | DropItem | DropItem[];
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
      "roulette-bezel relative overflow-hidden rounded-[24px] p-3 pb-5 sm:pb-6",
    viewport:
      "roulette-viewport relative overflow-hidden rounded-[16px] py-2",
    viewportOverlay:
      "pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(180deg,rgba(255,226,138,0.05),transparent)]",
    edgeFade:
      "pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#04050a] via-[#04050a]/90 to-transparent",
    edgeFadeRight:
      "pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#04050a] via-[#04050a]/90 to-transparent",
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
  const [displayItems, setDisplayItems] = useState<DropItem[]>(() =>
    buildDisplayItems(rouletteItems[2], 1),
  );
  const [translateX, setTranslateX] = useState(0);
  const [transitionValue, setTransitionValue] = useState("none");
  const [winFlashId, setWinFlashId] = useState(0);
  const shakeControls = useAnimation();
  const showMultiOpen = openCount > 1 && (isSpinning || hasResult);
  const showPrices = hasResult && !isSpinning;
  const sellValue = winners.reduce((sum, item) => sum + item.price, 0);
  const frame = frameVariants[frameVariant];
  const detachedControls =
    frameVariant === "split" ||
    frameVariant === "dock" ||
    frameVariant === "shelf";
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const sampleCardRef = useRef<HTMLDivElement | null>(null);
  const latestMetricsRef = useRef({
    containerWidth: 0,
    cardWidth: 0,
    gap: 0,
    stripPaddingLeft: 0,
  });
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
        gap:
          Number.parseFloat(stripStyles.gap || stripStyles.columnGap || "0") ||
          0,
        stripPaddingLeft:
          Number.parseFloat(stripStyles.paddingLeft || "0") || 0,
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
    if (winFlashId === 0) return;
    shakeControls.start({
      x: [0, -4, 4, -3, 3, -1, 1, 0],
      y: [0, 2, -1, -2, 1, 0, 0, 0],
      transition: {
        duration: 0.5,
        ease: [0.36, 0.07, 0.19, 0.97],
        times: [0, 0.12, 0.26, 0.4, 0.55, 0.72, 0.88, 1],
      },
    });
  }, [winFlashId, shakeControls]);

  useEffect(() => {
    if (!isSpinning || showMultiOpen) return;

    const currentRun = transitionRunRef.current;
    const timeout = window.setTimeout(
      () => {
        if (transitionRunRef.current !== currentRun) return;

        setIsSpinning(false);
        setHasResult(true);
        setWinFlashId((id) => id + 1);

        if (finishPayloadRef.current) {
          onFinish?.(finishPayloadRef.current);
        }
      },
      (isFastOpen ? FAST_SPIN_DURATION_MS : SPIN_DURATION_MS) + 200,
    );

    return () => window.clearTimeout(timeout);
  }, [isFastOpen, isSpinning, onFinish, showMultiOpen]);

  function completeSingleSpin() {
    if (!isSpinning || showMultiOpen) return;

    setIsSpinning(false);
    setHasResult(true);
    setWinFlashId((id) => id + 1);

    if (finishPayloadRef.current) {
      onFinish?.(finishPayloadRef.current);
    }
  }

  const controlsContent = (
    <div
      className={
        detachedControls
          ? "flex min-h-[64px] items-center justify-center"
          : "mt-5 flex min-h-[64px] items-center justify-center"
      }
    >
      {hasResult ? (
        <div className="grid w-full max-w-[720px] grid-cols-1 gap-2.5 sm:grid-cols-3">
          <button
            onClick={openCase}
            disabled={isSpinning}
            className="h-[44px] rounded-[14px] border border-[#161c2a] bg-[linear-gradient(180deg,#0e131e,#070a12)] px-5 text-[13px] font-black text-[#9aa3bd] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5 hover:border-[#ffe28a]/30 hover:text-[#ffe28a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            Попробовать еще раз
          </button>
          <button
            onClick={sellResult}
            disabled={isSpinning}
            className="bevel-cta inline-flex h-[48px] items-center justify-center bg-gradient-to-b from-[#ffd266] to-[#d9a83d] px-6 text-[13px] font-black uppercase tracking-[0.08em] text-[#201707] shadow-[0_14px_30px_rgba(217,168,61,0.32)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Продать
            <CoinPrice
              value={openCount > 1 ? sellValue : winner.price}
              className="ml-2"
            />
          </button>
          <button className="h-[44px] rounded-[14px] border border-[#161c2a] bg-[linear-gradient(180deg,#0e131e,#070a12)] px-5 text-[13px] font-black text-[#9aa3bd] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5 hover:border-[#ffe28a]/30 hover:text-[#ffe28a]">
            Upgrade →
          </button>
        </div>
      ) : isSpinning ? (
        <div className="grid w-full max-w-[720px] grid-cols-1 gap-2.5 sm:grid-cols-3">
          <div />
          <button
            disabled
            className="bevel-cta inline-flex h-[48px] items-center justify-center gap-2 bg-gradient-to-b from-[#ffd266] to-[#d9a83d] px-6 text-[13px] font-black uppercase tracking-[0.08em] text-[#201707] opacity-85 shadow-[0_14px_30px_rgba(217,168,61,0.25)]"
          >
            <span className="inline-flex gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#201707]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#201707] [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#201707] [animation-delay:240ms]" />
            </span>
            Открываем
          </button>
          <div />
        </div>
      ) : (
        <div className="grid w-full max-w-[720px] grid-cols-1 gap-2.5 sm:grid-cols-3 sm:items-center">
          <div className="inline-flex h-[44px] w-full items-center justify-between gap-1 rounded-[14px] border border-[#161c2a] bg-[linear-gradient(180deg,#0e131e,#070a12)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            {openCounts.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setOpenCount(count)}
                className={`h-[36px] flex-1 rounded-[10px] text-[13px] font-black transition ${
                  openCount === count
                    ? "bg-gradient-to-b from-[#ffd266] to-[#d9a83d] text-[#201707] shadow-[0_6px_14px_rgba(217,168,61,0.32),inset_0_1px_0_rgba(255,255,255,0.3)]"
                    : "text-[#7a8198] hover:text-[#f0f3ff]"
                }`}
              >
                {count}
              </button>
            ))}
          </div>

          <button
            onClick={openCase}
            disabled={isSpinning}
            className="bevel-cta inline-flex h-[48px] items-center justify-center bg-gradient-to-b from-[#ffd266] to-[#d9a83d] px-6 text-[13px] font-black uppercase tracking-[0.08em] text-[#201707] shadow-[0_14px_30px_rgba(217,168,61,0.32)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Открыть {openCount > 1 ? `${openCount} кейса` : "кейс"}
          </button>

          <button
            type="button"
            onClick={() => setIsFastOpen((value) => !value)}
            disabled={isSpinning}
            className={`inline-flex h-[44px] items-center justify-center gap-2 rounded-[14px] border px-5 text-[13px] font-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 ${
              isFastOpen
                ? "border-[#ffe28a]/40 bg-[linear-gradient(180deg,#1c1a14,#0a0a0e)] text-[#ffe28a] shadow-[inset_0_1px_0_rgba(255,226,138,0.08)]"
                : "border-[#161c2a] bg-[linear-gradient(180deg,#0e131e,#070a12)] text-[#9aa3bd] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-[#ffe28a]/30 hover:text-[#ffe28a]"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Быстро
          </button>
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
    const { cardWidth, containerWidth, gap, stripPaddingLeft } =
      latestMetricsRef.current;

    if (!cardWidth || !containerWidth) return 0;

    const winningCardCenter =
      stripPaddingLeft + targetIndex * (cardWidth + gap) + cardWidth / 2;
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
      await new Promise((resolve) =>
        window.setTimeout(resolve, isFastOpen ? 900 : 1800),
      );
      setIsSpinning(false);
      setHasResult(true);
      setWinFlashId((id) => id + 1);
      onFinish?.(nextWinners);
      return;
    }

    const nextStrip = buildDisplayItems(
      nextWinners[0],
      spinSequenceRef.current,
    );
    transitionRunRef.current += 1;
    setTransitionValue("none");
    setTranslateX(0);
    setDisplayItems(nextStrip);
    await waitForNextPaint();

    const targetTranslate = getTargetTranslateX(SINGLE_WIN_INDEX);
    setTransitionValue("spin");
    setTranslateX(-targetTranslate);
  }

  function sellResult() {
    setHasResult(false);
  }

  const isAnimating = transitionValue === "spin";
  const overshootPx = isFastOpen ? 14 : 24;
  const bouncePx = isFastOpen ? 5 : 9;
  const spinAnimate = isAnimating
    ? {
        x: [
          0,
          translateX - overshootPx,
          translateX + bouncePx,
          translateX,
        ],
      }
    : { x: translateX };
  const spinTransition = isAnimating
    ? ({
        duration:
          (isFastOpen ? FAST_SPIN_DURATION_MS : SPIN_DURATION_MS) / 1000,
        times: [0, 0.84, 0.93, 1],
        ease: [
          [0.04, 0.82, 0.14, 1],
          [0.34, 1.05, 0.5, 1],
          [0.4, 0, 0.2, 1],
        ],
        type: "tween",
      } as const)
    : ({ duration: 0 } as const);

  const statusLabel = isSpinning
    ? "ROLLING"
    : hasResult
    ? "WINNER"
    : "READY";
  const statusDotClass = isSpinning
    ? "bg-[#ffd266]"
    : hasResult
    ? "bg-[#42ff8b]"
    : "bg-[#566077]";

  return (
    <div className={frame.wrapper}>
      <motion.section className={frame.section} animate={shakeControls}>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#5a6178]">
          <span className="flex items-center gap-2">
            <span className="diamond-divider text-[#ffe28a]/70" />
            <span className="text-[#9aa3bd]">CASE</span>
            <span className="text-[#e9eefb]/90 tracking-[0.18em]">{caseItem.name}</span>
          </span>
          <span className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusDotClass} ${isSpinning ? "status-blink" : ""}`}
            />
            <span className={isSpinning ? "text-[#ffd266]" : hasResult ? "text-[#42ff8b]" : "text-[#9aa3bd]"}>
              {statusLabel}
            </span>
          </span>
        </div>
        <span className="corner-bracket corner-bracket--tl" />
        <span className="corner-bracket corner-bracket--tr" />
        <span className="corner-bracket corner-bracket--bl" />
        <span className="corner-bracket corner-bracket--br" />
        <div ref={viewportRef} className={`${frame.viewport} mt-8`}>
          {frame.viewportOverlay ? (
            <div className={frame.viewportOverlay} />
          ) : null}
          <div className={`scanline-overlay ${isSpinning ? "is-active" : ""}`} />
          <AnimatePresence>
            {showCasePreview ? (
              <motion.div
                key="case-preview"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-0 z-30 grid place-items-center bg-[radial-gradient(circle_at_50%_42%,rgba(255,226,138,0.18),rgba(10,14,24,0.78)_52%,rgba(7,11,19,0.96)_100%)]"
              >
                <div className="relative grid place-items-center">
                  <div className="absolute top-[58%] left-1/2 h-3 w-44 -translate-x-1/2 rounded-[50%] bg-[#ffe28a]/30 blur-2xl" />
                  <div className="absolute h-56 w-56 rounded-full bg-[#ffe28a]/10 blur-3xl" />
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                      rotate: [-1.5, 1.5, -1.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      WebkitBoxReflect:
                        "below 2px linear-gradient(transparent 55%, rgba(255,255,255,0.22))",
                    }}
                  >
                    <CaseArt
                      index={caseItem.artIndex}
                      className="relative h-60 w-60"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {showMultiOpen ? (
            <MultiOpenDisplay
              items={winners}
              isSpinning={isSpinning}
              showPrices={showPrices}
            />
          ) : (
            <>
              <motion.div
                className="pointer-events-none absolute inset-y-0 left-1/2 z-[15] w-[112px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,226,138,0.10),transparent_70%)]"
                animate={{
                  opacity: hasResult ? 1 : isSpinning ? 0.85 : 0.55,
                }}
                transition={{ duration: 0.4 }}
              />
              <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 -translate-x-1/2">
                <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[11px] border-l-transparent border-r-transparent border-t-[#ffe28a] drop-shadow-[0_3px_8px_rgba(255,226,138,0.65)]" />
                <div className="absolute left-1/2 top-[14px] flex -translate-x-1/2 items-center gap-[26px]">
                  <span className="block h-[2px] w-[10px] rounded-full bg-[#ffe28a]/55" />
                  <span className="block h-[2px] w-[10px] rounded-full bg-[#ffe28a]/55" />
                </div>
                <div className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-b-[11px] border-l-[10px] border-r-[10px] border-b-[#ffe28a] border-l-transparent border-r-transparent drop-shadow-[0_-3px_8px_rgba(255,226,138,0.65)]" />
                <div className="absolute bottom-[14px] left-1/2 flex -translate-x-1/2 items-center gap-[26px]">
                  <span className="block h-[2px] w-[10px] rounded-full bg-[#ffe28a]/55" />
                  <span className="block h-[2px] w-[10px] rounded-full bg-[#ffe28a]/55" />
                </div>
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[1.5px] w-[32px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe28a]"
                  animate={{
                    opacity: hasResult ? 0 : isSpinning ? 0.45 : 0.7,
                    width: hasResult ? 0 : 32,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-y-3 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#fff0be] via-[#ffd266] to-[#c98a2c]"
                  animate={{
                    boxShadow: hasResult
                      ? "0 0 26px rgba(255,226,138,0.85), 0 0 4px rgba(255,226,138,0.9)"
                      : isSpinning
                      ? "0 0 18px rgba(255,226,138,0.55), 0 0 2px rgba(255,226,138,0.7)"
                      : "0 0 10px rgba(255,226,138,0.35)",
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
              {winFlashId > 0 ? (
                <div key={`flash-${winFlashId}`} className="screen-flash" />
              ) : null}
              {winFlashId > 0 ? (
                <div key={`burst-${winFlashId}`} className="win-burst">
                  <div className="win-burst-ring" />
                  <div className="win-burst-ring delay" />
                </div>
              ) : null}
              <div className={frame.edgeFade} />
              <div className={frame.edgeFadeRight} />
              <motion.div
                ref={stripRef}
                className="flex gap-1 px-1.5"
                initial={false}
                animate={spinAnimate}
                transition={spinTransition}
                onAnimationComplete={() => {
                  if (transitionValue !== "none") {
                    completeSingleSpin();
                  }
                }}
              >
                {displayItems.map((item, index) => {
                  const isWinning = hasResult && index === SINGLE_WIN_INDEX;
                  return (
                    <motion.div
                      ref={index === 0 ? sampleCardRef : null}
                      key={`${item.id}-${index}`}
                      className={`relative grid h-[252px] min-w-0 flex-none basis-[calc((100%-20px)/6)] place-items-center overflow-hidden rounded-[20px] border border-white/[0.04] bg-gradient-to-b ${rarityTone[item.rarity]} p-2.5 shadow-[0_10px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]`}
                      animate={
                        isWinning
                          ? {
                              scale: [1, 1.06, 1.02],
                              boxShadow: [
                                "0 10px 24px rgba(0,0,0,0.35), 0 0 0 rgba(255, 226, 138, 0)",
                                "0 10px 24px rgba(0,0,0,0.35), 0 0 52px rgba(255, 226, 138, 0.75)",
                                "0 10px 24px rgba(0,0,0,0.35), 0 0 28px rgba(255, 226, 138, 0.42)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {isWinning ? (
                        <motion.div
                          className="pointer-events-none absolute inset-0 z-10 rounded-[20px]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0.6, 0.4] }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{
                            background:
                              "radial-gradient(circle at 50% 50%, rgba(255,226,138,0.22), transparent 65%)",
                          }}
                        />
                      ) : null}
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
                        <p className="text-sm font-black text-white">
                          {item.name}
                        </p>
                        {showPrices ? (
                          <CoinPrice
                            value={item.price}
                            className="mt-1 justify-center text-xs font-black text-[#ffd35a]"
                          />
                        ) : null}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}
        </div>

        {!detachedControls ? controlsContent : null}
      </motion.section>

      {detachedControls ? (
        <div className={frame.controlsShell}>{controlsContent}</div>
      ) : null}
    </div>
  );
}
