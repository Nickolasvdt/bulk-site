import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog — Marketing digital para negócio local",
  description:
    "Dicas práticas de criação de sites, Google Meu Negócio, tráfego pago, social media e IA no WhatsApp para negócios locais venderem mais.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="pt-28 pb-24 min-h-screen">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <p className="txt-eyebrow text-accent mb-3">Conteúdos</p>
        <h1 className="txt-display text-4xl md:text-6xl text-ink mb-4">Blog da Bulk</h1>
        <p className="text-mute max-w-2xl mb-12">
          Estratégias de presença digital para negócios locais: site, Google, tráfego, redes e
          IA — explicados de um jeito direto e aplicável.
        </p>

        {posts.length === 0 ? (
          <p className="text-mute">Em breve, novos artigos.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06} as="div">
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block h-full p-6 rounded-2xl border border-rule hover:border-accent transition"
                >
                  <span className="txt-eyebrow text-accent">{p.category}</span>
                  <h2 className="txt-display text-xl text-ink mt-2 mb-2 group-hover:text-accent transition">
                    {p.title}
                  </h2>
                  <p className="text-mute text-sm">{p.description}</p>
                  <p className="text-mute text-xs mt-4">{p.readingMinutes} min de leitura</p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
