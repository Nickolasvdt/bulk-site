"use client";

import { motion } from "motion/react";
import Image from "next/image";

const features = [
  {
    stat: "7 dias",
    tag: "Site profissional",
    desc: "Design sob medida, mobile-first, velocidade máxima. No ar em 7 dias, com domínio e hospedagem inclusos.",
    photo: "https://plus.unsplash.com/premium_photo-1661766521984-e7469a450b6f?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Dona de cafeteria sorrindo na porta do negócio",
  },
  {
    stat: "24h",
    tag: "IA no WhatsApp",
    desc: "Agente que responde, qualifica e agenda pelo WhatsApp. Domingo às 23h, o cliente manda mensagem — a IA atende.",
    photo: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Empreendedor sorrindo ao ver mensagens no celular",
  },
  {
    stat: "Pág. 1",
    tag: "Google Meu Negócio",
    desc: "Configurado e otimizado. Quando alguém pesquisa o seu serviço perto de você, você aparece primeiro.",
    photo: "https://plus.unsplash.com/premium_photo-1682088367648-735b1a6ac612?auto=format&fit=crop&w=800&q=80",
    photoAlt: "Proprietária de loja preparando pedidos com satisfação",
  },
];

export function Features() {
  return (
    <section id="como-funciona" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-4"
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

        {/* Alternating feature rows — sem cards */}
        <div>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
                items-center gap-10 md:gap-16 py-14 border-b border-ink/[0.07] last:border-0`}
            >
              {/* Foto */}
              <div className="relative w-full md:w-[46%] aspect-[4/3] rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={f.photo}
                  alt={f.photoAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 46vw"
                />
              </div>

              {/* Conteúdo */}
              <div className="flex-1">
                <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-mute">
                  {f.tag}
                </span>
                <div className="font-display font-semibold text-[clamp(48px,6vw,80px)] leading-none tracking-[-0.04em] text-accent mt-3 mb-5">
                  {f.stat}
                </div>
                <p className="text-[15px] leading-[1.65] text-mute max-w-[360px]">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Manutenção */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 bg-accent text-bg rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="font-display font-semibold text-[24px] leading-none text-bg/50 shrink-0">+</span>
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
