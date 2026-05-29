"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import Image from "next/image";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div ref={ref} className="font-display font-bold text-[clamp(56px,10vw,120px)] leading-none tracking-[-0.04em] text-bg">
      {val.toLocaleString("pt-BR")}{suffix}
    </div>
  );
}

export function MissionSection() {
  return (
    <section
      className="relative bg-ink py-24 md:py-32 overflow-hidden"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1400&q=80)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-ink/80" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8 flex flex-col items-center text-center">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Bulk"
          width={160}
          height={64}
          className="h-14 w-auto object-contain brightness-0 invert mb-8"
        />

        <p className="text-[11px] font-mono tracking-[0.22em] uppercase text-bg/40 mb-6">
          Nossa missão
        </p>

        <h2 className="font-display font-bold text-[clamp(24px,3.5vw,44px)] leading-[1.1] tracking-[-0.025em] text-bg max-w-2xl">
          Colocar todo negócio local<br />
          <span className="font-display italic text-accent">visível no digital.</span>
        </h2>

        <p className="text-[15px] text-bg/55 mt-5 max-w-md leading-relaxed">
          Todo negócio local merece ser encontrado por quem precisa dele. É isso que construímos,
          todo dia, aqui em São Paulo.
        </p>

        <div className="mt-12 flex flex-col items-center gap-2">
          <Counter target={100} suffix="%" />
          <p className="text-[14px] font-mono tracking-[0.1em] uppercase text-bg/50">
            foco em negócio local
          </p>
        </div>

      </div>
    </section>
  );
}
