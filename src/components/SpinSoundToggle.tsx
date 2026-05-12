"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function SpinSoundToggle() {
  const [isEnabled, setIsEnabled] = useState(true);
  const Icon = isEnabled ? Volume2 : VolumeX;

  return (
    <button
      type="button"
      onClick={() => setIsEnabled((value) => !value)}
      aria-pressed={isEnabled}
      aria-label={
        isEnabled
          ? "\u0412\u044b\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0437\u0432\u0443\u043a \u0441\u043f\u0438\u043d\u0430"
          : "\u0412\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0437\u0432\u0443\u043a \u0441\u043f\u0438\u043d\u0430"
      }
      className="inline-flex h-[42px] items-center gap-2 rounded-[14px] border border-[#161c2a] bg-[linear-gradient(180deg,#0e131e,#070a12)] px-4 text-sm font-black text-[#ffe28a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:-translate-y-0.5 hover:border-[#ffe28a]/30 hover:text-[#fff0be]"
    >
      <Icon size={18} strokeWidth={2.7} />
      <span className="hidden sm:inline">{isEnabled ? "\u0417\u0432\u0443\u043a \u0432\u043a\u043b" : "\u0417\u0432\u0443\u043a \u0432\u044b\u043a\u043b"}</span>
    </button>
  );
}
