"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "@/lib/site-config";
import { useContactModal } from "@/components/contact/useContactModal";

type MenuId = "servicos" | "sobre" | null;

const servicos = SERVICES.map((s) => ({
  name: s.name,
  desc: s.short,
  href: `/servicos/${s.slug}`,
}));

const sobre = [
  { name: "Casos", desc: "O que já entregamos", href: "/#casos" },
  { name: "Blog", desc: "Conteúdo para crescer", href: "/blog" },
  { name: "Orçamento", desc: "Proposta sob medida", href: "/orcamento" },
];

function DropdownMenu({ items, onClose }: { items: typeof servicos; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-0 mt-1 min-w-[220px] bg-bg rounded-xl shadow-2xl border border-rule py-1.5 z-10"
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="group flex flex-col gap-0.5 px-4 py-3 hover:bg-ink/[0.04] transition-colors"
        >
          <span className="font-medium text-[14px] text-ink group-hover:text-accent transition-colors">
            {item.name}
          </span>
          <span className="text-[12px] text-mute">{item.desc}</span>
        </a>
      ))}
    </motion.div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { openContact } = useContactModal();
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Fora da home não há hero escuro: o nav precisa ser sólido (texto escuro).
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const headerBg = scrolled
    ? "bg-bg/95 backdrop-blur-md border-b border-rule"
    : "bg-transparent";

  return (
    <motion.header
      role="banner"
      aria-label="Navegação principal"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${headerBg}`}
      ref={headerRef}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="leading-none shrink-0" aria-label="Bulk — página inicial">
          <Image
            src="/logo.png"
            alt="Bulk"
            width={120}
            height={48}
            priority
            className={`h-10 w-auto object-contain transition-all duration-300 ${
              solid ? "brightness-0" : "brightness-100"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Menu principal">
          {/* Serviços dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("servicos")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              aria-expanded={activeMenu === "servicos"}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-4 py-2 min-h-[44px] rounded-md text-[14px] transition-colors ${
                solid ?"text-ink/70 hover:text-ink" : "text-bg/70 hover:text-bg"
              }`}
            >
              Serviços
              <svg className="w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <AnimatePresence>
              {activeMenu === "servicos" && (
                <DropdownMenu items={servicos} onClose={() => setActiveMenu(null)} />
              )}
            </AnimatePresence>
          </div>

          {[
            { label: "Casos", href: "/#casos" },
            { label: "Blog", href: "/blog" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 min-h-[44px] inline-flex items-center text-[14px] transition-colors ${
                solid ?"text-ink/60 hover:text-ink" : "text-bg/60 hover:text-bg"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Sobre dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("sobre")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              aria-expanded={activeMenu === "sobre"}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-4 py-2 min-h-[44px] rounded-md text-[14px] transition-colors ${
                solid ?"text-ink/60 hover:text-ink" : "text-bg/60 hover:text-bg"
              }`}
            >
              Sobre nós
              <svg className="w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <AnimatePresence>
              {activeMenu === "sobre" && (
                <DropdownMenu items={sobre} onClose={() => setActiveMenu(null)} />
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => openContact()}
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 min-h-[44px] rounded-md text-[14px] font-semibold transition-colors ${
              scrolled
                ? "bg-accent text-bg hover:bg-sun"
                : "bg-bg text-ink hover:bg-bg/90"
            }`}
          >
            Agendar diagnóstico
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] items-center justify-center w-11 h-11"
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className={`block w-5 h-px transition-all ${
                mobileOpen
                  ? i === 0 ? "rotate-45 translate-y-[7px]" : "-rotate-45 -translate-y-[7px]"
                  : ""
              } ${solid ?"bg-ink" : "bg-bg"}`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg border-t border-rule overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-6">
              {[
                { label: "Serviços", href: "/#servicos" },
                { label: "Casos", href: "/#casos" },
                { label: "Blog", href: "/blog" },
                { label: "Orçamento", href: "/orcamento" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-rule text-[15px] text-ink min-h-[52px]"
                >
                  {link.label}
                  <span className="text-mute" aria-hidden="true">›</span>
                </a>
              ))}
              <div className="py-5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openContact();
                  }}
                  className="w-full flex items-center justify-center bg-accent text-bg rounded-md py-3.5 text-[14px] font-semibold min-h-[48px]"
                >
                  Agendar diagnóstico →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
