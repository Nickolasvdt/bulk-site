"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SERVICES } from "@/lib/site-config";

export function ServicesGrid() {
  return (
    <section id="servicos" className="bg-bg py-16 md:py-20 border-b border-rule">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="txt-eyebrow text-accent mb-3">O que fazemos</p>
          <h2 className="txt-display text-3xl md:text-4xl text-ink max-w-2xl">
            Tudo que seu negócio precisa para ser encontrado e vender online
          </h2>
        </div>

        <div className="overflow-x-auto sm:overflow-visible no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule rounded-2xl overflow-hidden min-w-max sm:min-w-0">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 p-7 md:p-8 bg-bg group min-w-[min(280px,72vw)] sm:min-w-0"
            >
              <span className="text-2xl text-accent" aria-hidden="true">{s.icon}</span>
              <div>
                <p className="text-[11px] font-mono tracking-[0.12em] text-mute uppercase">{s.short}</p>
                <h3 className="font-display font-bold text-[22px] tracking-[-0.02em] text-ink mt-1">
                  {s.name}
                </h3>
              </div>
              <p className="text-[14px] leading-[1.65] text-mute flex-1">{s.description}</p>
              <Link
                href={`/servicos/${s.slug}`}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent hover:gap-3 transition-all"
              >
                Explorar
                <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
