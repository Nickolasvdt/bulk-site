"use client";

import { motion } from "motion/react";

const features = [
  {
    stat: "7 dias",
    tag: "Site profissional",
    desc: "Design sob medida, mobile-first, velocidade máxima. No ar em 7 dias, com domínio e hospedagem inclusos.",
  },
  {
    stat: "24h",
    tag: "IA no WhatsApp",
    desc: "Agente que responde, qualifica e agenda pelo WhatsApp. Domingo às 23h, o cliente manda mensagem — a IA atende.",
  },
  {
    stat: "Pág. 1",
    tag: "Google Meu Negócio",
    desc: "Configurado e otimizado. Quando alguém pesquisa o seu serviço perto de você, você aparece primeiro.",
  },
];

export function Features() {
  return (
    <section id="como-funciona" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Header animado */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10"
        >
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
              O que você recebe
            </p>
            <h2 className="font-display font-semibold text-[clamp(26px,3.5vw,42px)] leading-[1.05] tracking-[-0.025em]">
              Tudo que seu<br />negócio precisa.
            </h2>
          </div>
          <p className="text-[13px] leading-[1.65] text-mute max-w-[320px]">
            Não tem segredo — tem execução. A diferença entre o negócio que cresce e o que fica esperando cliente.
          </p>
        </motion.div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="bg-ink/[0.04] rounded-xl p-6 flex flex-col justify-between gap-10
                         hover:-translate-y-1 transition-transform duration-200 ease-out"
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-mute">{f.tag}</span>
                <span className="font-display font-semibold text-[28px] leading-none tracking-[-0.03em] text-accent">{f.stat}</span>
              </div>
              <p className="text-[13px] leading-[1.65] text-mute">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Manutenção */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 bg-ink text-bg rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4
                     hover:-translate-y-0.5 transition-transform duration-200 ease-out"
        >
          <div className="flex items-center gap-4">
            <span className="font-display font-semibold text-[24px] leading-none text-accent shrink-0">+</span>
            <div>
              <p className="text-[14px] font-medium">Manutenção mensal inclusa</p>
              <p className="text-[12px] text-bg/40 mt-0.5">Atualizações, relatório mensal, suporte. Nada quebrado, nada desatualizado.</p>
            </div>
          </div>
          <a href="#planos" className="shrink-0 text-[11px] font-mono tracking-[0.14em] uppercase text-bg/35 hover:text-bg transition-colors">
            Ver planos →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
