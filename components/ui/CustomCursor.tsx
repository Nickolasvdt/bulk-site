"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 600, damping: 45, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 600, damping: 45, mass: 0.3 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(
        !!(
          t.closest("a") ||
          t.closest("button") ||
          t.dataset.cursor === "link"
        )
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.style.cursor = "";
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: hovered ? 44 : 8,
          height: hovered ? 44 : 8,
          x: hovered ? -22 : -4,
          y: hovered ? -22 : -4,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />
    </motion.div>
  );
}
