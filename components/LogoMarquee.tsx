"use client";

import { Marquee } from "@/components/ui/Marquee";
import {
  siGoogle, siWhatsapp, siInstagram, siMeta, siYoutube,
  siIfood, siNubank, siShopee, siMercadopago, siUber,
} from "simple-icons";

const brands = [
  siGoogle, siWhatsapp, siInstagram, siMeta, siYoutube,
  siIfood, siNubank, siShopee, siMercadopago, siUber,
];

export function LogoMarquee() {
  return (
    <section className="border-y border-ink/[0.07] py-6 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8 mb-5">
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-mute">
          Onde seus clientes te encontram
        </p>
      </div>

      <Marquee speed="slow" pauseOnHover>
        {brands.map((brand) => (
          <div
            key={brand.slug}
            className="flex items-center mx-10 text-ink/20 hover:text-ink/50 transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-auto fill-current"
              aria-label={brand.title}
              role="img"
            >
              <title>{brand.title}</title>
              <path d={brand.path} />
            </svg>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
