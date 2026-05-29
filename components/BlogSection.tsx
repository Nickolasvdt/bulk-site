import { motion } from "motion/react";

const articles = [
  {
    category: "Dicas",
    title: "Como aparecer no Google Maps quando buscam o seu serviço",
    date: "28 maio 2026",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
    href: "#blog",
  },
  {
    category: "IA",
    title: "IA no WhatsApp: como configurar um agente que atende 24h",
    date: "25 maio 2026",
    image: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=600&q=80",
    href: "#blog",
  },
  {
    category: "Cases",
    title: "Como uma barbearia triplicou os agendamentos em 90 dias",
    date: "20 maio 2026",
    image: "https://plus.unsplash.com/premium_photo-1661391316543-9c40ae315a4a?auto=format&fit=crop&w=600&q=80",
    href: "#blog",
  },
  {
    category: "Site",
    title: "Por que um site profissional converte mais que Instagram",
    date: "15 maio 2026",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=600&q=80",
    href: "#blog",
  },
];

const categories = ["Em alta", "Dicas", "IA", "Cases", "Site", "Google", "WhatsApp"];

export function BlogSection() {
  return (
    <section id="blog" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-mute mb-3">
              Conteúdo
            </p>
            <h2 className="font-display font-semibold text-[clamp(24px,3.2vw,40px)] leading-[1.05] tracking-[-0.025em]">
              Conteúdos para você{" "}
              <span className="font-display italic text-accent">não parar.</span>
            </h2>
          </div>
          <p className="text-[13px] text-mute">
            Práticos para quem quer crescer e aparecer online.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                i === 0
                  ? "bg-ink text-bg border-ink"
                  : "border-rule text-mute hover:border-ink/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href={article.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group flex flex-col rounded-xl overflow-hidden border border-rule hover:border-ink/20 transition-colors"
            >
              <div
                className="h-[180px] bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              <div className="p-4 flex flex-col gap-2 flex-1 bg-bg">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30 rounded-full px-2 py-0.5 self-start">
                  {article.category}
                </span>
                <p className="font-display text-[15px] leading-[1.35] text-ink line-clamp-2 group-hover:text-accent transition-colors">
                  {article.title}
                </p>
                <p className="text-[11px] text-mute mt-auto">{article.date}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a href="#blog" className="inline-flex items-center gap-2 border border-rule rounded-md px-6 py-3 text-[13px] font-medium text-ink hover:border-accent hover:text-accent transition-colors">
            Ver todos os artigos →
          </a>
        </div>

        {/* Social links */}
        <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
          <p className="text-[12px] text-mute font-mono uppercase tracking-wide">Também em:</p>
          {[
            { name: "Instagram", href: "#" },
            { name: "YouTube", href: "#" },
            { name: "WhatsApp", href: "#" },
          ].map((s) => (
            <a key={s.name} href={s.href} className="text-[13px] text-mute hover:text-accent transition-colors font-medium">
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
