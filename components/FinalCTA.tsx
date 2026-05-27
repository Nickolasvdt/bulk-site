"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function FinalCTA() {
  return (
    <section id="contato" className="py-16 md:py-24 bg-ink text-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-bg/25 mb-8">
              Próximo passo
            </p>
            <h2 className="font-display font-semibold text-[clamp(28px,4vw,52px)] leading-[1.0] tracking-[-0.025em]">
              Bora colocar seu<br />negócio no mapa?
            </h2>
            <p className="mt-5 text-[14px] leading-[1.65] text-bg/40 max-w-[360px]">
              15 minutos de diagnóstico. A gente analisa seu negócio, sua região e sua concorrência — de graça.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/5511999287779"
                className="inline-flex items-center gap-1.5 bg-bg text-ink px-5 py-2.5 rounded-md text-[13px] font-medium hover:bg-accent hover:text-bg transition-colors"
              >
                Falar no WhatsApp →
              </a>
              <a
                href="mailto:bulkstudio1@gmail.com"
                className="text-[12px] text-bg/30 hover:text-bg/55 transition-colors underline underline-offset-4"
              >
                ou envie um e-mail
              </a>
            </div>
          </motion.div>

          <div className="flex flex-col items-start md:items-end gap-5 shrink-0">
            {/* Lifestyle photo */}
            <motion.div
              className="hidden md:block relative w-[210px] h-[270px] rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/cta-lifestyle.jpg"
                alt="Pessoa trabalhando com ferramentas digitais"
                fill
                className="object-cover"
                sizes="210px"
              />
              {/* Subtle warm vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent pointer-events-none" />
            </motion.div>

            {/* Info text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-[10px] tracking-[0.16em] uppercase text-bg/25 space-y-2.5 md:text-right"
            >
              <div>Resposta em até 4h úteis</div>
              <div>Seg–Sex · 9h–19h</div>
              <div>Site no ar em 7 dias</div>
              <div className="text-bg/40">Vagas limitadas</div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
