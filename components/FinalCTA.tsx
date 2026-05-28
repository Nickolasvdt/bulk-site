"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function FinalCTA() {
  return (
    <section id="contato" className="py-16 md:py-24 bg-ink text-bg overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-10">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-bg/25 mb-8">
              Próximo passo
            </p>
            <h2 className="font-display font-semibold text-[clamp(28px,4vw,52px)] leading-[1.0] tracking-[-0.025em]">
              Bora colocar seu<br />negócio no mapa?
            </h2>
            <p className="mt-5 text-[14px] leading-[1.65] text-bg/55 max-w-[360px]">
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

            {/* Info */}
            <div className="mt-10 font-mono text-[10px] tracking-[0.16em] uppercase text-bg/25 space-y-2">
              <div>Resposta em até 4h úteis · Seg–Sex · 9h–19h</div>
              <div>Site no ar em 7 dias · Vagas limitadas</div>
            </div>
          </motion.div>

          {/* Right: larger lifestyle photo */}
          <motion.div
            className="hidden md:block relative shrink-0 rounded-2xl overflow-hidden"
            style={{ width: 340, minHeight: 400 }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="https://images.unsplash.com/photo-1758519291037-db9ec86cda69?auto=format&fit=crop&w=700&q=80"
              alt="Empreendedor satisfeito falando ao telefone enquanto trabalha"
              fill
              className="object-cover"
              sizes="340px"
            />
            {/* Warm vignette */}
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/50 via-transparent to-transparent pointer-events-none" />

            {/* Floating social proof pill */}
            <motion.div
              className="absolute bottom-5 left-5 right-5 bg-bg/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1682088367648-735b1a6ac612?auto=format&fit=crop&w=80&q=80"
                    alt="Cliente"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-ink leading-none">"Agenda cheia na primeira semana"</p>
                  <p className="text-[10px] text-mute mt-0.5">Carlos S. · Barbearia CS</p>
                </div>
                <div className="ml-auto shrink-0">
                  <span className="font-display font-semibold text-[15px] text-accent leading-none">★★★★★</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
