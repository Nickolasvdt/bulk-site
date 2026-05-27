"use client";

import { motion } from "motion/react";

const stats = [
  { value: "7 dias", label: "Site no ar" },
  { value: "24h", label: "IA atendendo" },
  { value: "Pág. 1", label: "Google local" },
  { value: "Inclusa", label: "Manutenção" },
];

function PhoneMockup() {
  return (
    <svg
      width="128"
      height="238"
      viewBox="0 0 128 238"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Frame */}
      <rect x="1" y="1" width="126" height="236" rx="22" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1.5" />
      {/* Camera notch */}
      <rect x="47" y="8" width="34" height="5" rx="2.5" fill="currentColor" fillOpacity="0.10" />
      {/* Screen bg */}
      <rect x="7" y="18" width="114" height="194" rx="4" fill="currentColor" fillOpacity="0.03" />
      {/* Nav bar */}
      <rect x="16" y="26" width="96" height="7" rx="3" fill="currentColor" fillOpacity="0.10" />
      {/* Headline */}
      <rect x="16" y="44" width="74" height="6" rx="3" fill="currentColor" fillOpacity="0.10" />
      <rect x="16" y="55" width="56" height="6" rx="3" fill="currentColor" fillOpacity="0.07" />
      {/* CTA button */}
      <rect x="16" y="70" width="46" height="14" rx="4" fill="#610000" fillOpacity="0.80" />
      {/* Divider */}
      <rect x="16" y="96" width="96" height="0.75" fill="currentColor" fillOpacity="0.07" />
      {/* Cards */}
      <rect x="16" y="104" width="44" height="40" rx="5" fill="currentColor" fillOpacity="0.05" />
      <rect x="66" y="104" width="46" height="40" rx="5" fill="currentColor" fillOpacity="0.05" />
      <rect x="22" y="114" width="28" height="3" rx="1.5" fill="currentColor" fillOpacity="0.08" />
      <rect x="22" y="121" width="20" height="3" rx="1.5" fill="currentColor" fillOpacity="0.06" />
      <rect x="72" y="114" width="28" height="3" rx="1.5" fill="currentColor" fillOpacity="0.08" />
      <rect x="72" y="121" width="20" height="3" rx="1.5" fill="currentColor" fillOpacity="0.06" />
      {/* Testimonial block */}
      <rect x="16" y="154" width="96" height="34" rx="5" fill="currentColor" fillOpacity="0.05" />
      <rect x="24" y="163" width="54" height="3" rx="1.5" fill="currentColor" fillOpacity="0.08" />
      <rect x="24" y="170" width="38" height="3" rx="1.5" fill="currentColor" fillOpacity="0.06" />
      {/* Sun dot accent in testimonial */}
      <circle cx="105" cy="166" r="6" fill="#540000" fillOpacity="0.55" />
      {/* WhatsApp notification */}
      <circle cx="104" cy="26" r="7.5" fill="#22C55E" fillOpacity="0.88" />
      <rect x="101.5" y="24" width="5" height="1.5" rx="0.75" fill="white" fillOpacity="0.9" />
      <rect x="101.5" y="27" width="5" height="1.5" rx="0.75" fill="white" fillOpacity="0.9" />
      {/* Home indicator */}
      <rect x="49" y="220" width="30" height="3" rx="1.5" fill="currentColor" fillOpacity="0.10" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="bg-ink text-bg flex-1 flex flex-col">
      <div className="max-w-6xl mx-auto my-auto px-6 md:px-8 pt-20 pb-12 md:pt-24 md:pb-14 relative">

        {/* Phone mockup — desktop only, decorative */}
        <motion.div
          className="hidden xl:block absolute right-0 top-16 pointer-events-none select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="animate-float text-bg">
            <PhoneMockup />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-[11px] font-mono tracking-[0.2em] uppercase text-bg/30 mb-8"
        >
          Agência digital <span className="text-accent">·</span> São Paulo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold text-[clamp(38px,5.5vw,68px)] leading-[0.93] tracking-[-0.03em] max-w-3xl"
        >
          Presença digital<br />
          <span className="italic text-accent">que vende</span><br />
          todo dia.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-8 flex flex-col md:flex-row md:items-center gap-7 max-w-4xl"
        >
          <p className="text-[14px] leading-[1.65] text-bg/55 max-w-[360px]">
            Site profissional, IA no WhatsApp e Google Meu Negócio.
            Seu negócio encontrado e faturando todo dia.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5 bg-accent text-bg px-5 py-2.5 rounded-md text-[13px] font-medium hover:bg-[#420000] transition-colors"
            >
              Agendar diagnóstico →
            </motion.a>
            <a href="#como-funciona" className="text-[12px] text-bg/30 hover:text-accent transition-colors">
              Como funciona ↓
            </a>
          </div>
        </motion.div>

        <div className="mt-14 md:mt-18 pt-6 border-t border-accent/25 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-display font-semibold text-[26px] md:text-[30px] leading-none tracking-[-0.03em] text-accent">
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
