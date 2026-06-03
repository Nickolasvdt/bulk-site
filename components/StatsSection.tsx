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
    <div ref={ref} className="flex flex-col items-center gap-1 md:gap-2 py-8 md:py-12 px-2 md:px-8">
      <div className="font-display font-bold text-[clamp(24px,6vw,80px)] leading-none tracking-[-0.04em] text-bg">
        {display}{suffix}
      </div>
      <p className="text-[9px] md:text-[11px] font-mono tracking-[0.1em] md:tracking-[0.18em] uppercase text-bg/50 text-center leading-tight">
        {label}
      </p>
    </div>
  );
}

const stats = [
  { value: 7,  suffix: " dias", label: "Para o site no ar" },
  { value: 24, suffix: "h",     label: "Atendimento com IA" },
  { value: 6,  suffix: "",      label: "Serviços para crescer" },
];

export function StatsSection() {
  return (
    <section className="bg-accent">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex divide-x divide-bg/20">
          {stats.map((s) => (
            <div key={s.label} className="flex-1 min-w-0">
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
