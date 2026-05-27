"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({
  href,
  variant = "primary",
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };

  const variantClass = {
    primary: "bg-accent text-bg hover:bg-ink",
    ghost: "bg-transparent text-ink hover:bg-ink hover:text-bg border border-ink/20",
    outline: "bg-transparent text-bg border border-bg/30 hover:bg-bg hover:text-ink",
  }[variant];

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium",
        "transition-colors duration-200 select-none",
        variantClass,
        className
      )}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.a>
  );
}
