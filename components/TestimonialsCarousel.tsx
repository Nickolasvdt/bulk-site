"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Carlos S.",
    role: "Barbearia CS · São Paulo",
    quote: "Antes não tinha site e atendia WhatsApp na mão. Hoje o agente agenda sozinho e o site aparece quando alguém pesquisa barbearia aqui no bairro. Semana já começa com agenda cheia.",
    image: "https://plus.unsplash.com/premium_photo-1661391316543-9c40ae315a4a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ana Lima",
    role: "Moda Lima · Interior SP",
    quote: "Minha loja ficava invisível no Google. Depois que a Bulk configurou o Google Meu Negócio, o cliente que precisa me acha sozinho. Não dependo mais só do boca a boca.",
    image: "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Roberto M.",
    role: "Sabores do Bairro · Osasco",
    quote: "Tinha perfil no Instagram mas não aparecia no Google. Depois da Bulk, meu restaurante aparece quando alguém pesquisa aqui no bairro. O movimento cresceu muito nos fins de semana.",
    image: "https://images.unsplash.com/photo-1758519291037-db9ec86cda69?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fernanda O.",
    role: "Studio Fernanda · São Paulo",
    quote: "Meu salão dobrou o número de clientes novos em 3 meses. A IA no WhatsApp atende enquanto eu trabalho e o site aparece no mapa quando buscam salão perto daqui.",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80",
  },
];

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const n = testimonials.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + n) % n), [n]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % n), [n]);

  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    setDragging(true);
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!dragging) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setDragging(false);
  };
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  return (
    <section className="bg-ink/[0.025] py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
            O que dizem
          </p>
          <h2 className="font-display font-semibold text-[clamp(24px,3vw,40px)] leading-[1.05] tracking-[-0.025em]">
            Depoimentos de quem{" "}
            <span className="font-display italic text-accent">viveu a experiência Bulk.</span>
          </h2>
          <p className="text-[13px] text-mute mt-3">
            Negócios que decidiram parar de esperar e começaram a aparecer.
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center justify-center gap-4 overflow-hidden">
            {[-1, 0, 1].map((offset) => {
              const idx = (current + offset + n) % n;
              const t = testimonials[idx];
              const isActive = offset === 0;
              return (
                <motion.div
                  key={`${idx}-${offset}`}
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.5,
                    filter: isActive ? "blur(0px)" : "blur(1.5px)",
                  }}
                  transition={{ duration: 0.35 }}
                  className={`flex-shrink-0 w-[clamp(220px,30vw,420px)] ${
                    offset !== 0 ? "hidden sm:block" : ""
                  }`}
                >
                  <div className="rounded-2xl overflow-hidden bg-bg border border-rule">
                    {/* Photo */}
                    <div className="relative aspect-video">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="420px"
                      />
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-ink/40 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[20px] border-l-bg border-y-[12px] border-y-transparent ml-1.5" />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-4 text-center">
                      <p className="font-semibold text-[15px] text-ink">{t.name}</p>
                      <p className="text-[12px] text-mute mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors z-10 hidden md:flex"
            aria-label="Anterior"
          >
            <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-sun transition-colors z-10 hidden md:flex"
            aria-label="Próximo"
          >
            <svg className="w-4 h-4 text-bg" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-accent" : "w-2 bg-ink/20"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="#casos"
            className="text-[12px] font-mono tracking-[0.14em] uppercase text-mute hover:text-accent transition-colors"
          >
            Ver todos os depoimentos →
          </a>
        </div>
      </div>
    </section>
  );
}

