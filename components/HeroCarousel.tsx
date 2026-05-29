"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const slides = [
  {
    id: "bulk",
    label: "Agência Digital · São Paulo",
    headline: "Presença digital\nque vende\ntodo dia.",
    desc: "Site profissional, IA no WhatsApp e Google Meu Negócio. Seu negócio encontrado, escolhido e faturando.",
    cta: "Agendar diagnóstico",
    href: "#contato",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "site",
    label: "Site Profissional",
    headline: "No ar em\n7 dias,\ncompleto.",
    desc: "Design sob medida, mobile-first, velocidade máxima. Domínio e hospedagem inclusos.",
    cta: "Saiba mais",
    href: "#como-funciona",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ia",
    label: "IA no WhatsApp",
    headline: "Atendendo\ndominingo às\n23h.",
    desc: "Agente que responde, qualifica e agenda pelo WhatsApp. Automático, sem parar.",
    cta: "Saiba mais",
    href: "#como-funciona",
    image: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "google",
    label: "Google Meu Negócio",
    headline: "Apareça\nprimeiro\nperto de você.",
    desc: "Configurado e otimizado. Quando buscam seu serviço no bairro, você aparece primeiro.",
    cta: "Saiba mais",
    href: "#como-funciona",
    image: "https://plus.unsplash.com/premium_photo-1682088367648-735b1a6ac612?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "manutencao",
    label: "Manutenção Mensal",
    headline: "Sempre\natualizado,\nsempre no ar.",
    desc: "Relatório mensal, suporte contínuo, atualizações. Nada quebrado, nada desatualizado.",
    cta: "Ver planos",
    href: "#planos",
    image: "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "numeros",
    label: "Negócios em São Paulo",
    headline: "200+\nnegócios\nno digital.",
    desc: "Barbearias, restaurantes, salões, lojas, clínicas. Todos aparecendo e faturando.",
    cta: "Ver casos",
    href: "#casos",
    image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bulk-pass",
    label: "Bulk Pass",
    headline: "O plano\ncompleto\npara crescer.",
    desc: "Site + IA + Google + Manutenção. Tudo junto, com prioridade e desconto.",
    cta: "Em breve",
    href: "#planos",
    image: "https://plus.unsplash.com/premium_photo-1661902210733-17533340166f?auto=format&fit=crop&w=1200&q=80",
  },
];

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "prev" ? "Slide anterior" : "Próximo slide"}
      className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors shrink-0"
    >
      <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
        {dir === "prev" ? (
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    </button>
  );
}

export function HeroCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative bg-ink text-bg min-h-screen">
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className="h-screen min-h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex h-full">
              {/* Left — text */}
              <div className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] px-8 md:px-16 lg:px-20 pt-24 pb-16">
                <p className="text-[11px] font-mono tracking-[0.22em] uppercase text-bg/35 mb-6">
                  {slide.label}
                </p>
                <div className="w-8 h-px bg-bg/20 mb-6" />
                <h1 className="font-display font-semibold text-[clamp(38px,5.5vw,72px)] leading-[0.92] tracking-[-0.03em] whitespace-pre-line max-w-lg">
                  {slide.headline}
                </h1>
                <p className="mt-7 text-[14px] leading-[1.65] text-bg/50 max-w-[320px]">
                  {slide.desc}
                </p>
                <div className="mt-8 flex items-center gap-4 flex-wrap">
                  <a
                    href={slide.href}
                    className="inline-flex items-center gap-2 bg-accent text-bg px-6 py-3 rounded-md text-[13px] font-medium hover:bg-sun transition-colors"
                  >
                    {slide.cta} →
                  </a>
                  <a href="#como-funciona" className="text-[12px] text-bg/30 hover:text-accent transition-colors">
                    Como funciona ↓
                  </a>
                </div>
              </div>

              {/* Right — background image */}
              <div
                className="hidden lg:block absolute right-0 top-0 w-[52%] h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
              </div>

              {/* Mobile bg */}
              <div
                className="lg:hidden absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 left-8 md:left-16 lg:left-20 z-20 flex items-center gap-2">
        <ArrowButton dir="prev" onClick={() => swiperRef.current?.slidePrev()} />
        <ArrowButton dir="next" onClick={() => swiperRef.current?.slideNext()} />
      </div>
    </section>
  );
}
