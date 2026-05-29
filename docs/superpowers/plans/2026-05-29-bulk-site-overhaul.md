# Bulk Website Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar o site da Bulk para conversão, SEO e credibilidade: tipografia mais legível, remoção de "Planos"/"Área do cliente", casos honestos, 6 serviços com páginas dedicadas + sitelinks, SEO completo (metadata/JSON-LD/sitemap), blog em MDX, modal de diagnóstico → Discord, animações no scroll, fix do WhatsApp float e responsividade mobile.

**Architecture:** Next.js 15 App Router + TypeScript + Tailwind + `motion/react`. Dados de contato/serviços centralizados em `lib/site-config.ts`. Modal de contato global via React Context. Envio server-side por `app/api/contato/route.ts` (webhook em env). Páginas de serviço e blog estáticas e indexáveis. JSON-LD por componente `<JsonLd>`.

**Tech Stack:** Next 15.5, React 19, Tailwind 3.4, motion 12, swiper 12. Novas deps: `gray-matter`, `next-mdx-remote` (rsc).

**Verificação:** o projeto NÃO tem runner de testes. Verificação padrão = `pnpm build`, `pnpm exec tsc --noEmit`, greps direcionados e checagem visual em `pnpm dev`. TDD real só na lógica pura do payload do webhook (Task 4).

