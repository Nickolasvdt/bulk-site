"use client";

import { Marquee } from "@/components/ui/Marquee";

// Troque `logo` por um caminho de imagem (ex: "/logos/tecpet.png") quando tiver
// os PNGs/SVGs reais. Sem `logo`, renderiza o nome como wordmark monocromático.
type Brand = { name: string; logo?: string };

const BRANDS: Brand[] = [
  { name: "TecPet Logística" },
  { name: "Simco" },
  { name: "Trigueiro Tech" },
  { name: "Fivem" },
  { name: "Casas Bahia" },
  { name: "Rota Fishing" },
  { name: "Studio Bella" },
  { name: "AutoCenter Vila" },
  { name: "Mercado Central" },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <div className="flex items-center justify-center px-8 md:px-12 shrink-0">
      {brand.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-8 md:h-10 w-auto object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition duration-300"
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
