import { motion } from "motion/react";

const services = [
  {
    label: "Site",
    name: "PROFISSIONAL",
    desc: "Participe de experiências imersivas com design sob medida, mobile-first e velocidade máxima. No ar em 7 dias, com domínio e hospedagem inclusos.",
    href: "#como-funciona",
  },
  {
    label: "IA no",
    name: "WHATSAPP",
    desc: "Conecte-se com seus clientes 24h por dia. Agente que responde, qualifica e agenda automaticamente pelo WhatsApp.",
    href: "#como-funciona",
  },
  {
    label: "Google",
    name: "MEU NEGÓCIO",
    desc: "Acesse a presença local completa: configuração, otimização e monitoramento. Apareça primeiro quando buscam perto de você.",
    href: "#como-funciona",
  },
  {
    label: "Manutenção",
    name: "MENSAL",
    desc: "Atualizações, relatório mensal e suporte contínuo. Seu site sempre no ar, sempre atualizado, sem preocupação.",
    href: "#planos",
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-bg py-16 border-b border-rule">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-rule">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 p-8 group"
            >
              {/* Logo prefix */}
              <div className="flex items-baseline gap-1.5">
                <span className="text-[11px] font-mono text-mute uppercase tracking-[0.1em]">Bulk</span>
              </div>

              <div>
                <p className="text-[11px] font-mono tracking-[0.12em] text-mute uppercase">{s.label}</p>
                <h3 className="font-display font-semibold text-[22px] tracking-[-0.02em] text-ink mt-0.5">
                  {s.name}
                </h3>
              </div>

              <p className="text-[13px] leading-[1.65] text-mute flex-1">{s.desc}</p>

              <a
                href={s.href}
                className="inline-flex items-center gap-2 text-[12px] font-medium text-accent hover:gap-3 transition-all"
              >
                Explorar
                <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
