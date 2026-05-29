import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/site-config";
import { OrcamentoCta } from "./orcamento-cta";

export const metadata: Metadata = {
  title: "Solicitar orçamento",
  description:
    "Conte sobre seu negócio e receba um orçamento sob medida da Bulk. Não trabalhamos com pacotes engessados — cada projeto é único.",
  alternates: { canonical: "/orcamento" },
};

export default function Orcamento() {
  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 md:px-8 text-center">
        <p className="txt-eyebrow text-accent mb-3">Orçamento sob medida</p>
        <h1 className="txt-display text-4xl md:text-6xl text-ink mb-5">Solicitar orçamento</h1>
        <p className="text-lg text-mute mb-8 leading-relaxed">
          Cada negócio é único — por isso não trabalhamos com pacotes engessados. Conte o que
          você precisa e montamos uma proposta sob medida, com diagnóstico gratuito antes de
          qualquer decisão.
        </p>
        <OrcamentoCta />

        <div className="mt-16 pt-8 border-t border-rule text-left">
          <p className="txt-eyebrow text-mute mb-4">O que podemos fazer por você</p>
          <ul className="flex flex-wrap gap-3 justify-center md:justify-start">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicos/${s.slug}`}
                  className="inline-block px-4 py-2 rounded-full border border-rule text-ink hover:border-accent hover:text-accent transition"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
