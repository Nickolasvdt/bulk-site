"use client";

import { motion } from "motion/react";

const cases = [
  {
    quote: "Antes não tinha site e atendia WhatsApp na mão. Hoje o agente agenda sozinho e o site aparece quando alguém pesquisa barbearia aqui no bairro. Semana já começa com agenda cheia.",
    name: "Carlos S.",
    role: "Barbearia CS · São Paulo",
    metric: "Agenda cheia",
  },
  {
    quote: "Minha loja ficava invisível no Google. Depois que a Bulk configurou o Google Meu Negócio, o cliente que precisa me acha sozinho. Não dependo mais só do boca a boca.",
    name: "Ana Lima",
    role: "Moda Lima · Interior SP",
    metric: "Pág. 1",
  },
];

export function Cases() {
  return (
    <section id="casos" className="py-16 md:py-24 bg-ink/[0.025]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-10"
        >
          O que dizem
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-bg rounded-xl p-7 flex flex-col justify-between gap-10
                         hover:-translate-y-1 transition-transform duration-200 ease-out"
            >
              <p className="text-[14px] leading-[1.7] text-ink/60">
                "{c.quote}"
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[13px] font-medium">{c.name}</p>
                  <p className="text-[11px] text-mute mt-0.5">{c.role}</p>
                </div>
                <span className="font-display font-semibold text-[20px] leading-none tracking-[-0.02em] text-accent">
                  {c.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
