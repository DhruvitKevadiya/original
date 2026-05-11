"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Banner() {
  return (
    <motion.section
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[260px] overflow-hidden rounded-[32px] border border-transparent bg-[radial-gradient(circle_at_72%_38%,rgba(255,240,178,0.34),transparent_0_19rem),linear-gradient(135deg,#272116_0%,#5d421d_48%,#e2942a_100%)] p-6 shadow-soft sm:p-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,9,5,0.35),transparent_60%)]" />
      <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-honey-300/20 blur-2xl" />
      <div className="absolute bottom-0 right-4 hidden text-[210px] leading-none drop-shadow-2xl md:block">💰</div>
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="absolute bottom-4 right-36 hidden text-[150px] leading-none drop-shadow-2xl lg:block"
      >
        🎍
      </motion.div>

      <div className="relative z-10 max-w-xl">
        <div className="mb-5 inline-flex h-[42px] items-center gap-2 rounded-[17px] bg-cocoa-950/36 px-4 text-sm font-black text-honey-300 shadow-insetWarm">
          <Sparkles size={17} fill="currentColor" />
          Bamboo Rush
        </div>
        <h1 className="max-w-[560px] text-4xl font-black leading-[0.98] text-white sm:text-6xl">
          Мягкий дроп с большим золотом
        </h1>
        <p className="mt-4 max-w-md text-base font-bold leading-6 text-amber-100/78 sm:text-lg">
          Открывай кейсы, лови редкие предметы и забирай тёплые бонусы события.
        </p>
        <button className="mt-7 h-[46px] rounded-[18px] bg-gradient-to-b from-honey-300 to-ember-400 px-7 text-base font-black text-[#3a1705] shadow-warm transition hover:-translate-y-0.5 hover:brightness-105">
          К событию
        </button>
      </div>
    </motion.section>
  );
}
