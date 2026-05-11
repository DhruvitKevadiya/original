"use client";

import { Bell, Cog, Search, SlidersHorizontal, Sparkles, Zap } from "lucide-react";

function HeaderChip({
  children,
  accent = "blue",
}: {
  children: React.ReactNode;
  accent?: "blue" | "orange";
}) {
  return (
    <div
      className={`inline-flex h-12 items-center rounded-[18px] border px-4 text-sm font-black tracking-[0.01em] ${
        accent === "orange"
          ? "border-[#5b3a25] bg-[linear-gradient(180deg,#1b1e31,#141827)] text-[#ffb163]"
          : "border-white/10 bg-[linear-gradient(180deg,#1b2134,#131827)] text-[#dce6ff]"
      }`}
    >
      {children}
    </div>
  );
}

function SmallItemCard({
  title,
  price,
  tone,
}: {
  title: string;
  price: string;
  tone: string;
}) {
  return (
    <div
      className={`relative h-[108px] overflow-hidden rounded-[20px] border border-white/6 bg-gradient-to-b ${tone} p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`}
    >
      <div className="absolute left-1/2 top-0 h-1 w-10 -translate-x-1/2 rounded-b-full bg-white/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_46%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="mx-auto h-9 w-[78%] rounded-full bg-white/8 blur-sm" />
        <div>
          <div className="truncate text-[12px] font-black text-white">{title}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-black text-[#ffcf76]">
            <span className="coin" />
            {price}
          </div>
        </div>
      </div>
    </div>
  );
}

function WheelMock({
  accent,
  label,
  sublabel,
}: {
  accent: "scifi" | "clean";
  label: string;
  sublabel: string;
}) {
  const glow =
    accent === "scifi"
      ? "bg-[radial-gradient(circle,rgba(87,127,255,0.34),rgba(112,79,255,0.18),transparent_68%)]"
      : "bg-[radial-gradient(circle,rgba(100,136,255,0.22),rgba(255,186,102,0.10),transparent_70%)]";

  const rim =
    accent === "scifi"
      ? "from-[#1f2743] via-[#0f1322] to-[#1a2140] border-[#4f68bb]/35"
      : "from-[#23293f] via-[#121726] to-[#1d2438] border-white/10";

  const progress =
    accent === "scifi"
      ? "from-[#69a8ff] via-[#7a79ff] to-[#8f5cff]"
      : "from-[#ffcf7b] via-[#ffae63] to-[#7f9cff]";

  return (
    <div className="relative mx-auto flex h-[348px] w-[348px] items-center justify-center">
      <div className={`absolute inset-0 rounded-full blur-3xl ${glow}`} />
      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
        <div className="h-0 w-0 border-x-[12px] border-x-transparent border-t-[20px] border-t-[#eef4ff]" />
      </div>
      <div className={`absolute inset-[18px] rounded-full border bg-[linear-gradient(180deg,var(--tw-gradient-stops))] ${rim}`} />
      <div className="absolute inset-[46px] rounded-full border border-white/6 bg-[#090d18]" />
      <div className="absolute inset-[58px] rounded-full border border-white/10">
        <div
          className={`absolute left-1/2 top-1/2 h-[212px] w-[212px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[20px] border-[#1f2437] border-r-transparent border-t-transparent rotate-[36deg] bg-transparent shadow-[0_0_26px_rgba(0,0,0,0.34)]`}
          style={{
            borderBottomColor: accent === "scifi" ? "#7f7dff" : "#ffb764",
            borderLeftColor: accent === "scifi" ? "#69a8ff" : "#ffcf76",
          }}
        />
        <div className={`absolute inset-[10px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_58%)]`} />
      </div>
      <div className="absolute inset-[92px] rounded-full border border-white/6 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,0.10),rgba(13,16,26,0.94)_62%)]" />
      <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
        <div className="text-[56px] font-black leading-none text-white">48.54%</div>
        <div className={`text-[20px] font-black ${accent === "scifi" ? "text-[#7f9cff]" : "text-[#ffd074]"}`}>{label}</div>
        <div className="text-sm font-bold text-[#8f99bd]">{sublabel}</div>
      </div>
      {Array.from({ length: accent === "scifi" ? 18 : 10 }).map((_, index) => {
        const angle = (index / (accent === "scifi" ? 18 : 10)) * 360;

        return (
          <div
            key={angle}
            className={`absolute left-1/2 top-1/2 h-[2px] rounded-full ${
              accent === "scifi"
                ? "w-4 bg-[#7f8fff]/55 shadow-[0_0_10px_rgba(127,143,255,0.4)]"
                : "w-3 bg-white/18"
            }`}
            style={{
              transform: `rotate(${angle}deg) translateY(-164px)`,
              transformOrigin: "center 164px",
            }}
          />
        );
      })}
      <div
        className={`absolute bottom-[34px] h-10 w-10 rotate-45 rounded-[10px] ${
          accent === "scifi"
            ? "bg-[linear-gradient(180deg,#78a7ff,#7f63ff)] shadow-[0_0_22px_rgba(127,99,255,0.45)]"
            : "bg-[linear-gradient(180deg,#ffcf76,#ff9f5b)] shadow-[0_0_18px_rgba(255,176,99,0.38)]"
        }`}
      />
    </div>
  );
}

function DirectionMock({
  title,
  eyebrow,
  accent,
  description,
}: {
  title: string;
  eyebrow: string;
  accent: "scifi" | "clean";
  description: string;
}) {
  const panelTone =
    accent === "scifi"
      ? "bg-[linear-gradient(180deg,#12182a,#0d1220)] border-[#2a3458]"
      : "bg-[linear-gradient(180deg,#151a2a,#0f1421)] border-white/10";

  const titleTone = accent === "scifi" ? "text-[#cfe0ff]" : "text-[#fff3de]";
  const actionTone =
    accent === "scifi"
      ? "bg-[linear-gradient(180deg,#5a92ff,#8a62ff)] shadow-[0_20px_48px_rgba(90,146,255,0.28)]"
      : "bg-[linear-gradient(180deg,#ffcf74,#ff9f5f)] shadow-[0_20px_48px_rgba(255,176,99,0.28)]";
  const accentText = accent === "scifi" ? "text-[#8ca8ff]" : "text-[#ffbc78]";

  return (
    <section className={`overflow-hidden rounded-[34px] border p-6 shadow-[0_28px_70px_rgba(0,0,0,0.34)] ${panelTone}`}>
      <div className="mb-5 flex items-start justify-between gap-6">
        <div>
          <div className={`mb-2 text-xs font-black uppercase tracking-[0.26em] ${accentText}`}>{eyebrow}</div>
          <h1 className={`text-[34px] font-black leading-none ${titleTone}`}>{title}</h1>
          <p className="mt-3 max-w-[560px] text-sm font-bold leading-relaxed text-[#8f99bd]">{description}</p>
        </div>
        <div className="flex gap-3">
          <HeaderChip>
            <span className="coin mr-2" />
            128 450
          </HeaderChip>
          <div className={`inline-flex h-12 items-center rounded-[18px] px-5 text-sm font-black text-[#0c1120] ${actionTone}`}>
            + Пополнить
          </div>
          <HeaderChip>
            <Bell size={18} />
          </HeaderChip>
          <HeaderChip>
            <Cog size={18} />
          </HeaderChip>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_420px_1fr]">
        <div className="space-y-4">
          <div className="rounded-[28px] border border-white/8 bg-[#141a29] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className={`mb-4 flex items-center gap-3 text-sm font-black uppercase tracking-[0.08em] ${accentText}`}>
              <Zap size={16} />
              Ваш скин
            </div>
            <div className="mb-4 h-[148px] rounded-[22px] bg-[radial-gradient(circle_at_50%_65%,rgba(255,255,255,0.06),transparent_42%)]" />
            <div className="text-[30px] font-black text-white">Crossfade</div>
            <div className="mt-1 text-sm font-bold text-[#8f99bd]">Selected skin</div>
            <div className={`mt-3 inline-flex items-center gap-1 text-2xl font-black ${accentText}`}>
              <span className="coin" />
              98,5
            </div>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-[#141a29] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="mb-4 flex items-center justify-between text-sm font-black text-[#8f99bd]">
              <span>Добавить баланс</span>
              <span>0</span>
            </div>
            <div className="h-2 rounded-full bg-white/8">
              <div className={`h-2 w-[18%] rounded-full ${actionTone}`} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 flex w-full items-center justify-between gap-3">
            <HeaderChip accent={accent === "clean" ? "orange" : "blue"}>
              <Zap size={16} className="mr-2" />
              Скины
            </HeaderChip>
            <div className="flex gap-2">
              {["x1.5", "x2", "x3", "x5", "x10"].map((value, index) => (
                <HeaderChip key={value} accent={index === 2 && accent === "clean" ? "orange" : "blue"}>
                  {value}
                </HeaderChip>
              ))}
            </div>
          </div>
          <WheelMock accent={accent} label={accent === "scifi" ? "High tension" : "Good chance"} sublabel={accent === "scifi" ? "Reactive sci‑fi state" : "Calm premium stop"} />
          <div className={`mt-4 inline-flex h-16 min-w-[360px] items-center justify-center rounded-[24px] px-8 text-xl font-black text-[#0c1120] ${actionTone}`}>
            Улучшить скин
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[28px] border border-white/8 bg-[#141a29] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="mb-4 flex items-center gap-3 text-sm font-black uppercase tracking-[0.08em] text-[#bd8cff]">
              <Sparkles size={16} />
              Целевой скин
            </div>
            <div className="mb-4 h-[148px] rounded-[22px] bg-[radial-gradient(circle_at_50%_65%,rgba(255,255,255,0.06),transparent_42%)]" />
            <div className="text-[30px] font-black text-white">Kintsugi</div>
            <div className="mt-1 text-sm font-bold text-[#8f99bd]">Target skin</div>
            <div className="mt-3 inline-flex items-center gap-1 text-2xl font-black text-[#bd8cff]">
              <span className="coin" />
              18,8
            </div>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-[#141a29] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="mb-4 flex items-center justify-between text-sm font-black text-[#8f99bd]">
              <span>Быстрый выбор</span>
              <SlidersHorizontal size={16} />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["x2", "x3", "x5", "x10"].map((value, index) => (
                <div
                  key={value}
                  className={`grid h-12 place-items-center rounded-[16px] border text-sm font-black ${
                    index === 1
                      ? accent === "scifi"
                        ? "border-[#5e7cff] bg-[#202742] text-[#dfe7ff]"
                        : "border-[#ffad68] bg-[#241a19] text-[#ffe1b0]"
                      : "border-white/10 bg-[#111625] text-[#8f99bd]"
                  }`}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[28px] border border-white/8 bg-[#141a29] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-xl font-black text-white">Ваши скины</div>
            <div className="flex gap-2">
              <HeaderChip>Цена до</HeaderChip>
              <HeaderChip>
                <Search size={16} />
              </HeaderChip>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <SmallItemCard title="Crossfade" price="98,5" tone="from-[#4f2118] to-[#21131a]" />
            <SmallItemCard title="The End" price="74,2" tone="from-[#4a1530] to-[#20121d]" />
            <SmallItemCard title="90s Print" price="61,8" tone="from-[#27184d] to-[#161126]" />
            <SmallItemCard title="Kintsugi" price="18,8" tone="from-[#18254c] to-[#121829]" />
          </div>
        </div>
        <div className="rounded-[28px] border border-white/8 bg-[#141a29] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-xl font-black text-white">Скин апгрейда</div>
            <div className="flex gap-2">
              <HeaderChip>Поиск</HeaderChip>
              <HeaderChip>Цена</HeaderChip>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <SmallItemCard title="Deathgaze" price="10,4" tone="from-[#123243] to-[#111825]" />
            <SmallItemCard title="Crossfade" price="199" tone="from-[#4b3115] to-[#1a1521]" />
            <SmallItemCard title="90s Print" price="125" tone="from-[#2c184a] to-[#161025]" />
            <SmallItemCard title="The End" price="53,4" tone="from-[#4f1a34] to-[#1a1321]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StyleDirectionsPage() {
  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-[1760px]">
        <div className="mb-7 text-center">
          <div className="text-xs font-black uppercase tracking-[0.28em] text-[#7f9cff]">CaseGo style directions</div>
          <h1 className="mt-3 text-4xl font-black text-white">Два нормальных направления без траты времени на переделки вслепую</h1>
          <p className="mx-auto mt-4 max-w-[920px] text-base font-bold leading-relaxed text-[#8f99bd]">
            Слева более эффектный и дорогой sci-fi. Справа более чистый premium. Оба варианта держат текущую логику апгрейда,
            просто по-разному упаковывают сцену, колесо и панели.
          </p>
        </div>

        <div className="space-y-10">
          <DirectionMock
            title="Expensive Sci‑Fi"
            eyebrow="Direction A"
            accent="scifi"
            description="Сильнее делает упор на технологичность: реактивное колесо, холодные синие акценты, больше глубины и напряжения. Подходит, если хочешь ощущение дорогого игрового интерфейса и более драматичный апгрейд."
          />
          <DirectionMock
            title="Clean Premium"
            eyebrow="Direction B"
            accent="clean"
            description="Более спокойная и дорогая подача: чище сетка, меньше визуального шума, теплее акцентная кнопка, мягче контраст. Подходит, если хочешь, чтобы сайт выглядел взрослее и не утомлял глаз."
          />
        </div>
      </div>
    </main>
  );
}
