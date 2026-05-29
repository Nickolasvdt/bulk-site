# Bulk Website — Overhaul (Tipografia, SEO, Blog, Conversão)

**Data:** 2026-05-29
**Branch:** `feat/site-overhaul`
**Status:** Aprovado para implementação

## Objetivo

Refinar o site institucional da Bulk (já em estilo G4) com foco em **conversão, SEO e
credibilidade**, sem alterar a identidade de design existente — apenas refinando.
Itens solicitados pelo usuário:

1. Reformular fontes (corrigir baixo contraste no fundo branco).
2. Remover aba "Planos" (empresa trabalha com orçamento individual).
3. Tornar a seção de Casos genérica e honesta (sem cases fictícios).
4. Adicionar animações modernas (Motion) ao scroll.
5. Levar SEO a 100% (metadata, JSON-LD, sitemap, robots, sitelinks, conteúdo).
6. Revisar a copy inteira para coerência.
7. Sitelinks de conversão (Criação de Sites, Gestão de Tráfego, Social Media, Solicitar Orçamento).
8. Animações profissionais no scroll.
9. Responsividade mobile com foco em conversão.
10. Construir o blog (publicação via MDX no repo).
11. Corrigir posição do botão flutuante do WhatsApp (encostando no footer vermelho).
12. Remover "Área do cliente".
13. Modal "Agendar diagnóstico" → webhook do Discord.

## Decisões confirmadas

- **Serviços:** mantém os 4 atuais (Site Profissional, IA no WhatsApp, Google Meu Negócio,
  Manutenção) e **adiciona Gestão de Tráfego e Social Media** → 6 serviços.
- **Blog:** MDX versionado no repositório, renderização estática.
- **Modal:** enxuto — Nome, WhatsApp, serviço de interesse, mensagem opcional.
- **Contato:** placeholders centralizados em `lib/site-config.ts` (usuário troca depois).
- **Páginas de serviço dedicadas:** sim, criar rotas indexáveis por serviço (para sitelinks reais).

---

## Arquitetura

### Configuração central
`lib/site-config.ts` — fonte única para dados de contato e constantes:
```ts
export const SITE = {
  name: "Bulk",
  url: "https://bulkstudio.com.br",
  email: "contato@bulkstudio.com.br",
  whatsapp: "5511999999999",        // PLACEHOLDER — trocar
  whatsappDisplay: "(11) 99999-9999", // PLACEHOLDER — trocar
  city: "São Paulo",
  region: "SP",
  tagline: "Presença digital que vende todo dia",
};
export const SERVICES = [ /* 6 serviços com slug, nome, subtítulo, descrição, ícone */ ];
```

### Serviços (6)
| slug | nome | subtítulo |
|------|------|-----------|
| `criacao-de-sites` | Criação de Sites | No ar em 7 dias, mobile-first |
| `gestao-de-trafego` | Gestão de Tráfego | Anúncios que trazem cliente certo |
| `social-media` | Social Media | Presença que constrói autoridade |
| `google-meu-negocio` | Google Meu Negócio | Pág. 1 no Google local |
| `ia-no-whatsapp` | IA no WhatsApp | Atende, qualifica e agenda 24h |
| `manutencao` | Manutenção Mensal | Atualizações e suporte contínuo |

### Rotas
```
/                          home (composição das seções)
/servicos/[slug]           página dedicada por serviço (6) — indexável, JSON-LD Service
/orcamento                 página de solicitação (fallback do modal, indexável)
/blog                      índice + filtro de categoria
/blog/[slug]               post estático (Article JSON-LD)
/api/contato               POST server-side → Discord webhook
```

### Modal de contato (global)
- Contexto React (`ContactModalProvider`) envolvendo o layout; qualquer CTA chama `openModal(serviceSlug?)`.
- Campos: Nome, WhatsApp, Serviço (select pré-preenchido com 6 serviços + "Não sei ainda"), Mensagem (opcional).
- Acessibilidade: focus-trap, fechar em ESC / clique no overlay, `role="dialog"`, `aria-modal`.
- Estados: idle → enviando → sucesso / erro (com retry).
- Envio: `fetch('/api/contato', POST)`. A API route lê `process.env.DISCORD_WEBHOOK_URL`
  (em `.env.local`, **fora do git**) e faz POST server-side com embed formatado.
