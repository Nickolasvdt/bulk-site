# Humanização do Site Bulk — Design Spec

**Data:** 2026-05-27  
**Branch:** refactor/bulk-institucional

## Diagnóstico atual

O site atual é polido mas frio: editorial pesado, sem fotos de pessoas reais, mockup SVG no hero, cards abstratos, depoimentos com avatares minúsculos. Parece portfólio de design, não uma agência que se importa com gente real.

## Direção: "Gente Real. Resultado Real."

Menos institucional, mais humano. O visitante deve sentir que está vendo pessoas como ele, que tiveram o mesmo problema e saíram bem. Fotos de humanos reais em contexto de negócio local, composições orgânicas, calor visual.

---

## Mudanças por seção

### 1. Hero — Split com colagem de fotos
- Remove o SVG de celular
- Layout split: esquerda (headline + CTA), direita (colagem vertical de 3 fotos com sobreposição orgânica)
- Fotos: dona de cafeteria, barbeiro latino, homem no celular
- Adiciona uma nota humana: "Negócios como o seu"

### 2. Nova seção: SocialProofBand (após LogoMarquee)
- Linha de avatares circulares + "+200 negócios atendidos em SP"
- 5 fotos de rostos reais, sobrepostos
- Tom quente, confiante

### 3. Features — Cards com fotos contextuais
- Cada card de feature ganha uma foto de contexto pequena no topo
- Site: foto da dona de cafeteria olhando o laptop
- IA WhatsApp: foto do homem sorrindo no celular
- Google: foto da proprietária na frente da loja

### 4. Cases — Depoimentos com foto grande
- Layout mudado: foto ocupa metade esquerda do card (altura total), texto à direita
- Adiciona 3º depoimento
- Fotos maiores e mais impactantes
- Remove os pequenos avatares, usa foto grande

### 5. FinalCTA — Foto de destaque maior
- Foto de lifestyle ocupa mais espaço (de 210px para ~340px de largura)
- Troca por foto mais calorosa (mulher sorrindo na porta do negócio)

---

## Fotos (Unsplash CDN)

| Uso | URL base |
|-----|----------|
| Hero foto 1 (loja, principal) | `plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f` |
| Hero foto 2 (barbeiro) | `plus.unsplash.com/premium_photo-1661583828844-60d0cfbb8ccf` |
| Hero foto 3 (homem no celular) | `images.unsplash.com/photo-1563986768817-257bf91c5753` |
| Social proof face 1 | `plus.unsplash.com/premium_photo-1682088367648-735b1a6ac612` |
| Social proof face 2 | `images.unsplash.com/photo-1573496527892-904f897eb744` |
| Social proof face 3 | `images.unsplash.com/photo-1778550579010-cb0d00cd94e6` |
| Social proof face 4 | `images.unsplash.com/photo-1758519291037-db9ec86cda69` |
| Social proof face 5 | `plus.unsplash.com/premium_photo-1661902210733-17533340166f` |
| Cases foto 1 (barbeiro) | `plus.unsplash.com/premium_photo-1661391316543-9c40ae315a4a` |
| Cases foto 2 (loja) | `plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f` |
| Cases foto 3 (empreendedor) | `plus.unsplash.com/premium_photo-1661902210733-17533340166f` |
| FinalCTA lifestyle | `images.unsplash.com/photo-1758519291037-db9ec86cda69` |

## Mudanças técnicas
- `next.config.mjs`: adicionar `images.unsplash.com` e `plus.unsplash.com` como remotePatterns
- Novo componente: `components/SocialProofBand.tsx`
- `page.tsx`: incluir `<SocialProofBand />` entre `<LogoMarquee />` e `<Features />`
