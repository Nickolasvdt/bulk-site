"use client";

import { useRef } from "react";
import { useInView, motion } from "motion/react";

const sectors = [
  { name: "Automotivo",  pct: 6,  height: 25 },
  { name: "Fitness",     pct: 8,  height: 32 },
  { name: "Outros",      pct: 9,  height: 36 },
  { name: "Saúde",       pct: 11, height: 45 },
  { name: "Varejo",      pct: 12, height: 50 },
  { name: "Beleza",      pct: 14, height: 60 },
  { name: "Alimentação", pct: 18, height: 76 },
  { name: "Serviços",    pct: 22, height: 100 },
];

export function SectorsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
            Onde atuamos
          </p>
          <h2 className="font-display font-semibold text-[clamp(24px,3.2vw,40px)] leading-[1.05] tracking-[-0.025em]">
            Segmentos onde{" "}
            <span className="font-display italic text-accent">mais crescemos.</span>
          </h2>
          <p className="text-[13px] text-mute mt-3">
            Distribuição da nossa base de 200+ negócios atendidos em São Paulo
          </p>
        </div>

        {/* Desktop bars (vertical) */}
        <div
          ref={ref}
          className="hidden md:grid gap-3 items-end h-[320px] py-2"
          style={{
            gridTemplateColumns: `repeat(${sectors.length}, 1fr)`,
            backgroundImage: "linear-gradient(#61000018 1px, transparent 1px)",
            backgroundSize: "100% 40px",
          }}
        >
          {sectors.map((s, i) => (
            <div key={s.name} className="flex flex-col items-center h-full">
              <div className="flex flex-col justify-end flex-1 w-full">
                <motion.div
                  className="w-full bg-accent rounded-t-lg flex justify-center items-end pb-2"
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${s.height}%` } : { height: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[12px] font-semibold text-bg">{s.pct}%</span>
                </motion.div>
              </div>
              <p className="text-[11px] text-mute text-center mt-3 leading-[1.2]">{s.name}</p>
            </div>
          ))}
        </div>

        {/* Mobile bars (horizontal) */}
        <div className="md:hidden flex flex-col gap-4">
          {[...sectors].reverse().map((s, i) => (
            <div key={s.name} className="flex items-center gap-3">
              <p className="text-[12px] text-mute w-[100px] shrink-0 text-right">{s.name}</p>
              <div className="flex-1 h-8 bg-ink/[0.05] rounded-md overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-md flex items-center justify-end pr-3"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.pct * 4.5}%` } : { width: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[11px] font-semibold text-bg">{s.pct}%</span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
