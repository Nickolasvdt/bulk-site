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
      <div className="font-display font-bold text-[clamp(48px,7vw,80px)] leading-none tracking-[-0.04em] text-bg">
        {display}{suffix}
      </div>
      <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-bg/50">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const stats = [
    { value: 7,  suffix: " dias", label: "Para o site no ar" },
    { value: 24, suffix: "h",     label: "Atendimento com IA" },
    { value: 6,  suffix: "",      label: "Serviços para crescer" },
  ];

  return (
    <section className="bg-accent">
      <div className="max-w-[1280px] mx-auto">
        <div className="overflow-x-auto md:overflow-visible no-scrollbar">
          <div className="flex md:grid md:grid-cols-3 divide-x divide-bg/20 min-w-max md:min-w-0">
            {stats.map((s) => (
              <div key={s.label} className="min-w-[min(200px,65vw)] md:min-w-0">
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}