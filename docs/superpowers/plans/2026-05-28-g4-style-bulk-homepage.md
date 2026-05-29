# G4-Style Bulk Homepage — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recriar a homepage da Bulk com estrutura e visual idênticos ao G4 Business (g4business.com), 13 seções completas, sem reaproveitar componentes do projeto anterior.

**Architecture:** Branch `feat/g4-style-homepage` com componentes 100% novos. Cada seção = 1 arquivo TSX em `components/`. `app/page.tsx` monta as 13 seções na ordem exata do G4. Hero escuro (igual G4), seções de conteúdo em branco, seções especiais em vermelho/dark.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion (`motion/react`), Swiper (`swiper`), pnpm

**Referência:** HTML completo do g4business.com analisado em 2026-05-28 (na conversa de design).

---

## Paleta de cores G4 → Bulk

| Papel              | G4 valor     | Bulk valor    | Tailwind token |
|--------------------|--------------|---------------|----------------|
| Fundo principal    | `#001F35`    | `#FFFFFF`     | `bg-bg`        |
| Texto principal    | `#F5F4F3`    | `#050707`     | `text-ink`     |
| Accent / destaque  | `#B9915B`    | `#610000`     | `text-accent`  |
| Texto secundário   | `#60708A`    | `#6B6B6B`     | `text-mute`    |
| Seções escuras     | `#001F35`    | `#050707`     | `bg-ink`       |
| Borda sutil        | `#001F3526`  | `#05070714`   | `border-rule`  |

**Regra visual:** Hero e Footer sempre escuros (`bg-ink`, texto claro). Seções de conteúdo em branco ou cinza muito sutil (`bg-ink/[0.025]`). Barra de stats e announcement em vermelho (`bg-accent`).

---

## Mapa de arquivos

```
app/
  page.tsx                          REESCREVER — monta 13 seções
  layout.tsx                        MANTER — fontes já configuradas
  globals.css                       ATUALIZAR — adicionar variáveis Swiper override
components/
  AnnouncementBar.tsx               CRIAR — barra topo dismissível
  Nav.tsx                           REESCREVER — mega menu + mobile bottom nav
  HeroCarousel.tsx                  CRIAR — 7 slides Swiper split-layout
  ServicesGrid.tsx                  CRIAR — grid 4 colunas serviços
  TeamCarousel.tsx                  CRIAR — carrossel estilo mentores G4
  TestimonialsCarousel.tsx          CRIAR — carrossel central testimonials
  MissionSection.tsx                CRIAR — seção impacto com counter
  StatsSection.tsx                  CRIAR — 3 contadores animados
  SectorsChart.tsx                  CRIAR — gráfico de barras segmentos
  FeaturedServicesCarousel.tsx      CRIAR — 4-col carrossel serviços com rating
  BlogSection.tsx                   CRIAR — grid blog placeholder
  FaqSection.tsx                    CRIAR — accordion FAQ
  Footer.tsx                        REESCREVER — dark, multi-coluna, social
  ui/
    WhatsAppFloat.tsx               CRIAR — botão flutuante WhatsApp
    MobileBottomNav.tsx             CRIAR — nav inferior mobile
lib/
  cn.ts                             MANTER
next.config.mjs                     VERIFICAR — Unsplash já configurado
tailwind.config.ts                  ATUALIZAR — adicionar token `dark`
package.json                        ATUALIZAR — instalar `swiper`, nome bulk-website
```

---

## Task 0: Setup — Branch + Swiper + nome

**Files:**
- Modify: `package.json`
- Run: git checkout

- [ ] **Step 1: Criar branch a partir do refactor/bulk-institucional**

```bash
git checkout refactor/bulk-institucional
git checkout -b feat/g4-style-homepage
```

- [ ] **Step 2: Instalar Swiper**

```bash
pnpm add swiper
```

- [ ] **Step 3: Atualizar nome do pacote em `package.json`**

Em `package.json`, linha 2, trocar `"bulk-studio"` por `"bulk-website"`:

```json
{
  "name": "bulk-website",
  "version": "0.1.0",
  ...
}
```

- [ ] **Step 4: Commit inicial**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: setup feat/g4-style-homepage branch, install swiper, rename bulk-website"
```

---

## Task 1: Foundation — Tailwind, globals, next.config

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Verify: `next.config.mjs`

- [ ] **Step 1: Atualizar `tailwind.config.ts` — adicionar token `dark`**

Substituir o arquivo completo por:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:     "#FFFFFF",
        ink:    "#050707",
        mute:   "#6B6B6B",
        accent: "#610000",
        sun:    "#420000",
        rule:   "#05070714",
        dark:   "#050707",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia"],
        sans:    ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter:  "-0.03em",
        tight2:   "-0.02em",
        wider2:   "0.16em",
      },
      animation: {
        marquee:       "marquee 40s linear infinite",
        "marquee-slow":"marquee 80s linear infinite",
        "spin-slow":   "spin 60s linear infinite",
        "pulse-dot":   "pulseDot 1.6s ease-in-out infinite",
        float:         "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.4", transform: "scale(0.85)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Atualizar `app/globals.css` — adicionar overrides Swiper**

Adicionar ao final do `globals.css` existente:

```css
/* Swiper overrides — G4-style */
.swiper-button-prev,
.swiper-button-next {
  display: none !important;
}
.swiper-pagination-bullet {
  background: #610000;
  opacity: 0.4;
}
.swiper-pagination-bullet-active {
  opacity: 1;
  width: 26px;
  border-radius: 9999px;
  transition: width 0.3s;
}
/* Smooth scroll para âncoras */
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Verificar `next.config.mjs`**

Confirmar que `plus.unsplash.com` e `images.unsplash.com` estão em `remotePatterns`. O arquivo já está correto — nenhuma mudança necessária.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "chore: tailwind tokens, globals swiper override, scroll-behavior"
```

---

## Task 2: AnnouncementBar

**Files:**
- Create: `components/AnnouncementBar.tsx`

- [ ] **Step 1: Criar `components/AnnouncementBar.tsx`**

```tsx
"use client";

import { useState } from "react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative z-50 bg-accent text-bg py-2.5 px-4 flex items-center justify-center gap-3">
      <p className="text-[12px] font-mono tracking-[0.12em] uppercase text-center">
        <span className="font-semibold">Novo:</span>{" "}
        IA no WhatsApp disponível para o seu negócio{" "}
        <a href="#contato" className="underline underline-offset-2 hover:no-underline ml-1">
          Saiba mais →
        </a>
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Fechar aviso"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-bg/60 hover:text-bg transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verificar visualmente — adicionar temporariamente a `app/page.tsx`**

