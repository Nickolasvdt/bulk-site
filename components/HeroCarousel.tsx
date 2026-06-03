"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { useContactModal } from "@/components/contact/useContactModal";

type Slide = {
  id: string;
  label: string;
  headline: string;
  desc: string;
  cta: string;
  href?: string;
  modal?: boolean;
  image: string;
};

const slides: Slide[] = [
  {
    id: "bulk",
    label: "Agência Digital · São Paulo",
    headline: "Presença digital\nque vende\ntodo dia.",
    desc: "Site, tráfego, social media, Google e IA no WhatsApp. Seu negócio encontrado, escolhido e faturando.",
    cta: "Agendar diagnóstico",
    modal: true,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "site",
    label: "Criação de Sites",
    headline: "No ar em\n7 dias,\ncompleto.",
    desc: "Design sob medida, mobile-first, velocidade máxima. Domínio e hospedagem inclusos.",
    cta: "Ver serviço",
    href: "/servicos/criacao-de-sites",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "trafego",
    label: "Gestão de Tráfego",
    headline: "Anúncios que\ntrazem o\ncliente certo.",
    desc: "Campanhas no Google e Meta colocando seu negócio na frente de quem já quer comprar.",
    cta: "Ver serviço",
    href: "/servicos/gestao-de-trafego",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "social",
    label: "Social Media",
    headline: "Presença que\nconstrói\nautoridade.",
    desc: "Conteúdo estratégico e gestão de redes que mantêm seu negócio lembrado e confiável.",
    cta: "Ver serviço",
    href: "/servicos/social-media",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ia",
    label: "IA no WhatsApp",
    headline: "Atendendo\ndomingo às\n23h.",
    desc: "Agente que responde, qualifica e agenda pelo WhatsApp. Automático, 24 horas.",
    cta: "Ver serviço",
    href: "/servicos/ia-no-whatsapp",
    image: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "google",
    label: "Google Meu Negócio",
    headline: "Apareça\nprimeiro\nperto de você.",
    desc: "Configurado e otimizado. Quando buscam seu serviço no bairro, você aparece primeiro.",
    cta: "Ver serviço",
    href: "/servicos/google-meu-negocio",
    image: "https://plus.unsplash.com/premium_photo-1682088367648-735b1a6ac612?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "manutencao",
    label: "Manutenção Mensal",
    headline: "Sempre\natualizado,\nsempre no ar.",
    desc: "Relatório mensal, suporte contínuo, atualizações. Nada quebrado, nada desatualizado.",
    cta: "Ver serviço",
    href: "/servicos/manutencao",
    image: "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=1200&q=80",
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
  const { openContact } = useContactModal();

  return (
    <section className="relative bg-ink text-bg min-h-screen">
      <h1 className="sr-only">
        Bulk — Agência digital para negócio local em São Paulo: criação de sites, gestão de
        tráfego, social media, Google Meu Negócio, IA no WhatsApp e manutenção.
      </h1>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className="h-screen min-h-[600px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              {/* Right — background image (behind content) */}
              <div
                className="hidden lg:block absolute right-0 top-0 w-[50%] h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
              </div>

              {/* Mobile bg */}
              <div
                className="lg:hidden absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Content — centrado com max 85% da largura */}
              <div className="relative z-10 h-full max-w-[1280px] mx-auto px-6 md:px-8 flex items-center">
                <div className="w-full lg:w-[50%] pt-24 pb-24 lg:pb-16 flex flex-col justify-center">
                  <p className="text-[12px] font-mono tracking-[0.22em] uppercase text-bg/35 mb-6">
                    {slide.label}
                  </p>
                  <div className="w-8 h-px bg-bg/20 mb-6" />
                  <p className="font-display font-bold text-[clamp(38px,5.5vw,72px)] leading-[0.92] tracking-[-0.03em] whitespace-pre-line max-w-lg">
                    {slide.headline}
                  </p>
                  <p className="mt-7 text-[15px] leading-[1.65] text-bg/50 max-w-[360px]">
                    {slide.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-4 flex-wrap">
                    {slide.modal ? (
                      <button
                        type="button"
                        onClick={() => openContact()}
                        className="inline-flex items-center gap-2 bg-accent text-bg px-6 py-3 rounded-md text-[14px] font-semibold hover:bg-sun transition-colors min-h-[44px]"
                      >
                        {slide.cta} →
                      </button>
                    ) : (
                      <Link
                        href={slide.href ?? "#servicos"}
                        className="inline-flex items-center gap-2 bg-accent text-bg px-6 py-3 rounded-md text-[14px] font-semibold hover:bg-sun transition-colors min-h-[44px]"
                      >
                        {slide.cta} →
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => openContact()}
                      className="text-[13px] text-bg/40 hover:text-accent transition-colors"
                    >
                      Agendar diagnóstico ↓
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows — alinhadas ao container */}
      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center gap-2">
          <ArrowButton dir="prev" onClick={() => swiperRef.current?.slidePrev()} />
          <ArrowButton dir="next" onClick={() => swiperRef.current?.slideNext()} />
        </div>
      </div>
    </section>
  );
}
