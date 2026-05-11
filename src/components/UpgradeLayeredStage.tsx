"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, WalletCards, Zap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CoinPrice } from "./CoinPrice";
import { UpgradeReferenceWheel } from "./UpgradeReferenceWheel";
import { liveDrops } from "@/data/mock";

const quickChoices = ["x2", "x3", "x5", "x10"] as const;
const FULL_TURN = 360;
const SPIN_DURATION_MS = 5200;
const FAST_SPIN_DURATION_MS = 4100;
const PREPARE_MS = 220;
const SLOWING_MS = 1500;

type UpgradeResult = "win" | "lose";
type AnimationHint = "normal" | "near_miss" | "big_win";
type WheelState = "idle" | "preparing" | "spinning" | "slowing" | "win" | "lose" | "reset";

type UpgradeSpinPayload = {
  result: UpgradeResult;
  winChance: number;
  animationHint: AnimationHint;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeArcPath(cx: number, cy: number, outerRadius: number, innerRadius: number, startAngle: number, endAngle: number) {
  const outerStart = polarToCartesian(cx, cy, outerRadius, endAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, startAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
}

function getStopAngle(result: UpgradeResult, animationHint: AnimationHint, winSweep: number) {
  const halfWinSweep = winSweep / 2;
  const innerWinPadding = Math.min(halfWinSweep - 2, 10);

  if (result === "win") {
    if (animationHint === "big_win") {
      return 0;
    }

    return (Math.random() * 2 - 1) * Math.max(4, innerWinPadding);
  }

  if (animationHint === "near_miss") {
    const offset = halfWinSweep + 4 + Math.random() * 6;
    return Math.random() > 0.5 ? offset : -offset;
  }

  const safeStart = halfWinSweep + 18;
  const safeEnd = 170;
  const loseAngle = safeStart + Math.random() * (safeEnd - safeStart);

  return Math.random() > 0.5 ? loseAngle : -loseAngle;
}

async function simulateUpgrade(currentWinChance: number): Promise<UpgradeSpinPayload> {
  await new Promise((resolve) => window.setTimeout(resolve, 320));

  const normalizedChance = clamp(currentWinChance, 4, 92);
  const roll = Math.random() * 100;
  const result: UpgradeResult = roll <= normalizedChance ? "win" : "lose";
  let animationHint: AnimationHint = "normal";

  if (result === "win" && normalizedChance <= 18) {
    animationHint = "big_win";
  } else if (result === "lose" && Math.random() > 0.55) {
    animationHint = "near_miss";
  }

  return {
    result,
    winChance: normalizedChance,
    animationHint,
  };
}

function UpgradeWheel({
  winChance,
  result,
  animationHint = "normal",
  isSpinning,
  onFinish,
}: {
  winChance: number;
  result: UpgradeResult | null;
  animationHint?: AnimationHint;
  isSpinning: boolean;
  onFinish: (result: UpgradeResult) => void;
}) {
  const [wheelState, setWheelState] = useState<WheelState>("idle");
  const [rotation, setRotation] = useState(0);
  const [transitionValue, setTransitionValue] = useState("none");
  const timersRef = useRef<number[]>([]);
  const runIdRef = useRef(0);

  const winSweep = useMemo(() => clamp((winChance / 100) * FULL_TURN, 18, 320), [winChance]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (!isSpinning || !result) return;

    runIdRef.current += 1;
    const currentRunId = runIdRef.current;
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    const targetAngle = getStopAngle(result, animationHint, winSweep);
    const totalTurns = (animationHint === "big_win" ? 8.2 : 6.6) * FULL_TURN;
    const duration = animationHint === "big_win" ? SPIN_DURATION_MS + 420 : FAST_SPIN_DURATION_MS + 900;
    const nextRotation = rotation + totalTurns - targetAngle;

    setWheelState("preparing");
    setTransitionValue("none");

    timersRef.current.push(
      window.setTimeout(() => {
        if (runIdRef.current !== currentRunId) return;
        setWheelState("spinning");
        setTransitionValue(`transform ${duration}ms cubic-bezier(0.08, 0.78, 0.16, 1)`);
        setRotation(nextRotation);
      }, PREPARE_MS),
    );

    timersRef.current.push(
      window.setTimeout(() => {
        if (runIdRef.current !== currentRunId) return;
        setWheelState("slowing");
      }, duration - SLOWING_MS),
    );
  }, [animationHint, isSpinning, result, rotation, winSweep]);

  function handleTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "transform" || !result || !isSpinning) return;

    setWheelState(result === "win" ? "win" : "lose");
    setTransitionValue("none");
    onFinish(result);

    timersRef.current.push(window.setTimeout(() => setWheelState("reset"), 1550));
    timersRef.current.push(window.setTimeout(() => setWheelState("idle"), 1980));
  }

  const isWinState = wheelState === "win";
  const isLoseState = wheelState === "lose";
  const isPreparing = wheelState === "preparing";
  const isSlowing = wheelState === "slowing";

  return (
    <div className="relative mx-auto flex h-[420px] w-[420px] items-center justify-center sm:h-[470px] sm:w-[470px]">
      <div
        className={`pointer-events-none absolute inset-0 rounded-full blur-3xl transition duration-500 ${
          isWinState
            ? "bg-[radial-gradient(circle,rgba(255,184,67,0.16),rgba(255,102,26,0.10),transparent_70%)]"
            : isLoseState
              ? "bg-[radial-gradient(circle,rgba(255,88,88,0.07),rgba(58,66,96,0.10),transparent_72%)]"
              : "bg-[radial-gradient(circle,rgba(255,155,64,0.05),rgba(69,82,124,0.08),transparent_74%)]"
        }`}
      />

      <motion.div
        className={`relative z-10 h-[388px] w-[388px] sm:h-[430px] sm:w-[430px] ${
          isPreparing ? "scale-[0.988]" : isSlowing ? "scale-[1.008]" : "scale-100"
        }`}
        style={{ transform: `rotate(${rotation}deg)`, transition: transitionValue }}
        onTransitionEnd={handleTransitionEnd}
      >
        <UpgradeReferenceWheel
          size="100%"
          arcStart={210}
          arcEnd={330}
          arcThickness={8.1}
          showOuterTicks
          showInnerTicks
          glowIntensity={isWinState ? 1.14 : isLoseState ? 0.88 : 1}
          backgroundColor="#090d16"
        />
      </motion.div>

      <AnimatePresence>
        {wheelState === "win" || wheelState === "lose" ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className={`pointer-events-none absolute bottom-2 left-1/2 z-40 -translate-x-1/2 rounded-[18px] border px-4 py-2 text-center shadow-[0_16px_36px_rgba(0,0,0,0.32)] ${
              wheelState === "win"
                ? "border-[#ffd35a]/55 bg-[linear-gradient(180deg,rgba(31,28,18,0.94),rgba(16,18,22,0.98))]"
                : "border-[#ff6767]/40 bg-[linear-gradient(180deg,rgba(30,18,21,0.94),rgba(16,18,22,0.98))]"
            }`}
          >
            <p className={`text-xs font-black uppercase tracking-[0.18em] ${wheelState === "win" ? "text-[#ffd35a]" : "text-[#ff8a8a]"}`}>
              {wheelState === "win" ? "Upgrade success" : "Upgrade failed"}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function UpgradeSkinCard({
  item,
  label,
  side,
}: {
  item: (typeof liveDrops)[number];
  label: string;
  side: "left" | "right";
}) {
  const isLeft = side === "left";

  return (
    <article className="relative min-h-[372px] overflow-hidden rounded-[22px] border border-[#2b344c] bg-[linear-gradient(180deg,rgba(23,26,40,0.88),rgba(10,13,23,0.92))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_24px_52px_rgba(0,0,0,0.3)]">
      <div
        className={`pointer-events-none absolute inset-x-10 bottom-[128px] h-28 rounded-full blur-3xl ${
          isLeft ? "bg-[#ff643d]/12" : "bg-[#8b55ff]/12"
        }`}
      />
      <img
        src="/textures/paw-mark.png"
        alt=""
        className="pointer-events-none absolute left-1/2 top-[39%] h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.07] mix-blend-soft-light"
      />

      <div className="relative z-10 flex items-center gap-3 text-sm font-black uppercase tracking-[0.04em] text-[#aeb8d8]">
        <Search size={18} className={isLeft ? "text-[#ff7e3f]" : "text-[#b876ff]"} strokeWidth={2.7} />
        {label}
      </div>

      <div className="relative z-10 mt-7 grid min-h-[184px] place-items-center">
        <img src={item.image} alt="" className="h-[158px] w-[286px] object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.54)]" />
      </div>

      <div className="relative z-10 mt-4">
        <p className="text-[19px] font-black leading-tight text-white">{item.name}</p>
        <p className="mt-1 text-[15px] font-bold text-[#aeb8d8]">{isLeft ? "Выбранный скин" : "Цель апгрейда"}</p>
        <CoinPrice value={item.price} className={`mt-3 text-[18px] font-black ${isLeft ? "text-[#ff7e3f]" : "text-[#bd7aff]"}`} />
      </div>
    </article>
  );
}

export function UpgradeLayeredStage() {
  const leftItem = liveDrops[0];
  const rightItem = liveDrops[3];
  const [activeQuickChoice, setActiveQuickChoice] = useState<(typeof quickChoices)[number]>("x3");
  const [spinPayload, setSpinPayload] = useState<UpgradeSpinPayload | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [finishResult, setFinishResult] = useState<UpgradeResult | null>(null);

  const currentWinChance = 48.54;

  async function runUpgrade() {
    if (isSpinning) return;

    setFinishResult(null);
    setIsSpinning(true);
    const nextPayload = await simulateUpgrade(currentWinChance);
    setSpinPayload(nextPayload);
  }

  function handleWheelFinish(result: UpgradeResult) {
    setIsSpinning(false);
    setFinishResult(result);
  }

  return (
    <section className="relative overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_50%_46%,rgba(55,86,130,0.16),transparent_26rem),linear-gradient(180deg,#0e1421,#080b14)] p-4 shadow-[0_32px_86px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(84,122,204,0.12),transparent_22rem)]" />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-start">
          <div className="inline-flex w-fit overflow-hidden rounded-[18px] border border-[#263149] bg-[#10131d]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]">
            <button className="relative inline-flex h-[46px] min-w-[140px] items-center justify-center gap-3 border-r border-[#263149] bg-[#171a28] px-5 text-[15px] font-black uppercase text-white">
              <Zap size={20} className="text-[#ff9a3d]" fill="currentColor" strokeWidth={2.5} />
              Скины
              <span className="absolute inset-x-10 bottom-0 h-[2px] rounded-full bg-[#ff9a3d] shadow-[0_0_14px_rgba(255,126,63,0.7)]" />
            </button>
            <button className="inline-flex h-[46px] min-w-[140px] items-center justify-center gap-3 px-5 text-[15px] font-black uppercase text-[#8d96b3] transition hover:text-[#dfe6ff]">
              <WalletCards size={19} strokeWidth={2.4} />
              Баланс
            </button>
          </div>
        </div>

        <div className="relative grid gap-4 xl:grid-cols-[306px_1fr_306px] xl:items-center">
          <UpgradeSkinCard item={leftItem} label="Ваш скин" side="left" />

          <div className="relative mx-auto flex min-h-[360px] w-full max-w-[420px] items-center justify-center">
            <UpgradeWheel
              winChance={spinPayload?.winChance ?? currentWinChance}
              result={spinPayload?.result ?? null}
              animationHint={spinPayload?.animationHint ?? "normal"}
              isSpinning={isSpinning}
              onFinish={handleWheelFinish}
            />
          </div>

          <UpgradeSkinCard item={rightItem} label="Целевой скин" side="right" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[306px_1fr_306px] xl:items-center">
          <div className="rounded-[18px] border border-[#263149] bg-[linear-gradient(180deg,#111827,#0c111d)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm font-black uppercase text-[#8d96b3]">Добавить баланс</p>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-white">0</span>
                <button className="grid h-10 w-10 place-items-center rounded-[16px] border border-[#263149] bg-[#10131d] text-2xl leading-none text-[#ff9a3d]">
                  +
                </button>
              </div>
            </div>
            <div className="relative h-2 rounded-full bg-[#2a3042]">
              <span className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#ff7e3f] shadow-[0_0_18px_rgba(255,126,63,0.55)]" />
            </div>
            <div className="mt-5 flex items-center justify-between text-sm font-bold text-[#6f7893]">
              <span>0</span>
              <span>250 000</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={runUpgrade}
              disabled={isSpinning}
              className="inline-flex h-[54px] min-w-[244px] items-center justify-center gap-3 rounded-[20px] border border-[#ffb35c]/76 bg-[linear-gradient(180deg,#ff9a3d,#e85f12)] px-7 text-[16px] font-black uppercase text-white shadow-[0_14px_34px_rgba(255,126,63,0.26),inset_0_1px_0_rgba(255,255,255,0.24)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Zap size={24} fill="currentColor" strokeWidth={2.4} />
              {isSpinning ? "Апгрейд..." : "Улучшить скин"}
            </button>
            <button
              type="button"
              onClick={runUpgrade}
              disabled={isSpinning}
              className="grid h-[54px] w-[54px] place-items-center rounded-[20px] border border-[#263149] bg-[#10131d] text-[#6f7893] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:-translate-y-0.5 hover:text-[#dfe6ff] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Zap size={22} strokeWidth={2.2} />
            </button>
          </div>

          <div className="rounded-[18px] border border-[#263149] bg-[linear-gradient(180deg,#111827,#0c111d)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm font-black uppercase text-[#8d96b3]">Быстрый выбор</p>
              <SlidersHorizontal size={18} className="text-[#6f7893]" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {quickChoices.map((item) => (
                <button
                  key={`quick-${item}`}
                  type="button"
                  onClick={() => setActiveQuickChoice(item)}
                  className={`h-[46px] rounded-[17px] border text-sm font-black transition ${
                    activeQuickChoice === item
                      ? "border-[#ff7e3f] bg-[#171a28] text-[#ffd35a] shadow-[0_0_20px_rgba(255,126,63,0.18)]"
                      : "border-[#263149] bg-[#10131d] text-[#8d96b3] hover:text-[#dfe6ff]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-[16px] border border-[#20283a] bg-[#0e1421]/76 px-4 py-3 text-sm font-bold text-[#8d96b3]">
              {spinPayload ? (
                <span>
                  Сценарий: <span className="text-white">{spinPayload.result}</span> / <span className="text-white">{spinPayload.animationHint}</span>
                </span>
              ) : finishResult ? (
                <span>
                  Итог: <span className={finishResult === "win" ? "text-[#7dffbe]" : "text-[#ff8a8a]"}>{finishResult}</span>
                </span>
              ) : (
                <span>Шанс {currentWinChance.toFixed(2)}%</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
