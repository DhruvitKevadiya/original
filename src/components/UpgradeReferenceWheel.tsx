"use client";

import { useId } from "react";

type UpgradeReferenceWheelProps = {
  size?: number | string;
  arcStart?: number;
  arcEnd?: number;
  arcThickness?: number;
  showOuterTicks?: boolean;
  showInnerTicks?: boolean;
  glowIntensity?: number;
  backgroundColor?: string;
  className?: string;
};

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

function joinClasses(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export function UpgradeReferenceWheel({
  size = "100%",
  arcStart = 210,
  arcEnd = 330,
  arcThickness = 8,
  showOuterTicks = true,
  showInnerTicks = true,
  glowIntensity = 1,
  backgroundColor = "#090d16",
  className,
}: UpgradeReferenceWheelProps) {
  const id = useId().replace(/:/g, "");

  const outerRingOuter = 43.5;
  const outerRingInner = outerRingOuter - arcThickness;
  const arcPath = describeArcPath(50, 50, outerRingOuter, outerRingInner, arcStart, arcEnd);

  const outerTicks = Array.from({ length: 48 }, (_, index) => {
    const angle = (index / 48) * 360;
    const isMajor = index % 4 === 0;
    const start = polarToCartesian(50, 50, 44.8, angle);
    const end = polarToCartesian(50, 50, isMajor ? 50 : 48.1, angle);

    return { angle, isMajor, start, end };
  });

  const innerTicks = Array.from({ length: 72 }, (_, index) => {
    const angle = (index / 72) * 360;
    const start = polarToCartesian(50, 50, 30.2, angle);
    const end = polarToCartesian(50, 50, 33.4, angle);

    return { angle, start, end };
  });

  return (
    <div
      className={joinClasses("relative aspect-square shrink-0", className)}
      style={{ width: size, height: typeof size === "number" ? size : undefined }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" role="presentation" aria-hidden="true">
        <defs>
          <radialGradient id={`bg-${id}`} cx="50%" cy="44%" r="70%">
            <stop offset="0%" stopColor="#141b2d" />
            <stop offset="72%" stopColor="#0d1220" />
            <stop offset="100%" stopColor={backgroundColor} />
          </radialGradient>

          <linearGradient id={`ring-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#30374d" />
            <stop offset="50%" stopColor="#1b2132" />
            <stop offset="100%" stopColor="#2a3147" />
          </linearGradient>

          <linearGradient id={`arc-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd33f" />
            <stop offset="24%" stopColor="#ffb622" />
            <stop offset="52%" stopColor="#ff6f1d" />
            <stop offset="78%" stopColor="#ffad22" />
            <stop offset="100%" stopColor="#ffd247" />
          </linearGradient>

          <filter id={`arc-glow-${id}`} x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation={2.8 * glowIntensity} result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 1.15 0
              "
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`shadow-${id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="4.6" floodColor="#000000" floodOpacity="0.38" />
          </filter>
        </defs>

        <circle cx="50" cy="50" r="48" fill={`url(#bg-${id})`} />

        {showOuterTicks
          ? outerTicks.map((tick) => (
              <line
                key={`outer-${tick.angle}`}
                x1={tick.start.x}
                y1={tick.start.y}
                x2={tick.end.x}
                y2={tick.end.y}
                stroke="#aeb8d8"
                strokeOpacity={tick.isMajor ? 0.42 : 0.18}
                strokeWidth={tick.isMajor ? 0.34 : 0.18}
                strokeLinecap="round"
              />
            ))
          : null}

        <circle cx="50" cy="50" r="44.6" fill="none" stroke="rgba(219,228,255,0.08)" strokeWidth="0.36" />
        <circle cx="50" cy="50" r="42.8" fill={`url(#ring-${id})`} stroke="rgba(255,255,255,0.035)" strokeWidth="0.3" filter={`url(#shadow-${id})`} />
        <circle cx="50" cy="50" r="35.8" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.2" />

        {showInnerTicks
          ? innerTicks.map((tick) => (
              <line
                key={`inner-${tick.angle}`}
                x1={tick.start.x}
                y1={tick.start.y}
                x2={tick.end.x}
                y2={tick.end.y}
                stroke="#7a839f"
                strokeOpacity={0.15}
                strokeWidth={0.15}
                strokeLinecap="round"
              />
            ))
          : null}

        <circle cx="50" cy="50" r="34.2" fill="#0b1019" />
        <circle cx="50" cy="50" r="34.2" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.18" />

        <path d={arcPath} fill={`url(#arc-${id})`} filter={`url(#arc-glow-${id})`} />
        <path d={arcPath} fill="none" stroke="#ffdf70" strokeOpacity="0.55" strokeWidth="0.22" />
      </svg>
    </div>
  );
}

