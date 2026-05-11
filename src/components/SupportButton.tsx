import { Headphones } from "lucide-react";

export function SupportButton() {
  return (
    <a
      href="#"
      aria-label="Быстрая поддержка"
      className="fixed bottom-5 right-5 z-50 flex h-[52px] items-center gap-3 rounded-[20px] bg-[linear-gradient(180deg,#2c2114,#171008)] px-4 text-honey-300 shadow-[0_18px_38px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,229,160,0.1)] transition hover:-translate-y-1 hover:bg-cocoa-800 hover:brightness-105 sm:bottom-6 sm:right-6"
    >
      <span className="grid h-9 w-9 place-items-center rounded-[15px] bg-gradient-to-b from-honey-300 to-honey-500 text-[#3a1705] shadow-warm">
        <Headphones size={19} strokeWidth={3} />
      </span>
      <span className="hidden items-center text-sm font-black leading-none text-amber-100 sm:flex">
        <span className="text-sm font-black text-amber-100">Поддержка</span>
      </span>
    </a>
  );
}
