import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SITE } from "@/lib/site-config";
import { BlogCta, SidebarCta } from "./blog-cta";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getPost(slug);
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: "article",
        images: meta.cover ? [meta.cover] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.description,
        images: meta.cover ? [meta.cover] : undefined,
      },
    };
  } catch {
    return {};
  }
}

function formatDate(iso: string) {
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: ReturnType<typeof getPost>;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }
  const { meta, content } = post;
  const others = getAllPosts().filter((p) => p.slug !== slug).slice(0, 5);

  return (
    <main className="pt-28 pb-24 min-h-screen bg-bg">
      <JsonLd data={articleSchema(meta)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
          { name: meta.title, url: `${SITE.url}/blog/${meta.slug}` },
        ])}
      />

      <div className="max-w-[1140px] mx-auto px-6 md:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[14px] text-mute hover:text-accent transition mb-8"
        >
          ← Voltar para o blog
        </Link>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10 lg:gap-14">
          {/* ARTIGO */}
          <article className="min-w-0">
            <p className="txt-eyebrow text-accent mb-3">{meta.category}</p>
            <h1 className="txt-display text-3xl md:text-5xl text-ink mb-4">{meta.title}</h1>
            <p className="text-mute text-sm mb-8">
              {formatDate(meta.date)} · {meta.readingMinutes} min de leitura
            </p>

            {meta.cover && (
              <div
                className="h-56 md:h-80 rounded-2xl bg-cover bg-center mb-10"
                style={{ backgroundImage: `url(${meta.cover})` }}
                role="img"
                aria-label={meta.title}
              />
            )}

            <div className="prose-bulk text-ink/90 leading-relaxed">
              <MDXRemote source={content} />
            </div>

            <BlogCta />
          </article>

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-28 lg:self-start space-y-8">
            <SidebarCta />

            {others.length > 0 && (
              <div>
                <p className="txt-eyebrow text-mute mb-4">Outros conteúdos</p>
                <ul className="space-y-4">
                  {others.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="group flex gap-3 items-start">
                        {p.cover && (
                          <span
                            className="shrink-0 w-20 h-16 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${p.cover})` }}
                            aria-hidden="true"
                          />
                        )}
                        <span className="min-w-0">
                          <span className="block text-[11px] font-mono uppercase tracking-wider text-accent">
                            {p.category}
                          </span>
                          <span className="block text-[14px] font-semibold text-ink leading-snug group-hover:text-accent transition line-clamp-2">
                            {p.title}
                          </span>
                          <span className="block text-[12px] text-mute mt-1">
                            {p.readingMinutes} min
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/blog"
                  className="inline-block mt-6 text-[13px] font-semibold text-accent hover:underline"
                >
                  Ver todos os artigos →
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
