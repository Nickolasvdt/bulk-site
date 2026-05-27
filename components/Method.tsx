"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SplitText } from "@/components/ui/SplitText";

const steps = [
  {
    id: "diagnostico",
    num: "01",
    label: "Diagnóstico",
    title: "Entendemos seu negócio antes de criar qualquer coisa.",
    desc: "Região, concorrência, cliente ideal e o que já tá funcionando. Nada de site genérico — cada projeto começa com uma análise real.",
  },
  {
    id: "site",
    num: "02",
    label: "Site",
    title: "Profissional, rápido e feito pra aparecer no Google.",
    desc: "Design sob medida, mobile-first, velocidade máxima. No ar em 7 dias. Sem template de agência, sem parecer site de 2015.",
  },
  {
    id: "whatsapp",
    num: "03",
    label: "IA no WhatsApp",
    title: "Atendimento 24h sem você precisar estar disponível.",
    desc: "Agente de IA que responde, qualifica e agenda pelo WhatsApp. Domingo às 23h, o cliente manda mensagem — a IA atende.",
  },
  {
    id: "google",
    num: "04",
    label: "Google",
    title: "Primeiro resultado quando alguém pesquisa perto de você.",
    desc: "Google Meu Negócio configurado, otimizado e com fotos. Quando o cliente pesquisa 'barbearia perto de mim', você aparece.",
  },
  {
    id: "manutencao",
    num: "05",
    label: "Manutenção",
    title: "A gente cuida de tudo — você foca no seu negócio.",
    desc: "Atualizações mensais, relatório de visitas, ajustes de conteúdo. Nada quebrado, nada desatualizado, nada pra você resolver.",
  },
];

export function Method() {
  const [active, setActive] = useState("diagnostico");

  return (
    <section id="metodo" className="py-14 md:py-24 px-6 md:px-10">
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 mb-10 md:mb-16">
        <p className="col-span-12 txt-eyebrow text-mute mb-6">
          Como funciona
        </p>
        <h2 className="col-span-12 md:col-span-10 txt-display text-[9vw] md:text-[6vw]">
          <SplitText text="Cinco passos." />
          <br />
          <SplitText text="Um negócio encontrado." italic delay={0.2} />
        </h2>
        <p className="col-span-12 md:col-start-1 md:col-span-5 mt-5 md:mt-8 text-[15px] leading-[1.45] text-mute">
          Não tem segredo — tem execução. A diferença entre negócio local que
          cresce e o que fica esperando cliente é estar onde o cliente pesquisa.
        </p>
      </div>

      <div>
        {steps.map((step) => {
          const isActive = step.id === active;
          return (
            <button
              key={step.id}
              onClick={() => setActive(step.id)}
              className={`group text-left w-full py-4 md:py-5 rule-b transition-all ${
                isActive ? "" : "opacity-50 hover:opacity-100"
              }`}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className={`font-display text-[28px] md:text-[38px] leading-none tracking-tightest transition-colors ${
                    isActive ? "text-accent" : "text-mute"
                  }`}
                >
                  {step.num}
                </span>
                <span className="font-display text-[20px] md:text-[26px] leading-none tracking-tight2">
                  {step.label}
                </span>
                <motion.span
                  initial={false}
                  animate={{ x: isActive ? 0 : -8, opacity: isActive ? 1 : 0 }}
                  className="ml-auto font-mono text-[11px] tracking-wider2 uppercase text-accent"
                >
                  ATIVO →
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pl-1 max-w-[600px]">
                      <p className="font-display italic text-[17px] md:text-[20px] leading-[1.15] tracking-tight2 mb-2">
                        {step.title}
                      </p>
                      <p className="text-[13px] leading-[1.5] text-mute">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </section>
  );
}