- ⚠️ Webhook foi exposto no chat → recomendar regeneração no Discord.

### SEO
- `app/robots.ts`, `app/sitemap.ts` (home + 6 serviços + /orcamento + /blog + posts).
- JSON-LD via componente `<JsonLd>`:
  - `Organization` + `LocalBusiness` (home/layout)
  - `WebSite` com `potentialAction: SearchAction` (sitelinks searchbox)
  - `SiteNavigationElement` (nav principal)
  - `BreadcrumbList` (serviços e blog)
  - `FAQPage` (seção FAQ)
  - `Service` (páginas de serviço)
  - `Article` (posts do blog)
- Metadata por rota (title/description/canonical/OpenGraph/Twitter) via `generateMetadata`.
- OG image padrão em `public/og.png` (ou rota `opengraph-image`).

### Conteúdo (E-E-A-T / "Google recomendar")
- Nova seção home **"Marketing digital para negócio local"**: explica como Site + Tráfego +
  Social + Google + IA se conectam para vender. ~300-400 palavras, escaneável, com links
  internos para as páginas de serviço (reforça sitelinks/arquitetura).
- Blog com 2 artigos iniciais reais (≥800 palavras cada), categorizados.

### Tipografia
- `tailwind.config.ts`: `mute` `#6B6B6B` → `#4A4A4A`. Manter `accent #7a0000`, `ink #050707`.
- `app/globals.css` / `layout.tsx`: pesos display 600→700 (alguns 800); Inter base mais
  encorpada; adicionar weight 700. Manter Bricolage + Inter.
- Verificar contraste AA em texto secundário e eyebrows.

### Animações
- `components/ui/Reveal.tsx`: wrapper `motion` com `whileInView` (fade+slide, stagger opcional),
  `viewport={{ once: true }}`, respeitando `prefers-reduced-motion`.
- Aplicar em todas as seções; parallax sutil no hero/missão; micro-interações em cards/CTAs.

### Casos (honesto/genérico)
- Substituir `TestimonialsCarousel` (depoimentos fictícios) por seção `Casos`:
  - Cards de conquista genérica: "Dezenas de sites criados", "Empresas com Google Meu Negócio
    configurado", "Atendimentos automatizados via WhatsApp", "Negócios mais visíveis no Google".
  - Destaque do único case real: **trigueirotech.com.br** (card com link externo).
- Atualizar drawers do MobileBottomNav (remover segmentos fictícios específicos).

### WhatsApp float + AnnouncementBar
- Reposicionar `WhatsAppFloat`: garantir offset acima da AnnouncementBar e nunca sobrepor
  footer; revisar z-index e `bottom` em mobile/desktop.

---

## Fora de escopo
- Backend/CRM real (só webhook Discord).
- CMS headless (MDX no repo agora).
- Cases reais com nomes (não existem ainda).
- Mudança da identidade visual / paleta (apenas refinamento de contraste).

## Riscos
- Webhook do Discord exposto no chat → deve ser regenerado.
- Páginas de serviço aumentam superfície de copy a manter — mitigado por dados centralizados.
- Google sitelinks são algorítmicos; entregamos a estrutura (URLs + schema + nav), não garantia.

## Critérios de sucesso
- Build `pnpm build` passa sem erros.
- Nenhuma referência a "Planos" ou "Área do cliente" no código.
- Nenhum nome de cliente fictício na página.
- Lighthouse SEO ~100; metadata + JSON-LD válidos.
- Modal envia e aparece no Discord; webhook não exposto no bundle do front.
- WhatsApp float não encosta no footer em mobile/desktop.
- Layout coerente e responsivo em 360px / 768px / 1280px.
