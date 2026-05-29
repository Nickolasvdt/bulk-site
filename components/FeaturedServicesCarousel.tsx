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
