import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { SITE } from "@/lib/site-config";
import { BlogCta } from "./blog-cta";

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
    };
  } catch {
    return {};
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

  return (
    <main className="pt-28 pb-24 min-h-screen">
      <JsonLd data={articleSchema(meta)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
          { name: meta.title, url: `${SITE.url}/blog/${meta.slug}` },
        ])}
      />

      <article className="max-w-[760px] mx-auto px-6 md:px-8">
        <nav aria-label="Trilha" className="text-[13px] text-mute mb-8">
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{meta.category}</span>
        </nav>

        <p className="txt-eyebrow text-accent mb-3">{meta.category}</p>
        <h1 className="txt-display text-3xl md:text-5xl text-ink mb-4">{meta.title}</h1>
        <p className="text-mute text-sm mb-8">{meta.readingMinutes} min de leitura</p>

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
    </main>
  );
}
