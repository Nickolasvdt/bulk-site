"use client";

import { useState } from "react";
import { Marquee } from "@/components/ui/Marquee";

// `logo`: caminho/URL de imagem (ex: "/logos/tecpet.png" quando você tiver os arquivos).
// `domain`: usa a Clearbit Logo API para buscar o logo automaticamente por domínio.
// Sem logo válido, cai no wordmark (nome estilizado). Tudo monocromático.
type Brand = { name: string; logo?: string; domain?: string };

const BRANDS: Brand[] = [
  { name: "Trigueiro Tech", domain: "trigueirotech.com.br" },
  { name: "Casas Bahia", domain: "casasbahia.com.br" },
  { name: "Fivem", domain: "fivem.net" },
  { name: "TecPet Logística" },
  { name: "Simco" },
  { name: "Rota Fishing" },
  { name: "Studio Bella" },
  { name: "AutoCenter Vila" },
  { name: "Mercado Central" },
];

function logoSrc(b: Brand) {
  if (b.logo) return b.logo;
  if (b.domain) return `https://logo.clearbit.com/${b.domain}?size=80`;
  return null;
}

function BrandItem({ brand }: { brand: Brand }) {
  const src = logoSrc(brand);
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;

  return (
    <div className="flex items-center justify-center px-8 md:px-12 shrink-0 h-12">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={brand.name}
          onError={() => setFailed(true)}
          className="h-8 md:h-9 w-auto max-w-[140px] object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition duration-300"
        />
      ) : (
        <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-ink/35 hover:text-ink transition-colors duration-300 whitespace-nowrap">
          {brand.name}
        </span>
      )}
    </div>
  );
}

export function LogosMarquee() {
  return (
    <Marquee speed="slow" className="py-2">
      {BRANDS.map((b) => (
        <BrandItem key={b.name} brand={b} />
      ))}
    </Marquee>
  );
}
