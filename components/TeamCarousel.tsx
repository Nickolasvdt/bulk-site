"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const team = [
  {
    firstName: "Nicolas",
    lastName: "Vidt",
    role: "Fundador da Bulk, especialista em presença digital local",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    firstName: "Rafael",
    lastName: "Costa",
    role: "CTO · Arquitetura de sistemas e IA conversacional",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    firstName: "Ana",
    lastName: "Ferreira",
    role: "Design Lead · UX/UI e identidade visual para PMEs",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    firstName: "Lucas",
    lastName: "Martins",
    role: "Growth · SEO local e Google Meu Negócio",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
  },
  {
    firstName: "Mariana",
    lastName: "Lima",
    role: "CS · Sucesso do cliente e onboarding",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=600&q=80",
  },
];

export function TeamCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
              Nossa equipe
            </p>
            <h2 className="font-display font-semibold text-[clamp(26px,3.5vw,44px)] leading-[1.05] tracking-[-0.025em]">
              Na Bulk, só entrega<br />
              <span className="font-display italic text-accent">quem executa.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors"
              aria-label="Anterior"
            >
              <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors"
              aria-label="Próximo"
            >
              <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1.2}
          spaceBetween={10}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={(s) => { swiperRef.current = s; }}
          breakpoints={{
            640:  { slidesPerView: 2.2 },
            768:  { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 5 },
          }}
        >
          {team.map((member) => (
            <SwiperSlide key={member.lastName}>
              <div className="rounded-2xl overflow-hidden">
                {/* Photo */}
                <div
                  className="relative h-[380px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${member.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
                    <span className="font-display italic text-[20px] font-light text-bg/90">
                      {member.firstName}
                    </span>
                    <span className="font-display italic text-[20px] font-light text-accent">
                      {member.lastName}
                    </span>
                    <div className="w-8 h-px bg-accent/60 my-1.5" />
                    <p className="font-sans text-[12px] text-bg/60 leading-[1.4]">{member.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 text-center">
          <a href="#sobre" className="text-[12px] font-mono tracking-[0.14em] uppercase text-mute hover:text-accent transition-colors">
            Conhecer a equipe →
          </a>
        </div>
      </div>
    </section>
  );
}