No `app/page.tsx` atual, adicionar `<AnnouncementBar />` no topo do return e rodar `pnpm dev`. Confirmar que a barra aparece em vermelho com texto e botão de fechar.

- [ ] **Step 3: Remover de page.tsx** (será re-adicionado no Task 16)

- [ ] **Step 4: Commit**

```bash
git add components/AnnouncementBar.tsx
git commit -m "feat: AnnouncementBar — barra topo dismissível estilo G4"
```

---

## Task 3: Nav — Mega Menu + Mobile Bottom Nav

**Files:**
- Rewrite: `components/Nav.tsx`
- Create: `components/ui/MobileBottomNav.tsx`

- [ ] **Step 1: Criar `components/ui/MobileBottomNav.tsx`**

```tsx
"use client";

import { useState } from "react";

type Drawer = "servicos" | "casos" | "planos" | "mais" | null;

const drawerContent: Record<NonNullable<Drawer>, { title: string; subtitle?: string; href: string }[]> = {
  servicos: [
    { title: "Site Profissional", subtitle: "No ar em 7 dias", href: "#como-funciona" },
    { title: "IA no WhatsApp", subtitle: "Atendimento 24h/7d", href: "#como-funciona" },
    { title: "Google Meu Negócio", subtitle: "Pág. 1 no local", href: "#como-funciona" },
    { title: "Manutenção Mensal", subtitle: "Suporte contínuo", href: "#como-funciona" },
  ],
  casos: [
    { title: "Todos os Casos", href: "#casos" },
    { title: "Barbearias", href: "#casos" },
    { title: "Restaurantes", href: "#casos" },
    { title: "Salões e Beleza", href: "#casos" },
  ],
  planos: [
    { title: "Ver Planos", href: "#planos" },
    { title: "Agendar diagnóstico", href: "#contato" },
  ],
  mais: [
    { title: "Sobre a Bulk", href: "#sobre" },
    { title: "Blog", href: "#blog" },
    { title: "Contato", href: "#contato" },
    { title: "Política de Privacidade", href: "#" },
  ],
};

export function MobileBottomNav() {
  const [open, setOpen] = useState<Drawer>(null);

  const toggle = (drawer: Drawer) =>
    setOpen((prev) => (prev === drawer ? null : drawer));

  return (
    <>
      {/* Spacer */}
      <div className="md:hidden h-[70px]" />

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-ink/30 z-[99998] md:hidden"
          onClick={() => setOpen(null)}
        />
      )}

      {/* Drawer */}
      {open && (
        <div className="fixed left-0 right-0 bottom-[70px] max-h-[55vh] bg-bg rounded-t-2xl shadow-2xl z-[100000] md:hidden flex flex-col overflow-hidden">
          <div className="w-20 h-1 bg-ink rounded-full mx-auto mt-3 mb-2 cursor-pointer" onClick={() => setOpen(null)} />
          <div className="overflow-auto pb-4">
            {drawerContent[open].map((item) => (
              <a
                key={item.href + item.title}
                href={item.href}
                onClick={() => setOpen(null)}
                className="flex items-center justify-between px-5 py-4 border-b border-rule hover:bg-ink/[0.03]"
              >
                <div>
                  <p className="font-semibold text-[16px] text-ink">{item.title}</p>
                  {item.subtitle && <p className="text-[13px] text-mute mt-0.5">{item.subtitle}</p>}
                </div>
                <span className="text-mute text-sm">›</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-[70px] bg-bg border-t border-rule z-[99999] md:hidden flex">
        {(["servicos", "casos", "planos", "mais"] as Drawer[]).map((id) => {
          const labels: Record<NonNullable<Drawer>, string> = {
            servicos: "Serviços",
            casos: "Casos",
            planos: "Planos",
            mais: "Mais",
          };
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 text-[11px] font-mono tracking-wide transition-colors ${
                open === id ? "text-accent" : "text-mute"
              }`}
            >
              <span className="text-[18px] leading-none">
                {id === "servicos" ? "◈" : id === "casos" ? "◉" : id === "planos" ? "◎" : "⋯"}
              </span>
              {labels[id]}
            </button>
          );
        })}
      </nav>
    </>
  );
}
```

- [ ] **Step 2: Reescrever `components/Nav.tsx` — mega menu completo**

```tsx
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
  const menuRef = useRef<HTMLDivElement>(null);

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
```

- [ ] **Step 3: Verificar** — `pnpm dev`, confirmar nav fixa, mega menu no hover de "Serviços", mobile hamburguer funciona

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx components/ui/MobileBottomNav.tsx
git commit -m "feat: Nav mega menu G4-style + MobileBottomNav com drawers"
```

---

## Task 4: HeroCarousel — 7 slides Swiper

**Files:**
- Create: `components/HeroCarousel.tsx`

