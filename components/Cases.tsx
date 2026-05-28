"use client";

import { motion } from "motion/react";
import Image from "next/image";

const cases = [
  {
    quote: "Antes não tinha site e atendia WhatsApp na mão. Hoje o agente agenda sozinho e o site aparece quando alguém pesquisa barbearia aqui no bairro. Semana já começa com agenda cheia.",
    name: "Carlos S.",
    role: "Barbearia CS · São Paulo",
    metric: "Agenda cheia",
    photo: "https://plus.unsplash.com/premium_photo-1661391316543-9c40ae315a4a?auto=format&fit=crop&w=600&q=80",
  },
  {
    quote: "Minha loja ficava invisível no Google. Depois que a Bulk configurou o Google Meu Negócio, o cliente que precisa me acha sozinho. Não dependo mais só do boca a boca.",
    name: "Ana Lima",
    role: "Moda Lima · Interior SP",
    metric: "Pág. 1",
    photo: "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=600&q=80",
  },
  {
    quote: "Tinha perfil no Instagram mas não aparecia no Google. Depois da Bulk, meu restaurante aparece quando alguém pesquisa aqui no bairro. O movimento cresceu muito nos fins de semana.",
    name: "Roberto M.",
    role: "Sabores do Bairro · Osasco",
    metric: "+3× clientes",
    photo: "https://images.unsplash.com/photo-1758519291037-db9ec86cda69?auto=format&fit=crop&w=600&q=80",
  },
];

export function Cases() {
  return (
    <section id="casos" className="py-16 md:py-24 bg-ink/[0.025]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2"
        >
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
              O que dizem
            </p>
            <h2 className="font-display font-semibold text-[clamp(24px,3.2vw,38px)] leading-[1.05] tracking-[-0.025em]">
              Gente real.<br />Resultado real.
            </h2>
          </div>
          <p className="text-[13px] leading-[1.65] text-mute max-w-[300px]">
            Negócios que decidiram parar de esperar e começaram a aparecer.
          </p>
        </motion.div>

        {/* Depoimentos — layout aberto, estilo revista */}
        <div>
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row gap-8 md:gap-12 py-12 border-b border-ink/[0.08] last:border-0 items-start"
            >
              {/* Foto orgânica */}
              <div className="relative w-[160px] h-[200px] md:w-[200px] md:h-[250px] rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={c.photo}
                  alt={c.name}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>

              {/* Quote + atribuição */}
              <div className="flex-1 flex flex-col justify-between gap-8 md:py-2">
                <p className="font-display text-[clamp(17px,2.2vw,24px)] leading-[1.4] text-ink/75 italic tracking-[-0.01em]">
                  "{c.quote}"
                </p>

                <div className="flex items-end justify-between border-t border-ink/[0.07] pt-5">
                  <div>
                    <p className="text-[13px] font-medium text-ink">{c.name}</p>
                    <p className="text-[11px] text-mute mt-0.5">{c.role}</p>
                  </div>
                  <div className="font-display font-semibold text-[clamp(22px,3vw,32px)] text-accent leading-none tracking-[-0.02em]">
                    {c.metric}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
