"use client";

import { useState } from "react";
import { Marquee } from "@/components/ui/Marquee";

// Para mostrar o logo real: coloque o arquivo em `public/logos/` com o nome indicado
// em `file` e ele aparece automaticamente (monocromático). Enquanto o arquivo não
// existir, mostramos o nome estilizado (wordmark) como fallback.
type Brand = { name: string; file: string };

const BRANDS: Brand[] = [
  { name: "Trigueiro Tech", file: "/logos/trigueiro-tech.svg" },
  { name: "Casas Bahia", file: "/logos/casas-bahia.svg" },
  { name: "Fivem", file: "/logos/fivem.svg" },
  { name: "TecPet Logística", file: "/logos/tecpet.svg" },
  { name: "Simco", file: "/logos/simco.svg" },
  { name: "Rota Fishing", file: "/logos/rota-fishing.svg" },
  { name: "Studio Bella", file: "/logos/studio-bella.svg" },
  { name: "AutoCenter Vila", file: "/logos/autocenter-vila.svg" },
  { name: "Mercado Central", file: "/logos/mercado-central.svg" },
];

function BrandItem({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex items-center justify-center px-8 md:px-12 shrink-0 h-12">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.file}
          alt={brand.name}
          onError={() => setFailed(true)}
          className="h-8 md:h-9 w-auto max-w-[150px] object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition duration-300"
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
