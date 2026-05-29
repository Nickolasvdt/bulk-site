"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type MenuId = "servicos" | "sobre" | null;

const servicos = [
  { name: "Site Profissional", desc: "No ar em 7 dias", href: "#como-funciona" },
  { name: "IA no WhatsApp", desc: "Atendimento 24h/7d", href: "#como-funciona" },
  { name: "Google Meu Negócio", desc: "Pág. 1 no local", href: "#como-funciona" },
  { name: "Manutenção Mensal", desc: "Suporte contínuo", href: "#como-funciona" },
];

const sobre = [
  { name: "A Bulk", desc: "Nossa história e missão", href: "#sobre" },
  { name: "Casos de Sucesso", desc: "Resultados reais", href: "#casos" },
  { name: "Blog", desc: "Conteúdo para crescer", href: "#blog" },
  { name: "Contato", desc: "Fale conosco", href: "#contato" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
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
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${headerBg}`}
      ref={menuRef}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="leading-none shrink-0">
          <Image
            src="/logo.png"
            alt="Bulk"
            width={80}
            height={32}
            priority
            className={`h-8 w-auto transition-all duration-300 ${
              scrolled ? "brightness-0" : "brightness-100"
            }`}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Serviços dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setActiveMenu("servicos")}
              className={`flex items-center gap-1 px-4 py-2 rounded-md text-[13px] transition-colors ${
                scrolled ? "text-ink/70 hover:text-ink" : "text-bg/70 hover:text-bg"
              }`}
            >
              Serviços
              <svg className="w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {[
            { label: "Casos", href: "#casos" },
            { label: "Planos", href: "#planos" },
            { label: "Blog", href: "#blog" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-[13px] transition-colors ${
                scrolled ? "text-ink/60 hover:text-ink" : "text-bg/60 hover:text-bg"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Sobre dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setActiveMenu("sobre")}
              className={`flex items-center gap-1 px-4 py-2 rounded-md text-[13px] transition-colors ${
                scrolled ? "text-ink/60 hover:text-ink" : "text-bg/60 hover:text-bg"
              }`}
            >
              Sobre nós
              <svg className="w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contato"
            className={`text-[12px] font-medium px-4 py-2 rounded-md transition-colors ${
              scrolled
                ? "text-ink/60 hover:text-ink"
                : "text-bg/60 hover:text-bg"
            }`}
          >
            Área do cliente
          </a>
          <a
            href="#contato"
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md text-[12px] font-medium transition-colors ${
              scrolled
                ? "bg-accent text-bg hover:bg-sun"
                : "bg-bg text-ink hover:bg-bg/90"
            }`}
          >
            Agendar diagnóstico
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] items-center justify-center w-8 h-8"
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className={`block w-5 h-px transition-all ${
                mobileOpen
                  ? i === 0 ? "rotate-45 translate-y-[7px]" : "-rotate-45 -translate-y-[7px]"
                  : ""
              } ${scrolled ? "bg-ink" : "bg-bg"}`}
            />
          ))}
        </button>
      </div>

      {/* Mega menu dropdown */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            onMouseLeave={() => setActiveMenu(null)}
            className="absolute top-full left-0 right-0 bg-bg border-b border-rule shadow-xl"
          >
            <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-8 grid grid-cols-4 gap-6">
              {(activeMenu === "servicos" ? servicos : sobre).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveMenu(null)}
                  className="group flex flex-col gap-1 p-4 rounded-xl hover:bg-ink/[0.03] transition-colors"
                >
                  <span className="font-medium text-[14px] text-ink group-hover:text-accent transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[12px] text-mute">{item.desc}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                { label: "Serviços", href: "#como-funciona" },
                { label: "Casos", href: "#casos" },
                { label: "Planos", href: "#planos" },
                { label: "Blog", href: "#blog" },
                { label: "Sobre nós", href: "#sobre" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-rule text-[14px] text-ink"
                >
                  {link.label}
                  <span className="text-mute">›</span>
                </a>
              ))}
              <div className="py-5">
                <a
                  href="#contato"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center bg-accent text-bg rounded-md py-3 text-[13px] font-medium"
                >
                  Agendar diagnóstico →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
