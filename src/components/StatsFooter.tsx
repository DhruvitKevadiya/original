import { stats } from "@/data/mock";
import { Instagram, Music2, Send, ShieldCheck } from "lucide-react";

const footerText =
  "Тёмная игровая витрина кейсов, апгрейдов и контрактов с быстрым открытием и live-дропами.";

const docs = [
  "Пользовательское соглашение",
  "Политика приватности",
  "Правила сервиса",
  "Fair-play",
];

const sections = [
  "Кейсы",
  "Апгрейд",
  "Контракты",
  "Бонусы",
  "Партнёрка",
];

const partners = ["VISA", "MasterCard", "Bitcoin", "USDT", "Steam", "Skinpay"];

const socials = [
  { Icon: Send, label: "Telegram", strokeWidth: 2.6 },
  { Icon: Instagram, label: "Instagram", strokeWidth: 2.5 },
  { Icon: Music2, label: "TikTok", strokeWidth: 2.5 },
];

export function StatsFooter() {
  return (
    <>
      <section className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-[16px] border border-[#171c2a] bg-[linear-gradient(180deg,#0d1220,#070a12)] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,226,138,0.12),transparent)]" />
            <p className="text-[24px] font-black leading-none text-[#f0f3ff] sm:text-[28px]">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[10px] font-black uppercase leading-none tracking-[0.18em] text-[#6c7491]">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <footer className="relative mt-10 pt-8 text-sm font-bold text-[#7a8198]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(174,184,216,0.14),transparent)]" />

        <div className="relative z-10 mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#4a5266]">
          {partners.map((partner, idx) => (
            <span key={partner} className="flex items-center gap-6">
              {partner}
              {idx < partners.length - 1 ? (
                <span className="h-1 w-1 rounded-full bg-[#2a3046]" />
              ) : null}
            </span>
          ))}
        </div>

        <div className="pointer-events-none relative z-0 mb-8 h-px bg-[linear-gradient(90deg,transparent,rgba(60,68,92,0.4),transparent)]" />

        <div className="relative z-10 grid gap-x-10 gap-y-8 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <a
              href="/"
              className="group/logo inline-flex items-center gap-2"
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                className="h-8 w-8 shrink-0 transition duration-300 ease-out group-hover/logo:-translate-y-0.5 group-hover/logo:rotate-[6deg]"
              >
                <defs>
                  <linearGradient id="footer-brand-bg" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#1c2335" />
                    <stop offset="1" stopColor="#0a0e18" />
                  </linearGradient>
                </defs>
                <path
                  d="M6 1 L26 1 L31 6 L31 26 L26 31 L6 31 L1 26 L1 6 Z"
                  fill="url(#footer-brand-bg)"
                  stroke="#2a3145"
                  strokeWidth="1.4"
                />
                <path
                  d="M21.5 10.5 A 7 7 0 1 0 21.5 21.5"
                  stroke="#ffe28a"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="20.4" cy="16" r="1.8" fill="#ff9a3d" />
              </svg>
              <span className="text-[24px] font-black leading-none tracking-[-0.01em] transition duration-300 ease-out group-hover/logo:-translate-y-0.5">
                <span className="text-white transition group-hover/logo:text-[#e5ebff]">
                  Case
                </span>
                <span className="text-[#ff9a3d] transition group-hover/logo:text-[#ffb35c]">
                  GO
                </span>
              </span>
            </a>
            <p className="max-w-[330px] text-[12.5px] leading-relaxed text-[#7a8198]">
              {footerText}
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ Icon, label, strokeWidth }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-[11px] border border-[#1a1f2e] bg-[#0a0e17] text-[#9aa3bd] transition hover:-translate-y-0.5 hover:border-[#ffe28a]/30 hover:text-[#ffe28a]"
                >
                  <Icon size={15} strokeWidth={strokeWidth} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Документы" links={docs} hrefSuffix="#" />
          <FooterColumn title="Разделы" links={sections} hrefSuffix="#cases" />

          <div>
            <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-[#9aa3bd]">
              {"Контакты"}
            </h4>
            <nav className="flex flex-col gap-2.5 text-[12.5px]">
              <a
                className="w-fit text-[#aab2c9] transition hover:text-[#f0f3ff]"
                href="mailto:support@casego.example"
              >
                support@casego.example
              </a>
              <a className="w-fit text-[#aab2c9] transition hover:text-[#f0f3ff]" href="#">
                Telegram-бот
              </a>
              <a className="w-fit text-[#aab2c9] transition hover:text-[#f0f3ff]" href="#">
                {"Поддержка 24/7"}
              </a>
            </nav>
          </div>
        </div>

        <div className="relative z-10 mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#13182380] pt-5 text-[11px] font-black uppercase tracking-[0.16em] text-[#4a5266] sm:flex-row sm:items-center">
          <p>{"© 2026 CaseGo · Все права защищены"}</p>
          <p className="flex items-center gap-2 normal-case tracking-normal text-[#5a6178]">
            <ShieldCheck size={13} strokeWidth={2.6} className="text-[#42ff8b]/70" />
            <span className="text-[11px] font-black uppercase tracking-[0.16em]">
              {"18+ · Играйте ответственно"}
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}

function FooterColumn({
  title,
  links,
  hrefSuffix,
}: {
  title: string;
  links: string[];
  hrefSuffix: string;
}) {
  return (
    <div>
      <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-[#9aa3bd]">
        {title}
      </h4>
      <nav className="flex flex-col gap-2.5 text-[12.5px]">
        {links.map((label) => (
          <a
            key={label}
            className="w-fit text-[#aab2c9] transition hover:text-[#f0f3ff]"
            href={hrefSuffix}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
