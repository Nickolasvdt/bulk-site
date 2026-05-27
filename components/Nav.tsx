"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const links = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Casos", href: "#casos" },
  { label: "Planos", href: "#planos" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = scrolled ? "bg-bg/95 backdrop-blur-md border-b border-ink/[0.06]" : "bg-transparent";
  const textColor = scrolled ? "text-ink" : "text-bg";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}
    >
      <div className={`max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between h-14 ${textColor}`}>
        <a href="#" className="leading-none">
          <img
            src="/logo.png"
            alt="Bulk"
            className={`h-8 w-auto transition-all duration-300 ${scrolled ? "brightness-0" : "brightness-100"}`}
          />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] opacity-55 hover:opacity-100 transition-opacity">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contato"
            className={`hidden md:inline-flex items-center gap-1 px-4 py-2 rounded-md text-[12px] font-medium transition-colors ${
              scrolled ? "bg-ink text-bg hover:bg-accent" : "bg-bg text-ink hover:bg-accent hover:text-bg"
            }`}
          >
            Falar com a Bulk
          </a>

          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] items-center justify-center w-8 h-8"
          >
            <span className={`block w-5 h-px transition-all ${open ? "rotate-45 translate-y-[6px]" : ""} ${scrolled ? "bg-ink" : "bg-bg"}`} />
            <span className={`block w-5 h-px transition-all ${open ? "-rotate-45 -translate-y-[6px]" : ""} ${scrolled ? "bg-ink" : "bg-bg"}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-bg text-ink border-t border-ink/[0.06]">
          <div className="max-w-6xl mx-auto px-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 border-b border-ink/[0.06] text-[14px]"
              >
                {l.label} <span className="text-mute text-sm">→</span>
              </a>
            ))}
            <div className="py-5">
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center bg-ink text-bg rounded-md py-3 text-[13px] font-medium"
              >
                Falar com a Bulk →
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