- [ ] **Step 1: Criar `components/HeroCarousel.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const slides = [
  {
    id: "bulk",
    label: "Agência Digital · São Paulo",
    headline: "Presença digital\nque vende\ntodo dia.",
    desc: "Site profissional, IA no WhatsApp e Google Meu Negócio. Seu negócio encontrado, escolhido e faturando.",
    cta: "Agendar diagnóstico",
    href: "#contato",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "site",
    label: "Site Profissional",
    headline: "No ar em\n7 dias,\ncompleto.",
    desc: "Design sob medida, mobile-first, velocidade máxima. Domínio e hospedagem inclusos.",
    cta: "Saiba mais",
    href: "#como-funciona",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ia",
    label: "IA no WhatsApp",
    headline: "Atendendo\ndominingo às\n23h.",
    desc: "Agente que responde, qualifica e agenda pelo WhatsApp. Automático, sem parar.",
    cta: "Saiba mais",
    href: "#como-funciona",
    image: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "google",
    label: "Google Meu Negócio",
    headline: "Apareça\nprimeiro\nperto de você.",
    desc: "Configurado e otimizado. Quando buscam seu serviço no bairro, você aparece primeiro.",
    cta: "Saiba mais",
    href: "#como-funciona",
    image: "https://plus.unsplash.com/premium_photo-1682088367648-735b1a6ac612?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "manutencao",
    label: "Manutenção Mensal",
    headline: "Sempre\natualizado,\nsempre no ar.",
    desc: "Relatório mensal, suporte contínuo, atualizações. Nada quebrado, nada desatualizado.",
    cta: "Ver planos",
    href: "#planos",
    image: "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "numeros",
    label: "Negócios em São Paulo",
    headline: "200+\nnegócios\nno digital.",
    desc: "Barbearias, restaurantes, salões, lojas, clínicas. Todos aparecendo e faturando.",
    cta: "Ver casos",
    href: "#casos",
    image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bulk-pass",
    label: "Bulk Pass",
    headline: "O plano\ncompleto\npara crescer.",
    desc: "Site + IA + Google + Manutenção. Tudo junto, com prioridade e desconto.",
    cta: "Em breve",
    href: "#planos",
    image: "https://plus.unsplash.com/premium_photo-1661902210733-17533340166f?auto=format&fit=crop&w=1200&q=80",
  },
];

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Slide anterior" : "Próximo slide"}
      className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors shrink-0"
    >
      <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
        {dir === "prev" ? (
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    </button>
  );
}

export function HeroCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative bg-ink text-bg min-h-screen">
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className="h-screen min-h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex h-full">
              {/* Left — text */}
              <div className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] px-8 md:px-16 lg:px-20 pt-24 pb-16">
                <p className="text-[11px] font-mono tracking-[0.22em] uppercase text-bg/35 mb-6">
                  {slide.label}
                </p>
                <div className="w-8 h-px bg-bg/20 mb-6" />
                <h1 className="font-display font-semibold text-[clamp(38px,5.5vw,72px)] leading-[0.92] tracking-[-0.03em] whitespace-pre-line max-w-lg">
                  {slide.headline}
                </h1>
                <p className="mt-7 text-[14px] leading-[1.65] text-bg/50 max-w-[320px]">
                  {slide.desc}
                </p>
                <div className="mt-8 flex items-center gap-4 flex-wrap">
                  <a
                    href={slide.href}
                    className="inline-flex items-center gap-2 bg-accent text-bg px-6 py-3 rounded-md text-[13px] font-medium hover:bg-sun transition-colors"
                  >
                    {slide.cta} →
                  </a>
                  <a href="#como-funciona" className="text-[12px] text-bg/30 hover:text-accent transition-colors">
                    Como funciona ↓
                  </a>
                </div>
              </div>

              {/* Right — background image */}
              <div
                className="hidden lg:block absolute right-0 top-0 w-[52%] h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
              </div>

              {/* Mobile bg */}
              <div
                className="lg:hidden absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 left-8 md:left-16 lg:left-20 z-20 flex items-center gap-2">
        <ArrowButton dir="prev" onClick={() => swiperRef.current?.slidePrev()} />
        <ArrowButton dir="next" onClick={() => swiperRef.current?.slideNext()} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — rodar `pnpm dev`, confirmar que carrossel aparece, autoplay funciona, setas funcionam, imagens carregam

- [ ] **Step 3: Commit**

```bash
git add components/HeroCarousel.tsx
git commit -m "feat: HeroCarousel — 7 slides Swiper G4-style split layout"
```

---

## Task 5: ServicesGrid — Grid 4 colunas

**Files:**
- Create: `components/ServicesGrid.tsx`

- [ ] **Step 1: Criar `components/ServicesGrid.tsx`**

```tsx
import { motion } from "motion/react";

