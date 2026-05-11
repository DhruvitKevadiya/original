import { stats } from "@/data/mock";
import { Instagram, Music2, Send } from "lucide-react";

const footerText =
  "\u0422\u0451\u043c\u043d\u0430\u044f \u0438\u0433\u0440\u043e\u0432\u0430\u044f \u0432\u0438\u0442\u0440\u0438\u043d\u0430 \u043a\u0435\u0439\u0441\u043e\u0432, \u0430\u043f\u0433\u0440\u0435\u0439\u0434\u043e\u0432 \u0438 \u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u043e\u0432 \u0441 \u0431\u044b\u0441\u0442\u0440\u044b\u043c \u043e\u0442\u043a\u0440\u044b\u0442\u0438\u0435\u043c \u0438 live-\u0434\u0440\u043e\u043f\u0430\u043c\u0438.";

const docs = [
  "\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u043e\u0435 \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435",
  "\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u043e\u0441\u0442\u0438",
  "\u041f\u0440\u0430\u0432\u0438\u043b\u0430 \u0441\u0435\u0440\u0432\u0438\u0441\u0430",
];

const sections = [
  "\u041a\u0435\u0439\u0441\u044b",
  "\u0410\u043f\u0433\u0440\u0435\u0439\u0434",
  "\u041a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u044b",
  "\u0411\u043e\u043d\u0443\u0441\u044b",
  "\u041f\u0430\u0440\u0442\u043d\u0451\u0440\u043a\u0430",
];

export function StatsFooter() {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[18px] border border-[#242838] bg-[linear-gradient(180deg,#171a28,#10131d)] px-6 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_12px_28px_rgba(0,0,0,0.18)]"
          >
            <p className="text-[22px] font-black leading-tight text-[#dfe6ff] sm:text-[26px]">
              {stat.value}
            </p>
            <p className="text-[12px] font-black leading-tight text-[#8d96b3] sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <footer className="relative overflow-hidden py-12 text-sm font-bold text-[#8d96b3]">
        <div className="pointer-events-none absolute inset-x-[-7%] bottom-[-60px] h-[200px] bg-[radial-gradient(circle_at_50%_35%,rgba(77,92,140,0.08),transparent_25rem),radial-gradient(circle_at_70%_55%,rgba(255,145,74,0.03),transparent_18rem)]" />
        <div className="relative z-10 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <a
              href="/"
              className="group/logo inline-flex h-10 w-[186px] items-center"
            >
              <span className="text-[31px] font-black leading-none tracking-[-0.01em] transition duration-300 ease-out group-hover/logo:-translate-y-0.5 group-hover/logo:scale-[1.02]">
                <span className="text-white transition group-hover/logo:text-[#e5ebff]">
                  Case
                </span>
                <span className="text-[#ff9a3d] transition group-hover/logo:text-[#ffb35c]">
                  GO
                </span>
              </span>
            </a>
            <p className="max-w-sm leading-relaxed text-[#8d96b3]">
              {footerText}
            </p>
            <div className="flex items-center gap-3">
              {[Send, Instagram, Music2].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={["Telegram", "Instagram", "TikTok"][index]}
                  className="grid h-11 w-11 place-items-center rounded-[20px] border border-[#242838] bg-[linear-gradient(180deg,#171a28,#10131d)] text-[#aeb8d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.035),0_8px_18px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:border-[#6f7ea8] hover:text-[#dfe6ff]"
                >
                  <Icon size={18} strokeWidth={index === 0 ? 2.6 : 2.5} />
                </a>
              ))}
            </div>
            <p className="text-xs font-black text-[#61697d]">
              {
                "\u00a9 2026 CaseGo. \u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b."
              }
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#aeb8d8]">
              {"\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b"}
            </h4>
            <nav className="flex flex-col gap-3">
              {docs.map((label) => (
                <a
                  key={label}
                  className="text-white/72 transition hover:text-[#dfe6ff]"
                  href="#"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#aeb8d8]">
              {"\u0420\u0430\u0437\u0434\u0435\u043b\u044b"}
            </h4>
            <nav className="flex flex-col gap-3">
              {sections.map((label) => (
                <a
                  key={label}
                  className="text-white/72 transition hover:text-[#dfe6ff]"
                  href="#cases"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#aeb8d8]">
              {"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b"}
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                className="text-white/72 transition hover:text-[#dfe6ff]"
                href="mailto:support@casego.example"
              >
                support@casego.example
              </a>
              <a
                className="text-white/72 transition hover:text-[#dfe6ff]"
                href="#"
              >
                Telegram
              </a>
              <a
                className="text-white/72 transition hover:text-[#dfe6ff]"
                href="#"
              >
                {"\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430"}
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
