"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  italic?: boolean;
}

export function SplitText({
  text,
  className,
  delay = 0,
  as = "span",
  italic = false,
}: SplitTextProps) {
  const Tag = motion[as];

  return (
    <Tag
      className={cn("inline", italic && "italic", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </Tag>
  );
}
