# CLAUDE.md — Bulk Website

## Projeto
Site institucional da **Bulk**, agência digital focada em presença digital para negócios locais em São Paulo.

**Repositório:** `bulk-website`
**Branch de trabalho:** `feat/g4-style-homepage`

---

## Objetivo atual
Recriar a homepage **exatamente** no estilo do G4 Business (g4business.com), substituindo 100% dos componentes, sem reaproveitar nada do projeto anterior. Usar o HTML completo do G4 como referência (disponível na conversa de 2026-05-28). Substituir conteúdo G4 → Bulk em cada seção.

---

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (`motion/react`)
- pnpm

---

## Identidade Visual Bulk

| Token Tailwind | Valor     | Equivalente G4     | Uso                          |
|----------------|-----------|--------------------|------------------------------|
| `bg`           | `#FFFFFF` | `#001F35` (navy)   | Fundo principal              |
| `ink`          | `#050707` | `#F5F4F3` (creme)  | Texto principal              |
| `accent`       | `#610000` | `#B9915B` (dourado)| Destaque, botões, gráficos   |
| `mute`         | `#6B6B6B` | `#60708A`          | Texto secundário             |
| `dark`         | `#050707` | `#001F35`          | Footer, seções escuras       |

**Fontes:**
- Display: `Bricolage Grotesque` (similar ao Libre Baskerville / PP Museum do G4)
- Sans: `Geist` (similar ao Manrope do G4)
- Mono: `Geist Mono`

**Psicologia das cores:** Branco = confiança, acessibilidade, profissionalismo para PME. Vermelho = urgência, ação, energia. Adequado para agência de negócios locais (mais caloroso que navy/dourado).

---

## Conteúdo Bulk

**Serviços (equivalentes aos "Programas" do G4):**
1. **Site Profissional** — No ar em 7 dias, mobile-first, domínio + hospedagem inclusos
2. **IA no WhatsApp** — Agente que responde, qualifica e agenda 24h/7d
3. **Google Meu Negócio** — Configurado e otimizado, Pág. 1 no Google local
4. **Manutenção Mensal** — Atualizações, relatório mensal, suporte contínuo

**Métricas (equivalentes aos "números" do G4):**
- 200+ negócios atendidos em SP
- 7 dias para site no ar
- 24h atendimento via IA
- Pág. 1 no Google local

**Tagline:** "Presença digital que vende todo dia"

**CTA principal:** "Agendar diagnóstico" → `#contato`

**Segmentos atendidos** (para barra de setores):
- Serviços 22% | Alimentação 18% | Beleza 15% | Varejo 12% | Saúde 10% | Fitness 8% | Automotivo 6% | Outros 9%

---

## Estrutura — 13 Seções (G4 → Bulk)

### 1. Announcement Bar (barra topo)
- **G4:** Evento gratuito ao vivo
- **Bulk:** "Novo: IA no WhatsApp para o seu negócio — [Saiba mais]"
- Fundo vermelho accent, texto branco, dismissível

### 2. Navigation (mega menu)
- **G4:** Logo + Programas / Comunidades / G4 Tools / Mentores / Conteúdos / Sobre nós / G4 Pass + 2 CTAs
- **Bulk:** Logo + Serviços ▾ / Casos / Planos / Blog ▾ / Sobre ▾ + CTAs "Agendar diagnóstico" + "Área do cliente"
- Mega menu dropdown com painéis (igual G4)
- Mobile: bottom nav bar com drawers (igual G4)

### 3. Hero Carousel (Swiper, 7 slides, autoplay 5s)
- **Layout:** Split — texto à esquerda, imagem de fundo à direita (igual G4)
- **Slide 1:** "Bulk" + divider + "Presença digital que vende todo dia" + CTA
- **Slide 2:** "Site Profissional" + divider + "No ar em 7 dias, com domínio e hospedagem inclusos"
- **Slide 3:** "IA no WhatsApp" + divider + "Atende, qualifica e agenda domingo às 23h"
- **Slide 4:** "Google Meu Negócio" + divider + "Apareça primeiro quando buscam perto de você"
- **Slide 5:** "Manutenção" + divider + "Relatório mensal, suporte contínuo, nada desatualizado"
- **Slide 6:** "200+" + divider + "negócios em São Paulo já aparecem online"
- **Slide 7:** "Bulk Pass" (placeholder) + divider + "Plano completo para crescimento digital"
- Setas prev/next circulares vermelhas (igual G4)

### 4. Products Grid (4 colunas)
- **G4:** Learning / Scale / Club / Tools com logo + descrição + "Explorar →"
- **Bulk:** Site Pro / IA WhatsApp / Google Local / Manutenção
- Cada card: logo Bulk + nome + subtítulo + descrição + "Explorar →" (seta vermelha)

### 5. Team Carousel ("Só entrega quem executa")
- **G4:** Carrossel 5 mentores, foto de fundo vertical (450px), nome serif italic, divider, cargo
- **Bulk:** Equipe Bulk (fundadores/especialistas) — placeholder com fotos Unsplash contextuais
- Swiper, 5 visíveis, infinite loop, setas vermelhas