**Convenção de commits:** ao fim de cada Task, `git add` + commit com a mensagem indicada, terminando com:
```
Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

---

## File Structure

**Criar:**
- `lib/site-config.ts` — constantes de site, contato e os 6 serviços (fonte única).
- `lib/contact-message.ts` — `buildDiscordPayload(input)` puro (testável).
- `lib/contact-message.test.ts` — teste do builder (Node test runner via tsx).
- `app/api/contato/route.ts` — POST server-side → Discord.
- `components/contact/ContactModalProvider.tsx` — contexto + render do modal.
- `components/contact/ContactModal.tsx` — UI do modal (form enxuto).
- `components/contact/useContactModal.ts` — hook `openContact(serviceSlug?)`.
- `components/ui/Reveal.tsx` — wrapper de animação on-scroll.
- `components/seo/JsonLd.tsx` — injeta `<script type="application/ld+json">`.
- `lib/seo/schema.ts` — geradores de JSON-LD (Organization, WebSite, Service, etc.).
- `app/robots.ts`, `app/sitemap.ts`.
- `app/servicos/[slug]/page.tsx` — página de serviço dedicada.
- `app/orcamento/page.tsx` — página de solicitação (fallback do modal).
- `components/sections/MarketingSection.tsx` — seção de conteúdo (E-E-A-T).
- `components/sections/CasesSection.tsx` — casos honestos/genéricos + trigueirotech.
- `lib/blog.ts` — leitura/parse de posts MDX.
- `content/blog/*.mdx` — 2 posts iniciais.
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`.
- `.env.local` (NÃO comitar), `.env.example` (comitar).

**Modificar:**
- `tailwind.config.ts` — `mute` mais escuro.
- `app/layout.tsx` — fontes (pesos), metadata base, Provider, JSON-LD global.
- `app/globals.css` — pesos/contraste tipográfico.
- `components/Nav.tsx` — remover Planos/Área do cliente; 6 serviços; CTAs → modal.
- `components/ui/MobileBottomNav.tsx` — remover Planos; casos genéricos; CTA → modal.
- `components/HeroCarousel.tsx` — remover href #planos; CTAs → modal.
- `components/ServicesGrid.tsx` — 6 serviços; links para /servicos/[slug].
- `components/FeaturedServicesCarousel.tsx` — 6 serviços; sem "Planos".
- `components/Footer.tsx` — colunas sem Planos; links de serviço; sem "Área do cliente".
- `components/AnnouncementBar.tsx` — revisar para não brigar com WhatsApp float.
- `components/ui/WhatsAppFloat.tsx` — reposicionar.
- `components/BlogSection.tsx` — apontar para /blog real.
- `app/page.tsx` — trocar Testimonials por CasesSection; inserir MarketingSection.
- `components/MissionSection.tsx`, `StatsSection.tsx` etc. — copy + Reveal.

---

## Task 1: Configuração central (`lib/site-config.ts`)

**Files:**
- Create: `lib/site-config.ts`

- [ ] **Step 1: Criar config com contato e serviços**

```ts
// lib/site-config.ts
export const SITE = {
  name: "Bulk",
  legalName: "Bulk Studio",
  url: "https://bulkstudio.com.br",
  email: "contato@bulkstudio.com.br",
  // PLACEHOLDERS — trocar pelos dados reais antes de publicar:
  whatsapp: "5511999999999",
  whatsappDisplay: "(11) 99999-9999",
  city: "São Paulo",
  region: "SP",
  country: "BR",
  tagline: "Presença digital que vende todo dia",
  description:
    "Agência digital para negócios locais em São Paulo: criação de sites, gestão de tráfego, social media, Google Meu Negócio, IA no WhatsApp e manutenção.",
} as const;

export function whatsappLink(message = "Olá! Quero um diagnóstico gratuito.") {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Service = {
  slug: string;
  name: string;
  short: string;       // subtítulo curto
  description: string; // 1 frase para cards
  long: string;        // parágrafo para a página dedicada
  keyword: string;     // termo SEO principal
};

export const SERVICES: Service[] = [
  {
    slug: "criacao-de-sites",
    name: "Criação de Sites",
    short: "No ar em 7 dias, mobile-first",
    description: "Site profissional com domínio e hospedagem inclusos, pronto para vender.",
    long: "Criamos sites profissionais, rápidos e mobile-first que transformam visitantes em clientes. Entrega em 7 dias com domínio, hospedagem e otimização para o Google inclusos.",
    keyword: "criação de sites em São Paulo",
  },
  {
    slug: "gestao-de-trafego",
    name: "Gestão de Tráfego",
    short: "Anúncios que trazem o cliente certo",
    description: "Campanhas no Google e Meta que colocam seu negócio na frente de quem compra.",
    long: "Planejamos, criamos e otimizamos campanhas no Google Ads e Meta Ads para atrair clientes prontos para comprar, com acompanhamento de resultados e otimização contínua do investimento.",
    keyword: "gestão de tráfego pago",
  },
  {
    slug: "social-media",
    name: "Social Media",
    short: "Presença que constrói autoridade",
    description: "Conteúdo e gestão de redes que mantêm seu negócio lembrado e confiável.",
    long: "Gerimos suas redes sociais com conteúdo estratégico, design consistente e calendário de publicações que constroem autoridade, engajamento e confiança para o seu negócio local.",
    keyword: "gestão de social media",
  },
  {
    slug: "google-meu-negocio",
    name: "Google Meu Negócio",
    short: "Página 1 no Google local",
    description: "Perfil configurado e otimizado para aparecer quando buscam perto de você.",
    long: "Configuramos e otimizamos seu perfil do Google Meu Negócio (Google Business Profile) para que sua empresa apareça no mapa e na primeira página quando alguém procura pelo seu serviço na região.",
    keyword: "Google Meu Negócio otimização",
  },
  {
    slug: "ia-no-whatsapp",
    name: "IA no WhatsApp",
    short: "Atende, qualifica e agenda 24h",
    description: "Um agente de IA que responde, qualifica e agenda clientes a qualquer hora.",
    long: "Implementamos um agente de inteligência artificial no seu WhatsApp que responde mensagens, qualifica leads e agenda atendimentos 24 horas por dia, 7 dias por semana — sem perder cliente fora do horário comercial.",
    keyword: "IA no WhatsApp para empresas",
  },
  {
    slug: "manutencao",
    name: "Manutenção Mensal",
    short: "Atualizações e suporte contínuo",
    description: "Atualizações, relatório mensal e suporte para nada ficar desatualizado.",
    long: "Cuidamos do seu site e da sua presença digital com atualizações, monitoramento, relatório mensal e suporte contínuo, para que tudo continue funcionando e convertendo.",
    keyword: "manutenção de sites",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: sem erros novos referentes a `lib/site-config.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/site-config.ts
git commit -m "feat: config central de site e serviços (6 serviços)"
```

---

## Task 2: Tipografia e contraste

**Files:**
- Modify: `tailwind.config.ts:13`
- Modify: `app/layout.tsx:8,15`
- Modify: `app/globals.css`

- [ ] **Step 1: Escurecer `mute` no Tailwind**

Em `tailwind.config.ts`, trocar a linha do `mute`:
```ts
mute: "#4A4A4A",    // neutral grey (escurecido p/ contraste AA)
```

- [ ] **Step 2: Aumentar pesos das fontes**

Em `app/layout.tsx`:
```ts
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
```

- [ ] **Step 3: Ajustar peso de display e corpo no CSS**

Em `app/globals.css`, na regra `.txt-display` mudar `font-weight: 600;` → `font-weight: 700;`. No `body`, garantir `font-weight: 400;` e adicionar utilidade para texto secundário legível: confirmar que classes `text-mute` agora usam `#4A4A4A` (vem do Tailwind). Se houver headings com `font-medium`/`font-semibold` em h1/h2 globais, elevar para `font-bold` onde título principal.

- [ ] **Step 4: Verificar build + inspeção visual**

Run: `pnpm build`
Expected: build OK. Em `pnpm dev`, confirmar que subtítulos não parecem "lavados".

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/layout.tsx app/globals.css
git commit -m "style: aumentar contraste e peso das fontes"
```

---

## Task 3: Variáveis de ambiente do webhook

**Files:**
- Create: `.env.local` (NÃO comitar)
- Create: `.env.example`
- Modify: `.gitignore` (garantir `.env*.local`)

- [ ] **Step 1: Criar `.env.local`**

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1510010304493391902/lWmn9hZOCO_8qYqEz5b4PxJUpbYeOKghdz7wwbbHCe7jAYsoWg-bw3Tt89nC1Sr-sRUn
```

- [ ] **Step 2: Criar `.env.example`**

```
# URL do webhook do Discord que recebe os pedidos de diagnóstico
DISCORD_WEBHOOK_URL=
```

- [ ] **Step 3: Confirmar gitignore**

Verificar que `.gitignore` contém `.env*.local` (Next já cria por padrão). Se não, adicionar.

- [ ] **Step 4: Commit (sem o `.env.local`)**

```bash
git add .env.example .gitignore
git commit -m "chore: env.example para webhook do Discord"
```

> ⚠️ Lembrar o usuário de **regenerar o webhook** no Discord (foi exposto no chat).

---

## Task 4: Builder do payload do Discord (lógica pura, TDD)

**Files:**
- Create: `lib/contact-message.ts`
- Test: `lib/contact-message.test.ts`

- [ ] **Step 1: Escrever o teste primeiro**

```ts
// lib/contact-message.test.ts
import assert from "node:assert/strict";
import { test } from "node:test";
import { validateContactInput, buildDiscordPayload } from "./contact-message";

test("rejeita nome vazio", () => {
  const r = validateContactInput({ name: " ", whatsapp: "11999998888", service: "criacao-de-sites" });
  assert.equal(r.ok, false);
});

test("rejeita whatsapp curto", () => {
  const r = validateContactInput({ name: "Ana", whatsapp: "123", service: "" });
  assert.equal(r.ok, false);
});

test("aceita input válido e monta embed", () => {
  const r = validateContactInput({ name: "Ana", whatsapp: "(11) 99999-8888", service: "criacao-de-sites", message: "oi" });
  assert.equal(r.ok, true);
  const payload = buildDiscordPayload(r.value!);
  assert.ok(payload.embeds[0].title.includes("diagnóstico"));
  assert.ok(JSON.stringify(payload).includes("Ana"));
  assert.ok(JSON.stringify(payload).includes("Criação de Sites"));
});
```

- [ ] **Step 2: Rodar o teste e ver falhar**

Run: `pnpm exec tsx --test lib/contact-message.test.ts`
(Se `tsx` não estiver instalado: `pnpm add -D tsx`.)
Expected: FALHA (módulo não existe).

- [ ] **Step 3: Implementar o builder**

```ts
// lib/contact-message.ts
import { SERVICES } from "./site-config";

export type ContactInput = {
  name: string;
  whatsapp: string;
  service: string;     // slug ou ""
  message?: string;
};

export function validateContactInput(input: ContactInput):
  { ok: true; value: ContactInput } | { ok: false; error: string } {
  const name = (input.name ?? "").trim();
  const whatsapp = (input.whatsapp ?? "").replace(/\D/g, "");
  if (name.length < 2) return { ok: false, error: "Informe seu nome." };
  if (whatsapp.length < 10) return { ok: false, error: "Informe um WhatsApp válido com DDD." };
  return { ok: true, value: { ...input, name, whatsapp } };
}

export function buildDiscordPayload(input: ContactInput) {
  const svc = SERVICES.find((s) => s.slug === input.service);
  const serviceName = svc?.name ?? "Não sei ainda";
  return {
    username: "Bulk — Site",
    embeds: [
      {
        title: "📩 Novo pedido de diagnóstico",
        color: 0x7a0000,
        fields: [
          { name: "Nome", value: input.name, inline: true },
          { name: "WhatsApp", value: input.whatsapp, inline: true },
          { name: "Serviço", value: serviceName, inline: false },
          { name: "Mensagem", value: input.message?.trim() || "—", inline: false },
        ],
      },
    ],
  };
}
```

- [ ] **Step 4: Rodar o teste e ver passar**

Run: `pnpm exec tsx --test lib/contact-message.test.ts`
Expected: 3 testes PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/contact-message.ts lib/contact-message.test.ts package.json
git commit -m "feat: builder/validação do payload do Discord com testes"
```

---

## Task 5: API route `/api/contato`

**Files:**
- Create: `app/api/contato/route.ts`

- [ ] **Step 1: Implementar a rota**

```ts
// app/api/contato/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateContactInput, buildDiscordPayload } from "@/lib/contact-message";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "Configuração ausente." }, { status: 500 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }
  const result = validateContactInput(body as any);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildDiscordPayload(result.value)),
  });
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Falha ao enviar." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Verificar build/type-check**

Run: `pnpm exec tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Teste manual (com dev rodando)**

Run (PowerShell): `Invoke-RestMethod -Uri http://localhost:3000/api/contato -Method Post -ContentType 'application/json' -Body '{"name":"Teste","whatsapp":"11999998888","service":"criacao-de-sites","message":"teste"}'`
Expected: `{ ok = True }` e mensagem no canal do Discord.

- [ ] **Step 4: Commit**

```bash
git add app/api/contato/route.ts
git commit -m "feat: API route /api/contato → Discord (server-side)"
```

---

## Task 6: Modal de contato global

**Files:**
- Create: `components/contact/ContactModalProvider.tsx`
- Create: `components/contact/ContactModal.tsx`
- Create: `components/contact/useContactModal.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Hook + contexto**

```tsx
// components/contact/useContactModal.ts
"use client";
import { createContext, useContext } from "react";

export type ContactModalCtx = {
  open: boolean;
  service: string;
  openContact: (serviceSlug?: string) => void;
  close: () => void;
};
export const ContactModalContext = createContext<ContactModalCtx | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal precisa do ContactModalProvider");
  return ctx;
}
```

- [ ] **Step 2: Provider**

```tsx
// components/contact/ContactModalProvider.tsx
"use client";
import { useState, useCallback } from "react";
import { ContactModalContext } from "./useContactModal";
import { ContactModal } from "./ContactModal";

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const openContact = useCallback((slug = "") => { setService(slug); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);
  return (
    <ContactModalContext.Provider value={{ open, service, openContact, close }}>
      {children}
      <ContactModal />
    </ContactModalContext.Provider>
  );
}
```

- [ ] **Step 3: Modal UI (enxuto, acessível, com Motion)**

```tsx
// components/contact/ContactModal.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SERVICES } from "@/lib/site-config";
import { useContactModal } from "./useContactModal";

type Status = "idle" | "sending" | "success" | "error";

export function ContactModal() {
  const { open, service, close } = useContactModal();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) { setStatus("idle"); setError(""); }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") close(); }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending"); setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      whatsapp: String(fd.get("whatsapp") || ""),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || ""),
    };
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Erro ao enviar.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erro ao enviar.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-label="Agendar diagnóstico"
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />
          <motion.div
            ref={dialogRef}
            className="relative w-full md:max-w-md bg-bg rounded-t-3xl md:rounded-2xl p-6 md:p-8 shadow-2xl"
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
          >
            <button onClick={close} aria-label="Fechar" className="absolute right-4 top-4 w-11 h-11 flex items-center justify-center text-mute hover:text-ink">✕</button>
            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="txt-display text-2xl text-ink mb-2">Recebido!</h3>
                <p className="text-mute">Em breve falamos com você no WhatsApp.</p>
                <button onClick={close} className="mt-6 min-h-[44px] px-6 rounded-full bg-accent text-bg font-semibold">Fechar</button>
              </div>
            ) : (
              <>
                <p className="txt-eyebrow text-accent mb-2">Diagnóstico gratuito</p>
                <h3 className="txt-display text-2xl md:text-3xl text-ink mb-1">Agendar diagnóstico</h3>
                <p className="text-mute text-sm mb-5">Deixe seus dados e retornamos no WhatsApp.</p>
                <form onSubmit={onSubmit} className="space-y-3">
                  <input name="name" required placeholder="Seu nome" className="w-full min-h-[48px] px-4 rounded-xl border border-rule bg-bg text-ink placeholder:text-mute focus:border-accent outline-none" />
                  <input name="whatsapp" required inputMode="tel" placeholder="WhatsApp com DDD" className="w-full min-h-[48px] px-4 rounded-xl border border-rule bg-bg text-ink placeholder:text-mute focus:border-accent outline-none" />
                  <select name="service" defaultValue={service} className="w-full min-h-[48px] px-4 rounded-xl border border-rule bg-bg text-ink focus:border-accent outline-none">
                    <option value="">Não sei ainda</option>
                    {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  </select>
                  <textarea name="message" rows={2} placeholder="Mensagem (opcional)" className="w-full px-4 py-3 rounded-xl border border-rule bg-bg text-ink placeholder:text-mute focus:border-accent outline-none" />
                  {status === "error" && <p className="text-accent text-sm">{error}</p>}
                  <button type="submit" disabled={status === "sending"} className="w-full min-h-[52px] rounded-full bg-accent text-bg font-semibold disabled:opacity-60">
                    {status === "sending" ? "Enviando…" : "Quero meu diagnóstico"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Envolver o app com o Provider**

Em `app/layout.tsx`, importar `ContactModalProvider` e envolver `{children}`:
```tsx
<body>
  <ContactModalProvider>{children}</ContactModalProvider>
</body>
```

- [ ] **Step 5: Build + teste manual**

Run: `pnpm build` → OK. Em dev, abrir modal por um botão temporário ou via Task 7.

- [ ] **Step 6: Commit**

```bash
git add components/contact app/layout.tsx
git commit -m "feat: modal global de diagnóstico (acessível, Motion)"
```

---

## Task 7: Remover "Planos" e "Área do cliente"; ligar CTAs ao modal

**Files:**
- Modify: `components/Nav.tsx`
- Modify: `components/ui/MobileBottomNav.tsx`
- Modify: `components/HeroCarousel.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Nav desktop/mobile**

Em `components/Nav.tsx`:
- Remover o item `{ label: "Planos", href: "#planos" }` (linhas ~129 e ~226).
- Remover o link "Área do cliente" (linha ~179).
- Trocar o dropdown "Serviços" para listar os 6 serviços de `SERVICES`, cada um apontando para `/servicos/${slug}`.
- O botão "Agendar diagnóstico" deve chamar `openContact()` em vez de `href="#contato"`. Como Nav é client component, importar `useContactModal` e usar `<button onClick={() => openContact()}>`.

- [ ] **Step 2: MobileBottomNav**

Em `components/ui/MobileBottomNav.tsx`:
- Remover o drawer/label "Planos"; substituir o slot por **"Orçamento"** cujo botão chama `openContact()`.
- Drawer "Serviços" → 6 serviços com `href={/servicos/${slug}}`.
- Drawer "Casos" → remover segmentos fictícios (Barbearias/Restaurantes/Salões); deixar "Casos" → `#casos`.

- [ ] **Step 3: HeroCarousel**

Em `components/HeroCarousel.tsx`: remover `href: "#planos"` (linha ~52). CTAs dos slides chamam `openContact()` (tornar os botões `<button>` com onClick) ou apontam para `/servicos/[slug]` quando fizer sentido. O CTA principal do hero abre o modal.

- [ ] **Step 4: Footer**

Em `components/Footer.tsx`: coluna de links sem "Planos"; adicionar links para os 6 `/servicos/[slug]`; nenhum "Área do cliente". CTA do footer → `openContact()`.

- [ ] **Step 5: Verificar ausência de referências**

Run (Grep): procurar `Planos` e `Área do cliente` e `#planos` em `components/` e `app/`.
Expected: nenhuma ocorrência (exceto, se houver, em docs).

- [ ] **Step 6: Build + commit**

```bash
pnpm build
git add components/
git commit -m "feat: remover Planos e Área do cliente; CTAs abrem modal"
```

---

## Task 8: Componente Reveal (animações on-scroll)

**Files:**
- Create: `components/ui/Reveal.tsx`

- [ ] **Step 1: Implementar**

```tsx
// components/ui/Reveal.tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Aplicar em headers de seção**

Envolver títulos/eyebrows das seções (ServicesGrid, MissionSection, StatsSection, SectorsChart, FeaturedServices, FAQ, Marketing, Cases, Blog) com `<Reveal>` e `delay` escalonado em listas. Manter os contadores `useInView` existentes.

- [ ] **Step 3: Build + commit**

```bash
pnpm build
git add components/ui/Reveal.tsx components/
git commit -m "feat: animações on-scroll com Reveal (respeita reduced-motion)"
```

---

## Task 9: Fix do WhatsApp float + AnnouncementBar

**Files:**
- Modify: `components/ui/WhatsAppFloat.tsx`
- Modify: `components/AnnouncementBar.tsx`

- [ ] **Step 1: Reposicionar o float**

Em `WhatsAppFloat.tsx`, ajustar para nunca encostar no footer/barra:
```tsx
className="fixed right-5 bottom-24 md:bottom-8 z-[60] w-14 h-14 rounded-full bg-[#25D366] ..."
```
Usar `usePathname`/scroll opcional não é necessário; o importante é o offset acima da AnnouncementBar. Trocar a hardcoded `wa.me/5511999999999` por `whatsappLink()` de `lib/site-config`.

- [ ] **Step 2: Ajustar AnnouncementBar**

Em `AnnouncementBar.tsx`: manter sticky bottom, z-index `40` (abaixo do float `60`), e garantir que o float fique visivelmente acima dela (offset do Step 1 cobre isso). Confirmar `pb` mobile não cria sobreposição com o float.

- [ ] **Step 3: Verificação visual (360px e desktop)**

Em dev, redimensionar para 360px: o ícone do WhatsApp NÃO pode tocar a barra vermelha nem o footer.

- [ ] **Step 4: Commit**

```bash
git add components/ui/WhatsAppFloat.tsx components/AnnouncementBar.tsx
git commit -m "fix: reposicionar WhatsApp float p/ não encostar no footer"
```

---

## Task 10: Seção de Casos honesta (substituir Testimonials)

**Files:**
- Create: `components/sections/CasesSection.tsx`
- Modify: `app/page.tsx`
- (Opcional) Delete: `components/TestimonialsCarousel.tsx`

- [ ] **Step 1: Criar CasesSection**

Conteúdo genérico + case real. Métricas genéricas (sem números inventados de clientes nomeados):
```tsx
// components/sections/CasesSection.tsx
"use client";
import { Reveal } from "@/components/ui/Reveal";

const ACHIEVEMENTS = [
  { label: "Dezenas de sites criados", sub: "negócios locais no ar e vendendo" },
  { label: "Empresas com Google Meu Negócio configurado", sub: "mais visíveis na busca local" },
  { label: "Atendimentos automatizados no WhatsApp", sub: "com agentes de IA 24h" },
  { label: "Campanhas de tráfego ativas", sub: "trazendo o cliente certo" },
];

export function CasesSection() {
  return (
    <section id="casos" className="py-20 md:py-28 bg-bg">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <p className="txt-eyebrow text-accent mb-3">Resultados</p>
          <h2 className="txt-display text-3xl md:text-5xl text-ink mb-4">
            Trabalho que aparece no dia a dia do negócio
          </h2>
          <p className="text-mute max-w-2xl mb-12">
            Ainda estamos construindo nossa vitrine de cases. Enquanto isso, veja o que já entregamos
            e um projeto de referência no ar.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <div className="h-full p-6 rounded-2xl border border-rule bg-bg">
                <p className="txt-display text-xl text-ink mb-2">{a.label}</p>
                <p className="text-mute text-sm">{a.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <a
            href="https://trigueirotech.com.br/"
            target="_blank" rel="noopener noreferrer"
            className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-8 rounded-2xl bg-dark text-bg"
          >
            <div>
              <p className="txt-eyebrow text-bg/60 mb-2">Projeto de referência</p>
              <p className="txt-display text-2xl md:text-3xl">Trigueiro Tech</p>
              <p className="text-bg/70 mt-1">Site profissional no ar — exemplo do nosso padrão de entrega.</p>
            </div>
            <span className="shrink-0 min-h-[44px] inline-flex items-center px-6 rounded-full bg-accent text-bg font-semibold group-hover:bg-sun">
              Ver site →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Trocar no page.tsx**

Em `app/page.tsx`, remover `<TestimonialsCarousel />` (e o import) e inserir `<CasesSection />` na mesma posição. Avaliar se `TeamCarousel` também usa pessoas fictícias — se sim, manter mas com aviso genérico ou remover (decidir com base no conteúdo atual; default: manter mas sem nomes que impliquem clientes reais).

- [ ] **Step 3: Build + grep**

Run: `pnpm build`. Grep por nomes fictícios antigos ("Carlos S.", "Ana Lima", "Roberto M.", "Fernanda O.") → nenhuma ocorrência renderizada.

- [ ] **Step 4: Commit**

```bash
git add components/sections/CasesSection.tsx app/page.tsx
git rm components/TestimonialsCarousel.tsx  # se removido
git commit -m "feat: seção de casos honesta + case real trigueirotech"
```

---

## Task 11: JSON-LD e helpers de SEO

**Files:**
- Create: `components/seo/JsonLd.tsx`
- Create: `lib/seo/schema.ts`

- [ ] **Step 1: Componente JsonLd**

```tsx
// components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Geradores de schema**

```ts
// lib/seo/schema.ts
import { SITE, SERVICES } from "@/lib/site-config";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  email: SITE.email,
  telephone: `+${SITE.whatsapp}`,
  description: SITE.description,
  areaServed: SITE.city,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "SiteNavigationElement",
    position: i + 1,
    name: s.name,
    url: `${SITE.url}/servicos/${s.slug}`,
  })),
};

export function serviceSchema(slug: string) {
  const s = SERVICES.find((x) => x.slug === slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.long,
    provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url },
    areaServed: SITE.city,
    url: `${SITE.url}/servicos/${s.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqSchema(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}

export function articleSchema(p: { title: string; description: string; slug: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    url: `${SITE.url}/blog/${p.slug}`,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };
}
```

- [ ] **Step 3: Type-check + commit**

```bash
pnpm exec tsc --noEmit
git add components/seo lib/seo
git commit -m "feat: helpers de JSON-LD (Organization, WebSite, Service, FAQ, Article)"
```

---

## Task 12: Metadata base, robots, sitemap, JSON-LD global

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

- [ ] **Step 1: Metadata base completa**

Em `app/layout.tsx`, expandir `metadata`:
```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Bulk — Presença digital para negócio local crescer",
    template: "%s | Bulk",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bulk — Presença digital para negócio local crescer",
    description: SITE.description,
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true },
};
```
E no `<body>`, antes do conteúdo, injetar JSON-LD global:
```tsx
<JsonLd data={organizationSchema} />
<JsonLd data={websiteSchema} />
<JsonLd data={siteNavigationSchema} />
```

- [ ] **Step 2: robots.ts**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: sitemap.ts**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE, SERVICES } from "@/lib/site-config";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticRoutes = ["", "/orcamento", "/blog"].map((p) => ({
    url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7,
  }));
  const serviceRoutes = SERVICES.map((s) => ({
    url: `${base}/servicos/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8,
  }));
  const postRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6,
  }));
  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
```
> Nota: `getAllPosts` vem da Task 14. Se executar antes, stub `getAllPosts` retornando `[]`.

- [ ] **Step 4: Build + commit**

```bash
pnpm build
git add app/layout.tsx app/robots.ts app/sitemap.ts
git commit -m "feat: metadata base, robots, sitemap e JSON-LD global"
```

---

## Task 13: Páginas de serviço `/servicos/[slug]`

**Files:**
- Create: `app/servicos/[slug]/page.tsx`

- [ ] **Step 1: Implementar página estática com metadata e schema**

```tsx
// app/servicos/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getService, SITE } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { ServiceCta } from "./service-cta"; // botão client que abre o modal

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.long,
    alternates: { canonical: `/servicos/${s.slug}` },
    openGraph: { title: `${s.name} | Bulk`, description: s.long, type: "website" },
  };
}

export default async function ServicePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  return (
    <main className="pt-28 pb-24">
      <JsonLd data={serviceSchema(s.slug)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Início", url: SITE.url },
        { name: "Serviços", url: `${SITE.url}/servicos/${s.slug}` },
        { name: s.name, url: `${SITE.url}/servicos/${s.slug}` },
      ])} />
      <div className="max-w-[900px] mx-auto px-6 md:px-8">
        <p className="txt-eyebrow text-accent mb-3">Serviço</p>
        <h1 className="txt-display text-4xl md:text-6xl text-ink mb-5">{s.name}</h1>
        <p className="text-lg text-mute mb-8">{s.long}</p>
        <ServiceCta slug={s.slug} />
        <nav className="mt-16 pt-8 border-t border-rule">
          <p className="txt-eyebrow text-mute mb-4">Outros serviços</p>
          <ul className="flex flex-wrap gap-3">
            {SERVICES.filter((x) => x.slug !== s.slug).map((x) => (
              <li key={x.slug}>
                <Link href={`/servicos/${x.slug}`} className="inline-block px-4 py-2 rounded-full border border-rule text-ink hover:border-accent">
                  {x.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Botão CTA client**

```tsx
// app/servicos/[slug]/service-cta.tsx
"use client";
import { useContactModal } from "@/components/contact/useContactModal";
export function ServiceCta({ slug }: { slug: string }) {
  const { openContact } = useContactModal();
  return (
    <button onClick={() => openContact(slug)} className="min-h-[52px] px-7 rounded-full bg-accent text-bg font-semibold">
      Solicitar orçamento
    </button>
  );
}
```

- [ ] **Step 3: Build + verificar rotas**

Run: `pnpm build`
Expected: 6 rotas `/servicos/...` geradas estaticamente.

- [ ] **Step 4: Commit**

```bash
git add app/servicos
git commit -m "feat: páginas de serviço dedicadas (sitelinks + Service schema)"
```

---

## Task 14: Infra de blog (MDX)

**Files:**
- Create: `lib/blog.ts`
- Create: `content/blog/google-maps-busca-local.mdx`
- Create: `content/blog/ia-no-whatsapp-24h.mdx`
- Modify: `package.json` (deps)

- [ ] **Step 1: Instalar deps**

Run: `pnpm add gray-matter next-mdx-remote`
(Se houver conflito de peer com React 19: `pnpm add gray-matter next-mdx-remote --config.strict-peer-dependencies=false`.)

- [ ] **Step 2: lib/blog.ts**

```ts
// lib/blog.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string; title: string; description: string;
  date: string; category: string; cover?: string; readingMinutes: number;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readMeta(f.replace(/\.mdx$/, "")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function readMeta(slug: string): PostMeta {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).length;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "2026-01-01",
    category: data.category ?? "Geral",
    cover: data.cover,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getPost(slug: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { meta: readMeta(slug), content, data };
}
```

- [ ] **Step 3: Criar 2 posts (≥800 palavras cada)**

`content/blog/google-maps-busca-local.mdx` — frontmatter + corpo real:
```mdx
---
title: "Como aparecer no Google Maps quando buscam o seu serviço"
description: "Passo a passo para colocar seu negócio local no topo das buscas do Google e do Maps."
date: "2026-05-28"
category: "Google"
---

Quando alguém procura "barbearia perto de mim" ou "restaurante no centro", o Google mostra
primeiro os negócios com perfil bem configurado... (escrever ≥800 palavras, com H2/H3,
listas e um CTA no fim apontando para /orcamento).
```
`content/blog/ia-no-whatsapp-24h.mdx` — análogo, categoria "IA".
> O executor deve escrever conteúdo real e útil (não lorem ipsum), ≥800 palavras, escaneável.

- [ ] **Step 4: Type-check + commit**

```bash
pnpm exec tsc --noEmit
git add lib/blog.ts content/blog package.json pnpm-lock.yaml
git commit -m "feat: infra de blog em MDX + 2 artigos iniciais"
```

---

## Task 15: Rotas do blog `/blog` e `/blog/[slug]`

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Modify: `components/BlogSection.tsx`

- [ ] **Step 1: Índice /blog**

```tsx
// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Marketing digital para negócio local",
  description: "Dicas práticas de site, Google, tráfego, social media e IA para negócios locais.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <p className="txt-eyebrow text-accent mb-3">Conteúdos</p>
        <h1 className="txt-display text-4xl md:text-6xl text-ink mb-10">Blog da Bulk</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="block p-6 rounded-2xl border border-rule hover:border-accent">
              <span className="txt-eyebrow text-accent">{p.category}</span>
              <h2 className="txt-display text-xl text-ink mt-2 mb-2">{p.title}</h2>
              <p className="text-mute text-sm">{p.description}</p>
              <p className="text-mute text-xs mt-4">{p.readingMinutes} min de leitura</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Post /blog/[slug]**

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SITE } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getPost(slug);
    return { title: meta.title, description: meta.description, alternates: { canonical: `/blog/${slug}` } };
  } catch { return {}; }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try { post = getPost(slug); } catch { notFound(); }
  const { meta, content } = post!;
  return (
    <main className="pt-28 pb-24">
      <JsonLd data={articleSchema(meta)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Início", url: SITE.url },
        { name: "Blog", url: `${SITE.url}/blog` },
        { name: meta.title, url: `${SITE.url}/blog/${meta.slug}` },
      ])} />
      <article className="max-w-[760px] mx-auto px-6 md:px-8 prose-bulk">
        <p className="txt-eyebrow text-accent mb-3">{meta.category}</p>
        <h1 className="txt-display text-3xl md:text-5xl text-ink mb-6">{meta.title}</h1>
        <div className="text-ink/90 leading-relaxed space-y-4">
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  );
}
```
> Adicionar estilos básicos para o conteúdo (h2/h3/ul/p) em `globals.css` sob `.prose-bulk` ou usar classes do MDX components map.

- [ ] **Step 3: Ligar BlogSection à /blog real**

Em `components/BlogSection.tsx`: importar `getAllPosts` NÃO é possível (client). Em vez disso, tornar BlogSection um server component que recebe posts via props da page, OU buscar os 3 posts mais recentes em `app/page.tsx` (server) e passar como prop. Ajustar links de `#blog` para `/blog/${slug}` e o "Ver todos" para `/blog`.

- [ ] **Step 4: Build + commit**

```bash
pnpm build
git add app/blog components/BlogSection.tsx app/globals.css app/page.tsx
git commit -m "feat: rotas de blog /blog e /blog/[slug] (estáticas, Article schema)"
```

---

## Task 16: Página /orcamento + seção Marketing + FAQ schema

**Files:**
- Create: `app/orcamento/page.tsx`
- Create: `components/sections/MarketingSection.tsx`
- Modify: `components/FaqSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: /orcamento (fallback indexável do modal)**

```tsx
// app/orcamento/page.tsx
import type { Metadata } from "next";
import { OrcamentoCta } from "./orcamento-cta";

export const metadata: Metadata = {
  title: "Solicitar orçamento",
  description: "Conte sobre seu negócio e receba um orçamento sob medida da Bulk.",
  alternates: { canonical: "/orcamento" },
};

export default function Orcamento() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-[760px] mx-auto px-6 md:px-8 text-center">
        <p className="txt-eyebrow text-accent mb-3">Orçamento sob medida</p>
        <h1 className="txt-display text-4xl md:text-6xl text-ink mb-5">Solicitar orçamento</h1>
        <p className="text-lg text-mute mb-8">
          Cada negócio é único — por isso não trabalhamos com pacotes engessados.
          Conte o que você precisa e montamos uma proposta sob medida.
        </p>
        <OrcamentoCta />
      </div>
    </main>
  );
}
```
`app/orcamento/orcamento-cta.tsx`: botão client que chama `openContact()`.

- [ ] **Step 2: MarketingSection (conteúdo E-E-A-T)**

Criar seção com ~300-400 palavras explicando como Site + Tráfego + Social + Google + IA se conectam, com links internos para `/servicos/[slug]`. Envolver em `<Reveal>`.

- [ ] **Step 3: FAQ + FAQPage schema**

Em `components/FaqSection.tsx`, extrair as perguntas para um array exportado e renderizar `<JsonLd data={faqSchema(...)} />`. Atualizar perguntas para refletir 6 serviços e remoção de "planos" (ex.: trocar "A manutenção está inclusa nos planos?" por "Como funciona a manutenção?"; "Qual é o investimento?" → "Como funciona o orçamento?" mencionando orçamento individual).

- [ ] **Step 4: Inserir MarketingSection no page.tsx**

Posicionar `<MarketingSection />` entre `MissionSection` e `StatsSection` (ou onde fluir melhor).

- [ ] **Step 5: Build + commit**

```bash
pnpm build
git add app/orcamento components/sections/MarketingSection.tsx components/FaqSection.tsx app/page.tsx
git commit -m "feat: página /orcamento, seção de marketing e FAQPage schema"
```

---

## Task 17: Atualizar grids de serviço para 6 itens

**Files:**
- Modify: `components/ServicesGrid.tsx`
- Modify: `components/FeaturedServicesCarousel.tsx`

- [ ] **Step 1: ServicesGrid usa SERVICES (6)**

Reescrever `ServicesGrid` para mapear `SERVICES` (6 cards), cada card com nome, `short`, `description` e link "Explorar →" para `/servicos/${slug}`. Grid responsivo `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

- [ ] **Step 2: FeaturedServicesCarousel usa SERVICES (6)**

Atualizar para 6 itens; remover qualquer href `#planos`; tags coerentes; CTA → modal/serviço.

- [ ] **Step 3: Build + commit**

```bash
pnpm build
git add components/ServicesGrid.tsx components/FeaturedServicesCarousel.tsx
git commit -m "feat: grids de serviço com 6 serviços ligados às páginas dedicadas"
```

---

## Task 18: Revisão de copy + responsividade + verificação final

**Files:**
- Modify: vários componentes (textos)

- [ ] **Step 1: Auditoria de copy**

Ler home + páginas e ajustar para coerência: tagline única ("Presença digital que vende todo dia"), email `contato@bulkstudio.com.br`, nenhuma menção a "planos", CTAs consistentes ("Agendar diagnóstico" / "Solicitar orçamento"), serviços batendo com os 6.

- [ ] **Step 2: Responsividade**

Em dev, validar 360px / 768px / 1280px: hero legível, CTAs visíveis acima da dobra, toques ≥44px, modal full-width no mobile, WhatsApp float sem sobreposição, bottom-nav sem "Planos".

- [ ] **Step 3: Verificação final completa**

```bash
pnpm exec tsc --noEmit
pnpm build
pnpm exec tsx --test lib/contact-message.test.ts
```
Greps finais: `Planos`, `Área do cliente`, `#planos`, `5511999999999` (deve estar só em site-config), nomes fictícios → confirmar limpeza.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "polish: revisão de copy, responsividade e verificação final"
```

---

## Self-Review (cobertura do spec)

- Tipografia/contraste → Task 2. ✓
- Remover Planos → Task 7. ✓
- Remover Área do cliente → Task 7. ✓
- Casos genéricos + trigueirotech → Task 10. ✓
- Animações modernas → Task 8 (+ aplicação nas seções). ✓
- SEO (robots/sitemap/JSON-LD/metadata) → Tasks 11, 12, 13, 15, 16. ✓
- Seção de marketing digital (conteúdo) → Task 16. ✓
- Sitelinks de conversão → Tasks 1, 13 (páginas), 12 (SiteNavigation/WebSite schema), 7 (nav). ✓
- Revisão de copy → Task 18. ✓
- Motion no scroll → Task 8. ✓
- Responsividade mobile → Task 18 (+ ajustes por componente). ✓
- Blog (onde publicar) → Tasks 14, 15. ✓
- WhatsApp float fix → Task 9. ✓
- Modal → webhook Discord → Tasks 3, 4, 5, 6. ✓
- 6 serviços (Tráfego + Social) → Tasks 1, 13, 17. ✓
- frontend-design para refino → aplicar durante Tasks 6, 8, 18 (refino visual, sem mudar design).
