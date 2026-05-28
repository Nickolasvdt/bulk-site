"use client";

import { motion } from "motion/react";
import Image from "next/image";

const PHOTO_A = "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=600&q=80";
const PHOTO_B = "https://plus.unsplash.com/premium_photo-1661583828844-60d0cfbb8ccf?auto=format&fit=crop&w=400&q=80";
const PHOTO_C = "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=400&q=80";

const stats = [
  { value: "7 dias", label: "Site no ar" },
  { value: "24h", label: "IA atendendo" },
  { value: "Pág. 1", label: "Google local" },
  { value: "Inclusa", label: "Manutenção" },
];

export function Hero() {
  return (
    <section className="bg-ink text-bg flex-1 flex flex-col justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 pt-20 pb-12 md:pt-24 md:pb-14">

        {/* Main content row */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-10">

          {/* Left: text */}
          <div className="flex-1 lg:pt-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-[11px] font-mono tracking-[0.2em] uppercase text-bg/30 mb-8"
            >
              Agência digital <span className="text-accent">·</span> São Paulo
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-semibold text-[clamp(36px,5vw,62px)] leading-[0.93] tracking-[-0.03em] max-w-lg"
            >
              Presença digital<br />
              <span className="italic text-accent">que vende</span><br />
              todo dia.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-7 text-[14px] leading-[1.65] text-bg/55 max-w-[340px]"
            >
              Site profissional, IA no WhatsApp e Google Meu Negócio.
              Negócios como o seu, encontrados e faturando todo dia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#contato"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1.5 bg-accent text-bg px-5 py-2.5 rounded-md text-[13px] font-medium hover:bg-[#420000] transition-colors"
              >
                Agendar diagnóstico →
              </motion.a>
              <a href="#como-funciona" className="text-[12px] text-bg/30 hover:text-accent transition-colors">
                Como funciona ↓
              </a>
            </motion.div>
          </div>

          {/* Right: photo collage — desktop only */}
          <motion.div
            className="hidden lg:block relative shrink-0"
            style={{ width: 390, height: 430 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            {/* Photo A — tall, left column */}
            <motion.div
              className="absolute left-0 top-0 rounded-2xl overflow-hidden"
              style={{ width: "54%", height: "100%" }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={PHOTO_A}
                alt="Dona de negócio local sorrindo na porta do seu estabelecimento"
                fill
                className="object-cover"
                sizes="210px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent pointer-events-none" />
            </motion.div>

            {/* Photo B — top right */}
            <motion.div
              className="absolute right-0 top-0 rounded-2xl overflow-hidden"
              style={{
                width: "43%",
                height: "47%",
                transform: "rotate(1.8deg)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={PHOTO_B}
                alt="Barbeiro profissional atendendo cliente"
                fill
                className="object-cover"
                sizes="168px"
                priority
              />
            </motion.div>

            {/* Photo C — bottom right */}
            <motion.div
              className="absolute right-0 bottom-0 rounded-2xl overflow-hidden"
              style={{
                width: "43%",
                height: "47%",
                transform: "rotate(-1.8deg)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.84, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={PHOTO_C}
                alt="Empreendedor sorrindo ao ver resultado no celular"
                fill
                className="object-cover"
                sizes="168px"
                priority
              />
            </motion.div>

            {/* Floating badge — between the photos */}
            <motion.div
              className="absolute z-20 bg-bg/95 backdrop-blur-sm rounded-xl px-3.5 py-2.5 shadow-2xl"
              style={{ left: "49%", top: "45%", transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-ink/50">Site entregue</span>
              </div>
              <p className="text-[13px] font-semibold text-ink mt-0.5 leading-none">em 7 dias ✓</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-14 md:mt-16 pt-6 border-t border-accent/25 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-display font-semibold text-[26px] md:text-[30px] leading-none tracking-[-0.03em] text-accent">
                {s.value}
              </div>
              <div className="mt-1.5 text-[10px] font-mono tracking-[0.16em] uppercase text-bg/30">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
