"use client";

import { motion } from "motion/react";
import { SplitText } from "@/components/ui/SplitText";

const groups = [
  {
    name: "Sites & Hospedagem",
    items: ["Astro", "Next.js", "WordPress", "Cloudflare Pages", "Vercel"],
  },
  {
    name: "IA & WhatsApp",
    items: ["WhatsApp Cloud API", "Evolution API", "Groq", "Claude", "n8n", "Make"],
  },
  {
    name: "SEO & Presença",
    items: ["Google Meu Negócio", "Search Console", "Google Analytics", "Schema.org", "PageSpeed"],
  },
  {
    name: "Design & Conteúdo",
    items: ["Figma", "Canva Pro", "Midjourney", "Lottie", "Cloudinary"],
  },
  {
    name: "Performance & Segurança",
    items: ["Cloudflare", "Lighthouse", "Core Web Vitals", "SSL/TLS", "Uptime Robot"],
  },
];

export function Stack() {
  return (
    <section className="py-14 md:py-24 px-6 md:px-10 rule-t">
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 mb-12 md:mb-18">
        <p className="col-span-12 txt-eyebrow text-mute mb-6">Ferramentas</p>
        <h2 className="col-span-12 md:col-span-7 txt-display text-[9vw] md:text-[6vw]">
          <SplitText text="Tecnologia de ponta" />
          <br />
          <SplitText text="pra negócio local." italic delay={0.2} />
        </h2>
        <p className="col-span-12 md:col-start-9 md:col-span-4 mt-6 md:mt-auto text-[15px] leading-[1.45] text-mute md:text-right">
          A gente usa o que tem de melhor no mercado. Você não precisa entender
          as ferramentas — precisa ver o resultado.
        </p>
      </div>

      {/* Credits-style layout */}
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">
        <div className="col-span-12 md:col-start-2 md:col-span-10 space-y-0">
          {groups.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-10 gap-x-4 md:gap-x-8 py-5 md:py-7 rule-b group"
            >
              {/* Category label */}
              <div className="col-span-10 md:col-span-3 flex items-baseline gap-3 mb-4 md:mb-0">
                <span className="font-mono text-[10px] tracking-wider2 uppercase text-accent opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] tracking-wider2 uppercase text-mute">
                  {g.name}
                </span>
              </div>

              {/* Tools as display text */}
              <div className="col-span-10 md:col-span-7">
                <p
                  className="font-display leading-[1.2] tracking-tight2 text-ink/90 group-hover:text-ink transition-colors"
                  style={{ fontSize: "clamp(17px, 2vw, 26px)" }}
                >
                  {g.items.map((item, idx) => (
                    <span key={item}>
                      <span className="hover:text-accent transition-colors cursor-default">{item}</span>
                      {idx < g.items.length - 1 && (
                        <span className="text-ink/20 mx-2 font-sans text-[0.7em]">·</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-12 md:mt-16 grid grid-cols-12 gap-x-4 md:gap-x-6">
        <p className="col-span-12 md:col-start-2 md:col-span-8 font-display italic text-[15px] md:text-[18px] leading-[1.3] text-mute">
          "Não importa qual ferramenta — importa que o cliente te ache, confie e compre."
        </p>
      </div>
    </section>
  );
}
