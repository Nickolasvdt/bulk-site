"use client";

import { motion } from "motion/react";
import { SplitText } from "@/components/ui/SplitText";

const differentials = [
  {
    num: "7 dias",
    label: "Site no ar",
    note: "Do briefing ao site publicado. Sem enrolação, sem desculpa de prazo. Você aprova, a gente publica.",
    accent: true,
    italic: false,
  },
  {
    num: "24h",
    label: "IA atendendo",
    note: "Seu atendente não dorme, não falta, não some. Responde em segundos — domingo às 23h, feriado, qualquer hora.",
    accent: false,
    italic: true,
  },
  {
    num: "Pág. 1",
    label: "Google Meu Negócio",
    note: "Configuração e otimização pra aparecer quando o cliente pesquisa perto de você. Não só existir — aparecer.",
    accent: false,
    italic: false,
  },
  {
    num: "Inclusa",
    label: "Manutenção mensal",
    note: "Nada quebrado, nada desatualizado. Atualizações, conteúdo, relatório todo mês. A gente cuida — você fatura.",
    accent: false,
    italic: true,
  },
];

export function Results() {
  return (
    <section id="resultados" className="py-14 md:py-24 px-6 md:px-10 bg-ink text-bg">
      {/* Header */}
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 mb-10 md:mb-16">
        <p className="col-span-12 txt-eyebrow text-mute mb-6">O que você recebe</p>
        <h2 className="col-span-12 md:col-span-11 txt-display text-[9vw] md:text-[6vw]">
          <SplitText text="Tudo que seu" />
          <br />
          <SplitText text="negócio precisa." italic delay={0.2} />
        </h2>
      </div>

      {/* Editorial rows */}
      <div className="rule-t border-bg/10">
        {differentials.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-12 gap-x-4 md:gap-x-6 py-7 md:py-10 border-b border-bg/10 items-baseline"
          >
            {/* Index */}
            <div className="hidden md:block col-span-1 font-mono text-[11px] tracking-wider2 uppercase text-bg/30 self-start pt-2">
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Big value */}
            <div
              className={`col-span-12 md:col-span-4 font-display leading-[0.85] tracking-tightest ${
                s.italic ? "italic" : ""
              } ${s.accent ? "text-accent" : "text-bg"}`}
              style={{ fontSize: "clamp(52px, 6vw, 100px)" }}
            >
              {s.num}
            </div>

            {/* Label */}
            <div className="col-span-12 md:col-span-4 mt-4 md:mt-0">
              <p className="font-display text-[18px] md:text-[22px] leading-[1.15] tracking-tight2 text-bg">
                {s.label}
              </p>
            </div>

            {/* Note */}
            <div className="col-span-12 md:col-span-3 mt-3 md:mt-0 md:text-right">
              <p className="text-[13px] md:text-[14px] leading-[1.55] text-bg/50">
                {s.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer strip */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-wider2 uppercase text-bg/30">
        <span>TUDO EM UM ÚNICO PLANO MENSAL</span>
        <span className="hidden md:inline">SEM CONTRATO DE FIDELIDADE · CANCELE QUANDO QUISER</span>
        <span>04 / 04</span>
      </div>
    </section>
  );
}
