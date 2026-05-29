"use client";
import { Reveal } from "@/components/ui/Reveal";

const ACHIEVEMENTS = [
  { label: "Dezenas de sites criados", sub: "negócios locais no ar e vendendo" },
  { label: "Empresas com Google Meu Negócio configurado", sub: "mais visíveis na busca local" },
  { label: "Atendimentos automatizados no WhatsApp", sub: "com agentes de IA respondendo 24h" },
  { label: "Campanhas de tráfego ativas", sub: "trazendo o cliente certo" },
];

export function CasesSection() {
  return (
    <section id="casos" className="py-20 md:py-28 bg-bg">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <p className="txt-eyebrow text-accent mb-3">Resultados</p>
          <h2 className="txt-display text-3xl md:text-5xl text-ink mb-4">
            Trabalho que aparece no dia a dia do negócio
          </h2>
          <p className="text-mute max-w-2xl mb-12">
            Estamos construindo nossa vitrine de cases. Enquanto isso, veja o que já entregamos
            e um projeto de referência no ar.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <div className="h-full p-6 rounded-2xl border border-rule bg-bg hover:border-accent transition">
                <p className="txt-display text-xl text-ink mb-2">{a.label}</p>
                <p className="text-mute text-sm">{a.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <a
            href="https://trigueirotech.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-5 p-8 rounded-2xl bg-dark text-bg"
          >
            <div>
              <p className="txt-eyebrow text-bg/60 mb-2">Projeto de referência</p>
              <p className="txt-display text-2xl md:text-3xl">Trigueiro Tech</p>
              <p className="text-bg/70 mt-1">
                Site profissional no ar — um exemplo do nosso padrão de entrega.
              </p>
            </div>
            <span className="shrink-0 min-h-[48px] inline-flex items-center px-6 rounded-full bg-accent text-bg font-semibold group-hover:bg-sun transition">
              Ver site →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
