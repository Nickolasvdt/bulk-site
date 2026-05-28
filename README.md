# Bulk Institucional — Site Institucional B2B

Landing page editorial inspirada em kittl.com. Stack: Next.js 15, Tailwind, motion, Lenis.

## Como rodar

```bash
# 1. Instalar
pnpm install     # ou npm install / yarn

# 2. Dev
pnpm dev

# 3. Build
pnpm build
```

Abre em http://localhost:3000

## Estrutura

```
app/
  layout.tsx        Fontes + metadata + SmoothScroll
  page.tsx          Composição das seções
  globals.css       Reset, grain, hairlines, utilities

components/
  Nav.tsx           Fixed nav com mix-blend-difference
  Hero.tsx          Headline gigante + carousel de provas
  LogoMarquee.tsx   Logos em marquee infinito
  Method.tsx        Toggle interativo (estilo kittl)
  Results.tsx       Stats editoriais em escala
  Cases.tsx         Depoimentos com layout assimétrico
  Stack.tsx         Grid de ferramentas categorizadas
  Pricing.tsx       3 tiers com toggle mensal/anual
  FinalCTA.tsx      Seção final em dark
  Footer.tsx        Footer com palavra-marca gigante

  ui/
    SmoothScroll.tsx     Provider Lenis
    SplitText.tsx        Reveal letra-a-letra
    MagneticButton.tsx   Botão com atração ao cursor
    Marquee.tsx          Marquee horizontal infinito

lib/
  cn.ts             utility class merge
```

## Personalização

- **Cores**: `tailwind.config.ts` → `theme.extend.colors`
- **Fontes**: `app/layout.tsx` → trocar imports de `next/font/google`
- **Conteúdo**: editar arrays dentro de cada componente (são literais no topo)
- **Animação**: `motion` em cada componente, `transition` controla timing

## Decisões de design

- Tipografia: Bricolage Grotesque (display) + Geist (sans) + Geist Mono (labels). **Não** Inter.
- Cores: bg warm off-white #FBF8F2, ink #0F0E0C, accent laranja #FF5C28, sun #FFC93B
- Grid: 12 colunas, gap 24/16px, padding 32/20px
- Sem border-radius (exceto pills mínimas)
- Sem box-shadow — só hairlines `border-rule`
- Smooth scroll Lenis em todo o site
