"use client";

import { motion } from "motion/react";

const stats = [
  { value: "7 dias", label: "Site no ar" },
  { value: "24h", label: "IA atendendo" },
  { value: "Pág. 1", label: "Google local" },
  { value: "Inclusa", label: "Manutenção" },
];

export function Hero() {
  return (
    <section className="bg-ink text-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-16 md:pt-32 md:pb-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-[11px] font-mono tracking-[0.2em] uppercase text-bg/30 mb-8"
        >
          Agência digital · São Paulo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold text-[clamp(38px,5.5vw,68px)] leading-[0.93] tracking-[-0.03em] max-w-3xl"
        >
          Presença digital<br />
          <span className="italic text-bg/45">que vende</span><br />
          todo dia.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-8 flex flex-col md:flex-row md:items-center gap-7 max-w-4xl"
        >
          <p className="text-[14px] leading-[1.65] text-bg/40 max-w-[360px]">
            Site profissional, IA no WhatsApp e Google Meu Negócio.
            Seu negócio encontrado e faturando todo dia.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#contato"
              className="inline-flex items-center gap-1.5 bg-bg text-ink px-5 py-2.5 rounded-md text-[13px] font-medium hover:bg-accent hover:text-bg transition-colors"
            >
              Agendar diagnóstico →
            </a>
            <a href="#como-funciona" className="text-[12px] text-bg/30 hover:text-bg/55 transition-colors">
              Como funciona ↓
            </a>
          </div>
        </motion.div>

        <div className="mt-14 md:mt-18 pt-6 border-t border-bg/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-display font-semibold text-[26px] md:text-[30px] leading-none tracking-[-0.03em]">
                {s.value}
              </div>
              <div className="mt-1.5 text-[10px] font-mono tracking-[0.16em] uppercase text-bg/30">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
