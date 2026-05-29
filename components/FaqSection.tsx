"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

const faqs = [
  {
    q: "Como eu começo? Qual o primeiro passo?",
    a: "É simples e sem compromisso: você agenda um diagnóstico gratuito (pelo botão 'Agendar diagnóstico' ou pelo WhatsApp). A gente entende o seu negócio, mostra onde estão as oportunidades e monta uma proposta sob medida. Você só decide seguir se fizer sentido.",
  },
  {
    q: "Quanto custa? Qual o investimento?",
    a: "Não trabalhamos com pacotes engessados — cada negócio é único, então o valor depende do que você precisa. No diagnóstico gratuito montamos uma proposta sob medida, transparente, com o escopo e o investimento certos para o seu momento. Sem surpresa e sem pagar pelo que não vai usar.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Trabalhamos com as formas mais comuns (Pix, cartão e boleto), e os detalhes ficam definidos na proposta. Serviços contínuos, como manutenção e gestão de tráfego, são mensais; projetos pontuais, como um site, têm condições próprias.",
  },
  {
    q: "Quanto tempo leva para o meu site ficar no ar?",
    a: "O prazo padrão é de 7 dias corridos após a aprovação do briefing e o envio do conteúdo. Entregamos um site sob medida, mobile-first, com domínio e hospedagem inclusos e já otimizado para o Google.",
  },
  {
    q: "Preciso entender de tecnologia para trabalhar com vocês?",
    a: "Não. A gente cuida da parte técnica de ponta a ponta — site, domínio, hospedagem, Google, automações. Você foca no seu negócio e fala com a gente em português, sem jargão. Quando precisar mudar algo, é só pedir no WhatsApp.",
  },
  {
    q: "O site é meu? Fico com o domínio?",
    a: "Sim. O domínio e o site são do seu negócio. A gente configura e cuida de tudo para você, mas a propriedade é sua — sem amarras.",
  },
  {
    q: "Existe fidelidade ou contrato longo?",
    a: "Serviços pontuais, como a criação do site, não têm fidelidade. Serviços contínuos (manutenção, tráfego, social media) são mensais e você pode ajustar conforme o resultado. A ideia é continuar pela entrega, não por amarra contratual.",
  },
  {
    q: "A IA no WhatsApp substitui meu atendente humano?",
    a: "Não substitui — complementa. A IA cuida do primeiro contato: responde dúvidas frequentes, qualifica o cliente e agenda. O que exige toque humano, ela passa para você ou seu time. E no domingo às 23h, quando ninguém está disponível, ela continua atendendo e captando cliente.",
  },
  {
    q: "O Google Meu Negócio funciona para o meu tipo de negócio?",
    a: "Funciona para praticamente qualquer negócio com endereço físico ou que atenda uma região definida — barbearias, restaurantes, salões, clínicas, lojas, academias, oficinas e prestadores de serviço. É um dos jeitos mais rápidos de ser encontrado por quem já procura você na vizinhança.",
  },
  {
    q: "Quais tipos de negócio a Bulk atende?",
    a: "Negócios locais em geral: beleza, alimentação, varejo, saúde, fitness, automotivo e serviços. Se o seu cliente procura você na internet ou no Google, a gente ajuda você a aparecer e converter.",
  },
  {
    q: "Como funciona a manutenção e o suporte?",
    a: "A manutenção mensal mantém seu site seguro, atualizado e no ar, com relatório e pequenas alterações inclusas. O suporte é por WhatsApp e e-mail, com prioridade para clientes ativos — emergências, como site fora do ar, têm atendimento rápido.",
  },
  {
    q: "E se eu não souber de qual serviço preciso?",
    a: "Tudo bem — a maioria dos clientes começa assim. No diagnóstico gratuito a gente analisa seu cenário e recomenda só o que vai trazer resultado, na ordem certa. Sem empurrar serviço que você não precisa.",
  },
  {
    q: "Vocês atendem negócios fora de São Paulo?",
    a: "Nosso foco é São Paulo e a Grande SP, mas grande parte do que fazemos (site, tráfego, social media, IA) é 100% remoto e atende qualquer região. Para fora de SP, avaliamos caso a caso — o diagnóstico é gratuito.",
  },
  {
    q: "Como falo com a Bulk agora?",
    a: "Clique em 'Agendar diagnóstico' aqui no site, fale no botão de WhatsApp no canto da tela ou escreva para contato@bulkstudio.com.br. Respondemos rápido em dias úteis.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-bg py-16 md:py-24">
      <JsonLd data={faqSchema(faqs.map((f) => ({ q: f.q, a: f.a })))} />
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