### 6. Testimonials Carousel
- **G4:** Carrossel JS centrado, thumbnails 16:9, botão play, nome + cargo embaixo
- **Bulk:** Cards com foto do cliente (16:9), depoimento em texto, nome + negócio
- Mesma mecânica: prev/next, dot indicators, arrastar

### 7. Mission/Impact Section
- **G4:** Fundo vídeo YouTube, ícone G4 gear em dourado, texto missão, counter animado
- **Bulk:** Fundo imagem lifestyle, logo Bulk, "Nossa missão: todo negócio local visível online", counter "200+ negócios"
- Background video ou imagem de alta qualidade

### 8. Stats (3 contadores animados)
- **G4:** 1.09 Mi+ empregos / 87 Mil+ empresas / 4 Tri+ faturamento
- **Bulk:** 200+ negócios / 7 dias entrega / 24h atendimento
- Animação ao entrar na viewport (counter de 0 até o valor)

### 9. Segmentos Bar Chart
- **G4:** 9 barras verticais (desktop) / horizontais (mobile) animadas, percentuais
- **Bulk:** 8 segmentos: Serviços 22%, Alimentação 18%, Beleza 15%, Varejo 12%, Saúde 10%, Fitness 8%, Automotivo 6%, Outros 9%
- Cor das barras: vermelho accent
- Desktop: barras verticais sobre grid. Mobile: horizontais com expand button

### 10. Serviços em Destaque Carousel
- **G4:** 4 colunas, card com foto de fundo, estrela + nota, tag tipo, "MAIS VENDIDOS"
- **Bulk:** Site Pro ⭐9.2 · Digital → IA WhatsApp ⭐9.5 · Digital → Google Local ⭐9.0 · Digital → Manutenção ⭐8.8 · Contínuo
- Swiper, 4 visíveis desktop / 2 tablet / 1 mobile

### 11. Blog/Conteúdos
- **G4:** Grid 4 colunas, filtros de categoria, artigos com foto + tag + título + data
- **Bulk:** Placeholder "Em breve" com 4 cards fictícios + filtros desabilitados
- Links para redes (YouTube, Instagram, Spotify — adaptar)

### 12. FAQ Accordion
- Igual G4: um aberto por vez, animação
- Perguntas Bulk:
  1. O que é a Bulk?
  2. Quanto tempo leva para o site ficar no ar?
  3. A IA no WhatsApp substitui meu atendente humano?
  4. O Google Meu Negócio funciona para qualquer negócio?
  5. Quais tipos de negócio a Bulk atende?
  6. A manutenção mensal está inclusa nos planos?
  7. Como funciona o suporte?
  8. Qual é o investimento?
  9. Vocês atendem negócios fora de São Paulo?
  10. Como entrar em contato?

### 13. Footer
- **G4:** Dark bg, logo branca, 7 colunas de links, social icons em círculos bordados dourado, ReclameAqui badge, endereço
- **Bulk:** Dark bg (ink), logo Bulk branca, colunas: Serviços / Casos / Planos / Blog / Sobre / Legal, social icons (WhatsApp, Instagram, Facebook, LinkedIn) em círculos bordados vermelho, endereço SP
- WhatsApp float button fixo (verde, canto inferior direito)
- Mobile: bottom nav bar igual G4 (Serviços, Casos, Planos, Mais)

---

## Arquivos-chave

```
atlas-prospect/                    ← renomear para bulk-website
├── CLAUDE.md                      ← este arquivo
├── app/
│   ├── page.tsx                   ← composição das 13 seções
│   ├── layout.tsx                 ← meta, fonts, globals
│   └── globals.css                ← variáveis CSS
├── components/
│   ├── AnnouncementBar.tsx        ← seção 1
│   ├── Nav.tsx                    ← seção 2 (reescrever com mega menu)
│   ├── HeroCarousel.tsx           ← seção 3
│   ├── ServicesGrid.tsx           ← seção 4
│   ├── TeamCarousel.tsx           ← seção 5
│   ├── TestimonialsCarousel.tsx   ← seção 6
│   ├── MissionSection.tsx         ← seção 7
│   ├── StatsSection.tsx           ← seção 8
│   ├── SectorsChart.tsx           ← seção 9
│   ├── FeaturedServices.tsx       ← seção 10
│   ├── BlogSection.tsx            ← seção 11
│   ├── FaqSection.tsx             ← seção 12
│   ├── Footer.tsx                 ← seção 13
│   └── ui/
│       ├── WhatsAppFloat.tsx
│       ├── MobileBottomNav.tsx
│       └── SwiperCarousel.tsx
├── public/
│   └── logo.png
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## Dependências novas a instalar
- `swiper` — carrossel hero e outros (ou `embla-carousel-react`)
- Sem outras dependências novas — usar o que já existe

---

## Regras de commit
Commit a cada seção concluída:
```
feat: seção X — NomeSeção (G4-style Bulk)
```

---

## Referência visual
HTML completo do g4business.com analisado em 2026-05-28.
Mapeamento completo na conversa da sessão de design (brainstorming).
