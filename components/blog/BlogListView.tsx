import Link from "next/link";
import { getPostsPage } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";
import { BlogPagination } from "@/components/blog/BlogPagination";

export function BlogListView({ page }: { page: number }) {
  const { posts, currentPage, totalPages } = getPostsPage(page);

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
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06} as="div">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-rule hover:border-accent transition overflow-hidden"
                  >
                    {p.cover && (
                      <div
                        className="h-44 bg-cover bg-center"
                        style={{ backgroundImage: `url(${p.cover})` }}
                      />
                    )}
                    <div className="flex flex-col flex-1 p-6">
                      <span className="txt-eyebrow text-accent">{p.category}</span>
                      <h2 className="txt-display text-xl text-ink mt-2 mb-2 group-hover:text-accent transition">
                        {p.title}
                      </h2>
                      <p className="text-mute text-sm">{p.description}</p>
                      <p className="text-mute text-xs mt-auto pt-4">
                        {p.readingMinutes} min de leitura
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <BlogPagination currentPage={currentPage} totalPages={totalPages} />
          </>
        )}
      </div>
    </main>
  );
}
