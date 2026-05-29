"use client";
import { Reveal } from "@/components/ui/Reveal";
import { LogosMarquee } from "@/components/ui/LogosMarquee";

export function CasesSection() {
  return (
    <section id="casos" className="py-24 md:py-32 bg-bg border-y border-rule">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <p className="txt-eyebrow text-accent mb-3 text-center">Confiança</p>
          <h2 className="txt-display text-3xl md:text-5xl text-ink mb-4 text-center">
            Marcas com quem já trabalhamos
          </h2>
          <p className="text-mute text-center max-w-2xl mx-auto mb-16">
            Negócios que contaram com a Bulk para construir e crescer a sua presença digital.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="py-6">
            <LogosMarquee />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
