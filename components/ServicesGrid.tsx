"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { SERVICES } from "@/lib/site-config";

export function ServicesGrid() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="servicos" className="bg-bg py-16 md:py-20 border-b border-rule">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="txt-eyebrow text-accent mb-3">O que fazemos</p>
            <h2 className="txt-display text-3xl md:text-4xl text-ink max-w-2xl">
              Tudo que seu negócio precisa para ser encontrado e vender online
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0 ml-6">
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

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={12}
          onSwiper={(s) => { swiperRef.current = s; }}
          breakpoints={{
            640:  { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 16 },
          }}
        >
          {SERVICES.map((s, i) => (
            <SwiperSlide key={s.slug} className="h-auto">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 p-7 md:p-8 bg-bg border border-rule rounded-xl group h-full"
              >
                <span className="text-2xl text-accent" aria-hidden="true">{s.icon}</span>
                <div>
                  <p className="text-[11px] font-mono tracking-[0.12em] text-mute uppercase">{s.short}</p>
                  <h3 className="font-display font-bold text-[22px] tracking-[-0.02em] text-ink mt-1">
                    {s.name}
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.65] text-mute flex-1">{s.description}</p>
                <Link
                  href={`/servicos/${s.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent hover:gap-3 transition-all"
                >
                  Explorar
                  <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
