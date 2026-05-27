"use client";

import { useScroll, motion, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-px bg-accent z-[100] origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
}
