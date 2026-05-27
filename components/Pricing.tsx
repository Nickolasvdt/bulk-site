"use client";

import { motion } from "motion/react";

const tiers = [
  {
    name: "Essencial",
    desc: "Site profissional no ar em 7 dias.",
    scope: "Site · domínio · hospedagem",
    guarantee: "Site no ar ou não cobramos",
    features: [
      "Design personalizado, mobile-first",
      "Formulário de contato e link WhatsApp",
      "Domínio + hospedagem inclusos",
    ],
    recommended: false,
  },
  {
    name: "Presença",
    desc: "Apareça no Google. Nunca perca um cliente.",
    scope: "Site · Google · IA no WhatsApp",
    guarantee: "Na busca local em 30 dias",
    features: [
      "Tudo do Essencial",
      "Google Meu Negócio configurado e otimizado",
      "Agente de IA no WhatsApp 24h",
    ],
    recommended: true,
  },
  {
    name: "Completo",
    desc: "Cresça todo mês sem pensar no digital.",
    scope: "Site · Google · IA · manutenção",
    guarantee: "Crescimento mensal garantido",
    features: [
      "Tudo do Presença",
      "Manutenção e atualizações mensais",
      "Relatório de performance todo mês",
    ],
    recommended: false,
  },
];

export function Pricing() {
  return (
    <section id="planos" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">Planos</p>
            <h2 className="font-display font-semibold text-[clamp(26px,3.5vw,42px)] leading-[1.05] tracking-[-0.025em]">
              Valores sob consulta.
            </h2>
          </div>
          <p className="text-[13px] text-mute max-w-[280px]">
            Sem contrato de fidelidade. Proposta em 24h. Cancele quando quiser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tiers.map((tier, i) => (
            <motion.a
              key={tier.name}
              href="#contato"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-xl p-6 flex flex-col gap-6 transition-all duration-200 cursor-pointer
                ${tier.recommended
                  ? "bg-ink text-bg hover:-translate-y-1"
                  : "bg-ink/[0.04] hover:bg-ink/[0.07] hover:-translate-y-1"
                }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <p className={`text-[10px] font-mono tracking-[0.16em] uppercase leading-relaxed ${tier.recommended ? "text-bg/35" : "text-mute"}`}>
                    {tier.scope}
                  </p>
                  {tier.recommended && (
                    <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-accent shrink-0">★ Melhor</span>
                  )}
                </div>
                <h3 className="font-display font-semibold text-[20px] tracking-[-0.02em] leading-none">
                  {tier.name}
                </h3>
                <p className={`mt-2 text-[13px] leading-[1.5] ${tier.recommended ? "text-bg/45" : "text-mute"}`}>
                  {tier.desc}
                </p>
              </div>

              <ul className="space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-[12px] ${tier.recommended ? "text-bg/55" : "text-mute"}`}>
                    <span className="text-accent mt-px shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div>
                <p className={`font-display italic text-[12px] mb-4 ${tier.recommended ? "text-bg/50" : "text-ink/40"}`}>
                  "{tier.guarantee}"
                </p>
                <div className={`text-center py-2.5 rounded-md text-[12px] font-medium transition-colors duration-150
                  ${tier.recommended
                    ? "bg-bg text-ink hover:bg-accent hover:text-bg"
                    : "bg-ink text-bg hover:bg-accent"
                  }`}>
                  Solicitar proposta →
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-5 text-center text-[11px] text-mute"
        >
          Todos os planos incluem domínio, hospedagem e suporte via WhatsApp.
        </motion.p>
      </div>
    </section>
  );
}
