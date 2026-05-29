"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const featured = [
  {
    slug: "criacao-de-sites",
    name: "Criação de Sites",
    type: "Digital",
    badge: "MAIS PROCURADO",
    desc: "Um site que vende de verdade. Design sob medida, mobile-first, velocidade máxima.",
    image: "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "gestao-de-trafego",
    name: "Gestão de Tráfego",
    type: "Digital",
    badge: null,
    desc: "Campanhas no Google e Meta que trazem clientes prontos para comprar, com investimento controlado.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "social-media",
    name: "Social Media",
    type: "Digital",
    badge: null,
    desc: "Conteúdo e gestão de redes que constroem autoridade, engajamento e confiança.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "ia-no-whatsapp",
    name: "IA no WhatsApp",
    type: "Digital",
    badge: "NOVIDADE",
    desc: "Um agente que responde 24h, qualifica e agenda automaticamente pelo WhatsApp.",
    image: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "google-meu-negocio",
    name: "Google Meu Negócio",
    type: "Digital",
    badge: null,
    desc: "Apareça no mapa quando buscam seu serviço perto. Configuração + otimização completa.",
    image: "https://plus.unsplash.com/premium_photo-1682088367648-735b1a6ac612?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "manutencao",
    name: "Manutenção Mensal",
    type: "Contínuo",
    badge: null,
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
            <SwiperSlide key={f.slug}>
              <Link
                href={`/servicos/${f.slug}`}
                className="group block rounded-xl border border-rule hover:border-accent hover:shadow-lg transition-all duration-300 overflow-hidden bg-bg"
              >
                {/* Photo */}
                <div
                  className="relative h-[240px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${f.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-[17px] font-semibold text-bg">
                      {f.name}
                    </h3>
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-bg/70 bg-ink/40 px-2 py-1 rounded">
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
                  <span className="inline-block mt-3 text-[13px] font-semibold text-accent">Ver serviço →</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-10">
          <a href="#servicos" className="text-[12px] font-mono tracking-[0.14em] uppercase text-mute hover:text-accent transition-colors">
            Ver todos os serviços →
          </a>
        </div>
      </div>
    </section>
  );
}