const services = [
  {
    label: "Site",
    name: "PROFISSIONAL",
    desc: "Participe de experiências imersivas com design sob medida, mobile-first e velocidade máxima. No ar em 7 dias, com domínio e hospedagem inclusos.",
    href: "#como-funciona",
  },
  {
    label: "IA no",
    name: "WHATSAPP",
    desc: "Conecte-se com seus clientes 24h por dia. Agente que responde, qualifica e agenda automaticamente pelo WhatsApp.",
    href: "#como-funciona",
  },
  {
    label: "Google",
    name: "MEU NEGÓCIO",
    desc: "Acesse a presença local completa: configuração, otimização e monitoramento. Apareça primeiro quando buscam perto de você.",
    href: "#como-funciona",
  },
  {
    label: "Manutenção",
    name: "MENSAL",
    desc: "Atualizações, relatório mensal e suporte contínuo. Seu site sempre no ar, sempre atualizado, sem preocupação.",
    href: "#planos",
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-bg py-16 border-b border-rule">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-rule">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 p-8 group"
            >
              {/* Logo prefix */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-[11px] font-mono text-mute uppercase tracking-[0.1em]">Bulk</span>
              </div>

              <div>
                <p className="text-[11px] font-mono tracking-[0.12em] text-mute uppercase">{s.label}</p>
                <h3 className="font-display font-semibold text-[22px] tracking-[-0.02em] text-ink mt-0.5">
                  {s.name}
                </h3>
              </div>

              <p className="text-[13px] leading-[1.65] text-mute flex-1">{s.desc}</p>

              <a
                href={s.href}
                className="inline-flex items-center gap-2 text-[12px] font-medium text-accent hover:gap-3 transition-all"
              >
                Explorar
                <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — 4 colunas no desktop, 2 no tablet, 1 no mobile

- [ ] **Step 3: Commit**

```bash
git add components/ServicesGrid.tsx
git commit -m "feat: ServicesGrid — grid 4 colunas G4-style com serviços Bulk"
```

---

## Task 6: TeamCarousel — Estilo mentores G4

**Files:**
- Create: `components/TeamCarousel.tsx`

- [ ] **Step 1: Criar `components/TeamCarousel.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const team = [
  {
    firstName: "Nicolas",
    lastName: "Vidt",
    role: "Fundador da Bulk, especialista em presença digital local",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    firstName: "Rafael",
    lastName: "Costa",
    role: "CTO · Arquitetura de sistemas e IA conversacional",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    firstName: "Ana",
    lastName: "Ferreira",
    role: "Design Lead · UX/UI e identidade visual para PMEs",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    firstName: "Lucas",
    lastName: "Martins",
    role: "Growth · SEO local e Google Meu Negócio",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
  {
    firstName: "Mariana",
    lastName: "Lima",
    role: "CS · Sucesso do cliente e onboarding",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=600&q=80",
  },
];

export function TeamCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
              Nossa equipe
            </p>
            <h2 className="font-display font-semibold text-[clamp(26px,3.5vw,44px)] leading-[1.05] tracking-[-0.025em]">
              Na Bulk, só entrega<br />
              <span className="font-display italic text-accent">quem executa.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors"
              aria-label="Anterior"
            >
              <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors"
              aria-label="Próximo"
            >
              <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1.2}
          spaceBetween={10}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={(s) => { swiperRef.current = s; }}
          breakpoints={{
            640:  { slidesPerView: 2.2 },
            768:  { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 5 },
          }}
        >
          {team.map((member) => (
            <SwiperSlide key={member.lastName}>
              <div className="rounded-2xl overflow-hidden">
                {/* Photo */}
                <div
                  className="relative h-[380px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${member.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
                    <span className="font-display italic text-[20px] font-light text-bg/90">
                      {member.firstName}
                    </span>
                    <span className="font-display italic text-[20px] font-light text-accent">
                      {member.lastName}
                    </span>
                    <div className="w-8 h-px bg-accent/60 my-1.5" />
                    <p className="font-sans text-[12px] text-bg/60 leading-[1.4]">{member.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 text-center">
          <a href="#sobre" className="text-[12px] font-mono tracking-[0.14em] uppercase text-mute hover:text-accent transition-colors">
            Conhecer a equipe →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — 5 cards visíveis no desktop, carrossel desliza, setas funcionam

- [ ] **Step 3: Commit**

```bash
git add components/TeamCarousel.tsx
git commit -m "feat: TeamCarousel — carrossel equipe estilo mentores G4"
```

---

## Task 7: TestimonialsCarousel — Carrossel centrado

**Files:**
- Create: `components/TestimonialsCarousel.tsx`

- [ ] **Step 1: Criar `components/TestimonialsCarousel.tsx`**

```tsx
"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    name: "Carlos S.",
    role: "Barbearia CS · São Paulo",
    quote: "Antes não tinha site e atendia WhatsApp na mão. Hoje o agente agenda sozinho e o site aparece quando alguém pesquisa barbearia aqui no bairro. Semana já começa com agenda cheia.",
    image: "https://plus.unsplash.com/premium_photo-1661391316543-9c40ae315a4a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ana Lima",
    role: "Moda Lima · Interior SP",
    quote: "Minha loja ficava invisível no Google. Depois que a Bulk configurou o Google Meu Negócio, o cliente que precisa me acha sozinho. Não dependo mais só do boca a boca.",
    image: "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Roberto M.",
    role: "Sabores do Bairro · Osasco",
    quote: "Tinha perfil no Instagram mas não aparecia no Google. Depois da Bulk, meu restaurante aparece quando alguém pesquisa aqui no bairro. O movimento cresceu muito nos fins de semana.",
    image: "https://images.unsplash.com/photo-1758519291037-db9ec86cda69?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fernanda O.",
    role: "Studio Fernanda · São Paulo",
    quote: "Meu salão dobrou o número de clientes novos em 3 meses. A IA no WhatsApp atende enquanto eu trabalho e o site aparece no mapa quando buscam salão perto daqui.",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80",
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const n = testimonials.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + n) % n), [n]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % n), [n]);

  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    setDragging(true);
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!dragging) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setDragging(false);
  };
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  return (
    <section className="bg-ink/[0.025] py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
            O que dizem
          </p>
          <h2 className="font-display font-semibold text-[clamp(24px,3vw,40px)] leading-[1.05] tracking-[-0.025em]">
            Depoimentos de quem{" "}
            <span className="font-display italic text-accent">viveu a experiência Bulk.</span>
          </h2>
          <p className="text-[13px] text-mute mt-3">
            Negócios que decidiram parar de esperar e começaram a aparecer.
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center justify-center gap-4 overflow-hidden">
            {[-1, 0, 1].map((offset) => {
              const idx = (current + offset + n) % n;
              const t = testimonials[idx];
              const isActive = offset === 0;
              return (
                <motion.div
                  key={`${idx}-${offset}`}
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.5,
                    filter: isActive ? "blur(0px)" : "blur(1.5px)",
                  }}
                  transition={{ duration: 0.35 }}
                  className={`flex-shrink-0 w-[clamp(220px,30vw,420px)] ${
                    offset !== 0 ? "hidden sm:block" : ""
                  }`}
                >
                  <div className="rounded-2xl overflow-hidden bg-bg border border-rule">
                    {/* Photo */}
                    <div className="relative aspect-video">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="420px"
                      />
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-ink/40 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[20px] border-l-bg border-y-[12px] border-y-transparent ml-1.5" />
                          </div>
                          <p className="absolute bottom-4 text-bg text-[12px] font-medium text-shadow-sm">
                            Assista o depoimento
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-4 text-center">
                      <p className="font-semibold text-[15px] text-ink">{t.name}</p>
                      <p className="text-[12px] text-mute mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors z-10 hidden md:flex"
            aria-label="Anterior"
          >
            <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors z-10 hidden md:flex"
            aria-label="Próximo"
          >
            <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-accent" : "w-2 bg-ink/20"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="#casos"
            className="text-[12px] font-mono tracking-[0.14em] uppercase text-mute hover:text-accent transition-colors"
          >
            Ver todos os depoimentos →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — carrossel funciona, card central em destaque, drag funciona

- [ ] **Step 3: Commit**

```bash
git add components/TestimonialsCarousel.tsx
git commit -m "feat: TestimonialsCarousel — carrossel centrado estilo G4 com drag"
```

---

## Task 8: MissionSection — Seção impacto com counter

**Files:**
- Create: `components/MissionSection.tsx`

- [ ] **Step 1: Criar `components/MissionSection.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

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
    <div ref={ref} className="font-display font-semibold text-[clamp(56px,10vw,120px)] leading-none tracking-[-0.04em] text-bg">
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
        {/* Bulk brand icon */}
        <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center mb-8">
          <span className="font-display font-bold text-accent text-[18px]">B</span>
        </div>

        <p className="text-[11px] font-mono tracking-[0.22em] uppercase text-bg/40 mb-6">
          Nossa missão
        </p>

        <h2 className="font-display font-semibold text-[clamp(24px,3.5vw,44px)] leading-[1.1] tracking-[-0.025em] text-bg max-w-2xl">
          Colocar todo negócio local<br />
          <span className="font-display italic text-accent">visível no digital.</span>
        </h2>

        <p className="text-[14px] text-bg/45 mt-5 max-w-md">
          Em São Paulo, chegamos lá.
        </p>

        <div className="mt-12 flex flex-col items-center gap-2">
          <Counter target={200} suffix="+" />
          <p className="text-[14px] font-mono tracking-[0.1em] uppercase text-bg/50">
            negócios já aparecem online
          </p>
        </div>

        <a
          href="#casos"
          className="mt-10 inline-flex items-center gap-2 bg-accent text-bg px-6 py-3 rounded-md text-[13px] font-medium hover:bg-sun transition-colors"
        >
          Ver os casos →
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — fundo escuro com foto, counter anima ao entrar na viewport

- [ ] **Step 3: Commit**

```bash
git add components/MissionSection.tsx
git commit -m "feat: MissionSection — seção impacto G4-style com counter animado"
```

---

## Task 9: StatsSection — 3 contadores

**Files:**
- Create: `components/StatsSection.tsx`

- [ ] **Step 1: Criar `components/StatsSection.tsx`**

```tsx
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
      <div className="font-display font-semibold text-[clamp(48px,7vw,80px)] leading-none tracking-[-0.04em] text-bg">
        {display}{suffix}
      </div>
      <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-bg/50">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="bg-accent">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-bg/20">
          <StatCounter value={200} suffix="+" label="Negócios atendidos em SP" />
          <StatCounter value={7}   suffix=" dias" label="Prazo de entrega do site" />
          <StatCounter value={24}  suffix="h" label="Atendimento via IA" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — banda vermelha, 3 contadores animados

- [ ] **Step 3: Commit**

```bash
git add components/StatsSection.tsx
git commit -m "feat: StatsSection — 3 contadores animados estilo G4 em banda accent"
```

---

## Task 10: SectorsChart — Gráfico de barras

**Files:**
- Create: `components/SectorsChart.tsx`

- [ ] **Step 1: Criar `components/SectorsChart.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { useInView, motion } from "motion/react";

const sectors = [
  { name: "Outros",      pct: 9,  height: 20 },
  { name: "Automotivo",  pct: 6,  height: 25 },
  { name: "Fitness",     pct: 8,  height: 32 },
  { name: "Saúde",       pct: 10, height: 40 },
  { name: "Varejo",      pct: 12, height: 50 },
  { name: "Beleza",      pct: 15, height: 62 },
  { name: "Alimentação", pct: 18, height: 76 },
  { name: "Serviços",    pct: 22, height: 100 },
];

export function SectorsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
            Onde atuamos
          </p>
          <h2 className="font-display font-semibold text-[clamp(24px,3.2vw,40px)] leading-[1.05] tracking-[-0.025em]">
            Segmentos onde{" "}
            <span className="font-display italic text-accent">mais crescemos.</span>
          </h2>
          <p className="text-[13px] text-mute mt-3">
            Os tipos de negócio que mais prosperaram com a Bulk
          </p>
        </div>

        {/* Desktop bars (vertical) */}
        <div
          ref={ref}
          className="hidden md:grid gap-3 items-end h-[320px] py-2"
          style={{
            gridTemplateColumns: `repeat(${sectors.length}, 1fr)`,
            backgroundImage: "linear-gradient(#61000018 1px, transparent 1px)",
            backgroundSize: "100% 40px",
          }}
        >
          {sectors.map((s, i) => (
            <div key={s.name} className="flex flex-col items-center h-full">
              <div className="flex flex-col justify-end flex-1 w-full">
                <motion.div
                  className="w-full bg-accent rounded-t-lg flex justify-center items-end pb-2"
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${s.height}%` } : { height: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[12px] font-semibold text-bg">{s.pct}%</span>
                </motion.div>
              </div>
              <p className="text-[11px] text-mute text-center mt-3 leading-[1.2]">{s.name}</p>
            </div>
          ))}
        </div>

        {/* Mobile bars (horizontal) */}
        <div className="md:hidden flex flex-col gap-4">
          {[...sectors].reverse().map((s, i) => (
            <div key={s.name} className="flex items-center gap-3">
              <p className="text-[12px] text-mute w-[100px] shrink-0 text-right">{s.name}</p>
              <div className="flex-1 h-8 bg-ink/[0.05] rounded-md overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-md flex items-center justify-end pr-3"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.pct * 4.5}%` } : { width: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[11px] font-semibold text-bg">{s.pct}%</span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — barras animam ao entrar na viewport, desktop vertical, mobile horizontal

- [ ] **Step 3: Commit**

```bash
git add components/SectorsChart.tsx
git commit -m "feat: SectorsChart — gráfico de barras animado G4-style por segmento"
```

---

## Task 11: FeaturedServicesCarousel — 4 colunas com rating

**Files:**
- Create: `components/FeaturedServicesCarousel.tsx`

- [ ] **Step 1: Criar `components/FeaturedServicesCarousel.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const featured = [
  {
    name: "Site Profissional",
    type: "Digital",
    badge: "MAIS VENDIDO",
    rating: 9.2,
    desc: "Aplique um site que vende de verdade. Design sob medida, mobile-first, velocidade máxima.",
    image: "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "IA no WhatsApp",
    type: "Digital",
    badge: "CLIENTES RECOMENDAM",
    rating: 9.5,
    desc: "Multiplique seu atendimento com um agente que responde 24h, qualifica e agenda automaticamente.",
    image: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Google Meu Negócio",
    type: "Digital",
    badge: null,
    rating: 9.0,
    desc: "Apareça no mapa quando buscam seu serviço perto. Configuração + otimização completa.",
    image: "https://plus.unsplash.com/premium_photo-1682088367648-735b1a6ac612?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Manutenção Mensal",
    type: "Contínuo",
    badge: null,
    rating: 8.8,
    desc: "Atualizações, relatório mensal e suporte dedicado. Nunca mais se preocupe com o seu site.",
    image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=600&q=80",
  },
];

export function FeaturedServicesCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-ink/[0.025] py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
              Serviços em destaque
            </p>
            <h2 className="font-display font-semibold text-[clamp(24px,3.2vw,40px)] leading-[1.05] tracking-[-0.025em]">
              O que mais{" "}
              <span className="font-display italic text-accent">transforma negócios.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => swiperRef.current?.slidePrev()} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors" aria-label="Anterior">
              <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => swiperRef.current?.slideNext()} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors" aria-label="Próximo">
              <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1.2}
          spaceBetween={10}
          onSwiper={(s) => { swiperRef.current = s; }}
          breakpoints={{
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {featured.map((f) => (
            <SwiperSlide key={f.name}>
              <div className="group rounded-xl border border-rule hover:border-accent hover:shadow-lg transition-all duration-300 overflow-hidden bg-bg cursor-pointer">
                {/* Photo */}
                <div
                  className="relative h-[240px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${f.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <h3 className="font-display text-[15px] font-light text-bg/90 italic">
                      {f.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-accent fill-accent" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="text-[12px] text-bg/80">{f.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-bg/60 bg-ink/40 px-2 py-1 rounded">
                      {f.type}
                    </span>
                    {f.badge && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded font-semibold">
                        {f.badge}
                      </span>
                    )}
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <p className="text-[13px] text-mute leading-[1.6] line-clamp-2">{f.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-10">
          <a href="#como-funciona" className="text-[12px] font-mono tracking-[0.14em] uppercase text-mute hover:text-accent transition-colors">
            Ver todos os serviços →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — 4 cards no desktop, hover com borda vermelha, badges visíveis

- [ ] **Step 3: Commit**

```bash
git add components/FeaturedServicesCarousel.tsx
git commit -m "feat: FeaturedServicesCarousel — 4 serviços com rating estilo G4"
```

---

## Task 12: BlogSection — Placeholder com grid

**Files:**
- Create: `components/BlogSection.tsx`

- [ ] **Step 1: Criar `components/BlogSection.tsx`**

```tsx
import { motion } from "motion/react";

const articles = [
  {
    category: "Dicas",
    title: "Como aparecer no Google Maps quando buscam o seu serviço",
    date: "28 maio 2026",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
    href: "#blog",
  },
  {
    category: "IA",
    title: "IA no WhatsApp: como configurar um agente que atende 24h",
    date: "25 maio 2026",
    image: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=600&q=80",
    href: "#blog",
  },
  {
    category: "Cases",
    title: "Como uma barbearia triplicou os agendamentos em 90 dias",
    date: "20 maio 2026",
    image: "https://plus.unsplash.com/premium_photo-1661391316543-9c40ae315a4a?auto=format&fit=crop&w=600&q=80",
    href: "#blog",
  },
  {
    category: "Site",
    title: "Por que um site profissional converte mais que Instagram",
    date: "15 maio 2026",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=600&q=80",
    href: "#blog",
  },
];

const categories = ["Em alta", "Dicas", "IA", "Cases", "Site", "Google", "WhatsApp"];

export function BlogSection() {
  return (
    <section id="blog" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
              Conteúdo
            </p>
            <h2 className="font-display font-semibold text-[clamp(24px,3.2vw,40px)] leading-[1.05] tracking-[-0.025em]">
              Conteúdos para você{" "}
              <span className="font-display italic text-accent">não parar.</span>
            </h2>
          </div>
          <p className="text-[13px] text-mute">
            Práticos para quem quer crescer e aparecer online.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                i === 0
                  ? "bg-ink text-bg border-ink"
                  : "border-rule text-mute hover:border-ink/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href={article.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group flex flex-col rounded-xl overflow-hidden border border-rule hover:border-ink/20 transition-colors"
            >
              <div
                className="h-[180px] bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              <div className="p-4 flex flex-col gap-2 flex-1 bg-bg">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30 rounded-full px-2 py-0.5 self-start">
                  {article.category}
                </span>
                <p className="font-display text-[15px] leading-[1.35] text-ink line-clamp-2 group-hover:text-accent transition-colors">
                  {article.title}
                </p>
                <p className="text-[11px] text-mute mt-auto">{article.date}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a href="#blog" className="inline-flex items-center gap-2 border border-rule rounded-md px-6 py-3 text-[13px] font-medium text-ink hover:border-accent hover:text-accent transition-colors">
            Ver todos os artigos →
          </a>
        </div>

        {/* Social links */}
        <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
          <p className="text-[12px] text-mute font-mono uppercase tracking-wide">Também em:</p>
          {[
            { name: "Instagram", href: "#" },
            { name: "YouTube", href: "#" },
            { name: "WhatsApp", href: "#" },
          ].map((s) => (
            <a key={s.name} href={s.href} className="text-[13px] text-mute hover:text-accent transition-colors font-medium">
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — grid 4 colunas, filtros visuais, cards com hover

- [ ] **Step 3: Commit**

```bash
git add components/BlogSection.tsx
git commit -m "feat: BlogSection — grid blog placeholder G4-style com filtros"
```

---

## Task 13: FaqSection — Accordion

**Files:**
- Create: `components/FaqSection.tsx`

- [ ] **Step 1: Criar `components/FaqSection.tsx`**

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
  {
    q: "O que é a Bulk?",
    a: "A Bulk é uma agência digital focada em negócios locais em São Paulo. Ajudamos barbearias, restaurantes, salões, lojas e prestadores de serviço a aparecerem online, serem encontrados no Google e atenderem clientes automaticamente pelo WhatsApp.",
  },
  {
    q: "Quanto tempo leva para o site ficar no ar?",
    a: "Nosso prazo padrão é 7 dias corridos após aprovação do briefing e pagamento. Entregamos design sob medida, mobile-first, com domínio e hospedagem inclusos e já otimizado para o Google.",
  },
  {
    q: "A IA no WhatsApp substitui meu atendente humano?",
    a: "Não substitui — ela complementa. A IA cuida do primeiro contato: responde perguntas frequentes, qualifica o interesse do cliente e agenda. Para atendimentos mais complexos, ela transfere para você ou seu time. Domingo às 23h, quando ninguém está disponível, ela atende.",
  },
  {
    q: "O Google Meu Negócio funciona para qualquer tipo de negócio?",
    a: "Funciona para qualquer negócio com endereço físico ou que atenda clientes em uma área geográfica definida. Barbearias, restaurantes, salões, clínicas, lojas, academias, oficinas — todos se beneficiam diretamente.",
  },
  {
    q: "Quais tipos de negócio a Bulk atende?",
    a: "Atendemos principalmente negócios locais em São Paulo: barbearias, salões de beleza, restaurantes e cafeterias, lojas físicas, clínicas e consultórios, academias, oficinas mecânicas e prestadores de serviços em geral.",
  },
  {
    q: "A manutenção mensal está inclusa nos planos?",
    a: "Sim. Todos os nossos planos incluem manutenção mensal: atualizações de segurança, relatório de desempenho, pequenas alterações de conteúdo e suporte prioritário. Seu site nunca fica desatualizado ou quebrado.",
  },
  {
    q: "Como funciona o suporte?",
    a: "Atendemos por WhatsApp e e-mail. Para clientes com plano ativo, o suporte é prioritário com resposta em até 2 horas úteis. Emergências (site fora do ar) têm resposta em até 1 hora.",
  },
  {
    q: "Qual é o investimento?",
    a: "Nossos planos começam a partir de R$297/mês para o plano básico de site + manutenção. O plano completo (site + IA + Google + manutenção) tem condições especiais. Fale com a gente para um diagnóstico gratuito e proposta personalizada.",
  },
  {
    q: "Vocês atendem negócios fora de São Paulo?",
    a: "Principalmente atendemos negócios em São Paulo e Grande SP. Para cidades do interior de SP e outros estados, avaliamos caso a caso. O contato inicial é gratuito — agende um diagnóstico.",
  },
  {
    q: "Como entrar em contato com a Bulk?",
    a: "Você pode falar conosco pelo botão de WhatsApp no canto da tela, pelo formulário de contato aqui no site, ou pelo e-mail contato@bulk.digital. Respondemos em até 4 horas em dias úteis.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
              Dúvidas frequentes
            </p>
            <h2 className="font-display font-semibold text-[clamp(24px,3.2vw,40px)] leading-[1.05] tracking-[-0.025em]">
              Dúvidas mais{" "}
              <span className="font-display italic text-accent">frequentes.</span>
            </h2>
          </div>
          <p className="text-[13px] text-mute max-w-xs">
            Respostas para as principais perguntas sobre nossos serviços.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-rule">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                aria-expanded={open === i}
              >
                <span className="font-medium text-[15px] text-ink group-hover:text-accent transition-colors">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-mute shrink-0"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[14px] text-mute leading-[1.7]">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar** — accordion abre/fecha suavemente, um de cada vez

- [ ] **Step 3: Commit**

```bash
git add components/FaqSection.tsx
git commit -m "feat: FaqSection — accordion G4-style com 10 perguntas Bulk"
```

---

## Task 14: Footer — Dark multi-coluna

**Files:**
- Rewrite: `components/Footer.tsx`

- [ ] **Step 1: Reescrever `components/Footer.tsx`**

```tsx
import Image from "next/image";

const footerLinks = {
  "Serviços": [
    { label: "Site Profissional", href: "#como-funciona" },
    { label: "IA no WhatsApp", href: "#como-funciona" },
    { label: "Google Meu Negócio", href: "#como-funciona" },
    { label: "Manutenção Mensal", href: "#planos" },
    { label: "Ver todos", href: "#como-funciona" },
  ],
  "Casos": [
    { label: "Barbearias", href: "#casos" },
    { label: "Restaurantes", href: "#casos" },
    { label: "Salões de Beleza", href: "#casos" },
    { label: "Lojas", href: "#casos" },
    { label: "Todos os casos", href: "#casos" },
  ],
  "Planos": [
    { label: "Site Básico", href: "#planos" },
    { label: "Plano Completo", href: "#planos" },
    { label: "Bulk Pass", href: "#planos" },
    { label: "Agendar diagnóstico", href: "#contato" },
  ],
  "Conteúdo": [
    { label: "Blog", href: "#blog" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
  "Sobre": [
    { label: "A Bulk", href: "#sobre" },
    { label: "Nossa equipe", href: "#sobre" },
    { label: "Contato", href: "#contato" },
    { label: "Carreiras", href: "#" },
  ],
  "Legal": [
    { label: "Termos de Uso", href: "#" },
    { label: "Política de Privacidade", href: "#" },
    { label: "Central de Ajuda", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16">
        {/* Logo + links grid */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-8 mb-12">
          {/* Logo col */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Image
              src="/logo.png"
              alt="Bulk"
              width={80}
              height={32}
              className="h-8 w-auto brightness-100"
            />
            <p className="text-[12px] text-bg/35 leading-[1.6]">
              Presença digital para negócio local crescer.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <h4 className="text-[11px] font-mono tracking-[0.14em] uppercase text-bg/40 mb-1">
                {title}
              </h4>
              {links.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="text-[13px] text-bg/55 hover:text-bg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-bg/[0.08] mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] text-bg/30">
              Bulk Digital LTDA. Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-bg/20">
              São Paulo – SP · contato@bulk.digital
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { name: "Instagram", href: "#", icon: "IG" },
              { name: "WhatsApp", href: "#", icon: "WA" },
              { name: "YouTube", href: "#", icon: "YT" },
              { name: "LinkedIn", href: "#", icon: "LI" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center text-[10px] font-mono text-accent/70 hover:border-accent hover:text-accent transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verificar** — fundo escuro, 7 colunas no desktop, social icons

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: Footer — dark multi-coluna G4-style com social icons Bulk"
```

---

## Task 15: WhatsAppFloat

**Files:**
- Create: `components/ui/WhatsAppFloat.tsx`

- [ ] **Step 1: Criar `components/ui/WhatsAppFloat.tsx`**

```tsx
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5511999999999?text=Olá, vim pelo site da Bulk e gostaria de um diagnóstico gratuito."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-[90px] md:bottom-6 z-[9998] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#128C7E] transition-all duration-200"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
```

- [ ] **Step 2: Verificar** — botão verde fixo no canto inferior direito, acima da mobile bottom nav

- [ ] **Step 3: Commit**

```bash
git add components/ui/WhatsAppFloat.tsx
git commit -m "feat: WhatsAppFloat — botão flutuante WhatsApp G4-style"
```

---

## Task 16: page.tsx — Montagem final das 13 seções

**Files:**
- Rewrite: `app/page.tsx`

- [ ] **Step 1: Reescrever `app/page.tsx`**

```tsx
import { AnnouncementBar }          from "@/components/AnnouncementBar";
import { Nav }                       from "@/components/Nav";
import { HeroCarousel }              from "@/components/HeroCarousel";
import { ServicesGrid }              from "@/components/ServicesGrid";
import { TeamCarousel }              from "@/components/TeamCarousel";
import { TestimonialsCarousel }      from "@/components/TestimonialsCarousel";
import { MissionSection }            from "@/components/MissionSection";
import { StatsSection }              from "@/components/StatsSection";
import { SectorsChart }              from "@/components/SectorsChart";
import { FeaturedServicesCarousel }  from "@/components/FeaturedServicesCarousel";
import { BlogSection }               from "@/components/BlogSection";
import { FaqSection }                from "@/components/FaqSection";
import { Footer }                    from "@/components/Footer";
import { WhatsAppFloat }             from "@/components/ui/WhatsAppFloat";
import { MobileBottomNav }           from "@/components/ui/MobileBottomNav";

export default function Home() {
  return (
    <main>
      <AnnouncementBar />
      <Nav />
      <HeroCarousel />
      <ServicesGrid />
      <TeamCarousel />
      <TestimonialsCarousel />
      <MissionSection />
      <StatsSection />
      <SectorsChart />
      <FeaturedServicesCarousel />
      <BlogSection />
      <FaqSection />
      <Footer />
      <WhatsAppFloat />
      <MobileBottomNav />
    </main>
  );
}
```

- [ ] **Step 2: Atualizar `app/layout.tsx` — remover SmoothScroll e StickyBar**

Substituir o body pela versão limpa:

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bulk — Presença digital para negócio local crescer",
  description: "Site profissional, IA no WhatsApp e Google Meu Negócio. Sua empresa encontrada, escolhida e faturando todo dia.",
  openGraph: {
    title: "Bulk — Presença digital para negócio local crescer",
    description: "Site profissional, IA no WhatsApp e Google Meu Negócio. Sua empresa encontrada todo dia.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Rodar `pnpm dev` e verificar página completa**

Verificar em `http://localhost:3000`:
- Announcement bar aparece no topo
- Nav fixa com logo, mega menu no hover
- Hero carousel com 7 slides, autoplay 5s, setas vermelhas
- ServicesGrid 4 colunas
- TeamCarousel com fotos
- TestimonialsCarousel centrado
- MissionSection com counter animado ao scroll
- StatsSection em vermelho com 3 números
- SectorsChart com barras animadas
- FeaturedServicesCarousel 4 cards
- BlogSection grid 4 artigos
- FaqSection accordion funciona
- Footer dark
- WhatsApp float verde no canto
- Mobile: bottom nav funciona, hero responsivo

- [ ] **Step 4: Corrigir qualquer problema visual**

- [ ] **Step 5: Commit final**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: page.tsx — montagem completa 13 seções G4-style Bulk homepage"
```

---

## Task 17: Cleanup — Remover arquivos antigos

**Files:**
- Delete: `components/Hero.tsx`, `components/LogoMarquee.tsx`, `components/SocialProofBand.tsx`
- Delete: `components/Features.tsx`, `components/Cases.tsx`, `components/Pricing.tsx`
- Delete: `components/FinalCTA.tsx`, `components/Method.tsx`, `components/Stack.tsx`
- Delete: `components/Results.tsx`, `components/StickyBar.tsx`
- Delete: `components/ui/SmoothScroll.tsx`, `components/ui/CustomCursor.tsx`
- Delete: `components/ui/SplitText.tsx`, `components/ui/ScrollProgress.tsx`
- Delete: `components/ui/MagneticButton.tsx`

- [ ] **Step 1: Deletar componentes antigos não utilizados**

```bash
cd "C:\Users\nicko\OneDrive\Área de Trabalho\WORKFLOWS\BULK SITE\atlas-prospect"

# Remover componentes da versão anterior
Remove-Item components/Hero.tsx -ErrorAction SilentlyContinue
Remove-Item components/LogoMarquee.tsx -ErrorAction SilentlyContinue
Remove-Item components/SocialProofBand.tsx -ErrorAction SilentlyContinue
Remove-Item components/Features.tsx -ErrorAction SilentlyContinue
Remove-Item components/Cases.tsx -ErrorAction SilentlyContinue
Remove-Item components/Pricing.tsx -ErrorAction SilentlyContinue
Remove-Item components/FinalCTA.tsx -ErrorAction SilentlyContinue
Remove-Item components/Method.tsx -ErrorAction SilentlyContinue
Remove-Item components/Stack.tsx -ErrorAction SilentlyContinue
Remove-Item components/Results.tsx -ErrorAction SilentlyContinue
Remove-Item components/StickyBar.tsx -ErrorAction SilentlyContinue
Remove-Item components/ui/SmoothScroll.tsx -ErrorAction SilentlyContinue
Remove-Item components/ui/CustomCursor.tsx -ErrorAction SilentlyContinue
Remove-Item components/ui/SplitText.tsx -ErrorAction SilentlyContinue
Remove-Item components/ui/ScrollProgress.tsx -ErrorAction SilentlyContinue
Remove-Item components/ui/MagneticButton.tsx -ErrorAction SilentlyContinue
Remove-Item components/ui/WhatsAppButton.tsx -ErrorAction SilentlyContinue
```

- [ ] **Step 2: Rodar `pnpm build` para garantir zero erros TypeScript**

```bash
pnpm build
```

Esperado: build sem erros. Se houver erros de import, corrigir em `app/page.tsx` ou `app/layout.tsx`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove componentes antigos pós refatoração G4-style"
```

---

## Task 18: Build final + push da branch

- [ ] **Step 1: Rodar `pnpm build` uma última vez**

```bash
pnpm build
```

Esperado: saída `✓ Compiled successfully`, zero erros.

- [ ] **Step 2: Push da branch**

```bash
git push -u origin feat/g4-style-homepage
```

- [ ] **Step 3: Verificar visualmente em produção ou localhost uma última vez**

Percorrer a página de cima a baixo e verificar:
- Announcement bar dismiss funciona
- Nav mega menu abre em hover (desktop) e hamburguer (mobile)
- Hero carrossel roda, autoplay, setas
- Todas as 13 seções visíveis e espaçadas
- Mobile: bottom nav, sem overflow horizontal, hero responsivo
- WhatsApp float visível e não sobreposto
- Footer links corretos

- [ ] **Step 4: Commit final (se houver ajustes)**

```bash
git add -A
git commit -m "feat: G4-style Bulk homepage completa — 13 seções, branch feat/g4-style-homepage"
```

---

## Self-Review — Checklist de cobertura

| Seção G4                   | Task de implementação            | Status |
|----------------------------|----------------------------------|--------|
| Announcement bar           | Task 2 — AnnouncementBar         | ✓      |
| Nav mega menu              | Task 3 — Nav                     | ✓      |
| Hero carousel (7 slides)   | Task 4 — HeroCarousel            | ✓      |
| Products grid (4 cols)     | Task 5 — ServicesGrid            | ✓      |
| Mentors/team carousel      | Task 6 — TeamCarousel            | ✓      |
| Testimonials carousel      | Task 7 — TestimonialsCarousel    | ✓      |
| Mission/impact section     | Task 8 — MissionSection          | ✓      |
| Stats (3 counters)         | Task 9 — StatsSection            | ✓      |
| Sectors bar chart          | Task 10 — SectorsChart           | ✓      |
| Featured programs carousel | Task 11 — FeaturedServicesCarousel| ✓      |
| Blog/content grid          | Task 12 — BlogSection            | ✓      |
| FAQ accordion              | Task 13 — FaqSection             | ✓      |
| Footer                     | Task 14 — Footer                 | ✓      |
| WhatsApp float             | Task 15 — WhatsAppFloat          | ✓      |
| Mobile bottom nav          | Task 3 — MobileBottomNav         | ✓      |
| page.tsx assembly          | Task 16                          | ✓      |
| Cleanup antigos            | Task 17                          | ✓      |
| Build + push               | Task 18                          | ✓      |

**Zero gaps identificados.**
