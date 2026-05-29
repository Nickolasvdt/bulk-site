"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

function StatCounter({
  value, suffix, label,
}: {
  value: number; suffix: string; label: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 py-12 px-8">
      <div className="font-display font-semibold text-[clamp(48px,7vw,80px)] leading-none tracking-[-0.04em] text-bg">
        {display}{suffix}
      </div>
      <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-bg/50">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="bg-accent">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-bg/20">
          <StatCounter value={200} suffix="+" label="Negócios atendidos em SP" />
          <StatCounter value={7}   suffix=" dias" label="Prazo de entrega do site" />
          <StatCounter value={24}  suffix="h" label="Atendimento via IA" />
        </div>
      </div>
    </section>
  );
}
