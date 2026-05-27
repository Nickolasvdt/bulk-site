"use client";

import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: "normal" | "slow";
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  speed = "normal",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn("group overflow-hidden", className)}
      role="marquee"
      aria-hidden
    >
      <div
        className={cn(
          "flex w-max",
          speed === "normal" ? "animate-marquee" : "animate-marquee-slow",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}
