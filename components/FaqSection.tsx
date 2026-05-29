"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const faqs = [
  {
    q: "O que é a Bulk?",
    a: "A Bulk é uma agência digital focada em negócios locais em São Paulo. Ajudamos barbearias, restaurantes, salões, lojas e prestadores de serviço a aparecerem online, serem encontrados no Google e atenderem clientes automaticamente pelo WhatsApp.",
  },
  {
    q: "Quanto tempo leva para o site ficar no ar?",
    a: "Nosso prazo padrão é 7 dias corridos após aprovação do briefing e pagamento. Entregamos design sob medida, mobile-first, com domínio e hospedagem inclusos e já otimizado para o Google.",
  },
  {
    q: "A IA no WhatsApp substitui meu atendente humano?",
    a: "Não substitui — ela complementa. A IA cuida do primeiro contato: responde perguntas frequentes, qualifica o interesse do cliente e agenda. Para atendimentos mais complexos, ela transfere para você ou seu time. Domingo às 23h, quando ninguém está disponível, ela atende.",
  },
  {
    q: "O Google Meu Negócio funciona para qualquer tipo de negócio?",
    a: "Funciona para qualquer negócio com endereço físico ou que atenda clientes em uma área geográfica definida. Barbearias, restaurantes, salões, clínicas, lojas, academias, oficinas — todos se beneficiam diretamente.",
  },
  {
    q: "Quais tipos de negócio a Bulk atende?",
    a: "Atendemos principalmente negócios locais em São Paulo: barbearias, salões de beleza, restaurantes e cafeterias, lojas físicas, clínicas e consultórios, academias, oficinas mecânicas e prestadores de serviços em geral.",
  },
  {
    q: "A manutenção mensal está inclusa nos planos?",
    a: "Sim. Todos os nossos planos incluem manutenção mensal: atualizações de segurança, relatório de desempenho, pequenas alterações de conteúdo e suporte prioritário. Seu site nunca fica desatualizado ou quebrado.",
  },
  {
    q: "Como funciona o suporte?",
    a: "Atendemos por WhatsApp e e-mail. Para clientes com plano ativo, o suporte é prioritário com resposta em até 2 horas úteis. Emergências (site fora do ar) têm resposta em até 1 hora.",
  },
  {
    q: "Qual é o investimento?",
    a: "Nossos planos começam a partir de R$297/mês para o plano básico de site + manutenção. O plano completo (site + IA + Google + manutenção) tem condições especiais. Fale com a gente para um diagnóstico gratuito e proposta personalizada.",
  },
  {
    q: "Vocês atendem negócios fora de São Paulo?",
    a: "Principalmente atendemos negócios em São Paulo e Grande SP. Para cidades do interior de SP e outros estados, avaliamos caso a caso. O contato inicial é gratuito — agende um diagnóstico.",
  },
  {
    q: "Como entrar em contato com a Bulk?",
    a: "Você pode falar conosco pelo botão de WhatsApp no canto da tela, pelo formulário de contato aqui no site, ou pelo e-mail contato@bulkstudio.com.br. Respondemos em até 4 horas em dias úteis.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
            Dúvidas frequentes
          </p>
          <h2 className="font-display font-semibold text-[clamp(24px,3.2vw,40px)] leading-[1.05] tracking-[-0.025em]">
            Dúvidas mais{" "}
            <span className="font-display italic text-accent">frequentes.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-rule">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                aria-expanded={open === i}
              >
                <span className="font-medium text-[15px] text-ink group-hover:text-accent transition-colors">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-mute shrink-0"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[14px] text-mute leading-[1.7]">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
