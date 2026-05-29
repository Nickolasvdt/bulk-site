import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getService, SITE } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { ServiceCta } from "./service-cta";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.long,
    alternates: { canonical: `/servicos/${s.slug}` },
    openGraph: {
      title: `${s.name} | Bulk`,
      description: s.long,
      type: "website",
      url: `${SITE.url}/servicos/${s.slug}`,
    },
  };
}

export default async function ServicePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <main className="pt-28 pb-24 min-h-screen">
      <JsonLd data={serviceSchema(s.slug)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", url: SITE.url },
          { name: "Serviços", url: `${SITE.url}/#servicos` },
          { name: s.name, url: `${SITE.url}/servicos/${s.slug}` },
        ])}
      />

      <div className="max-w-[900px] mx-auto px-6 md:px-8">
        <nav aria-label="Trilha" className="text-[13px] text-mute mb-8">
          <Link href="/" className="hover:text-ink">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{s.name}</span>
        </nav>

        <p className="txt-eyebrow text-accent mb-3">Serviço</p>
        <h1 className="txt-display text-4xl md:text-6xl text-ink mb-5">{s.name}</h1>
        <p className="text-lg text-mute mb-3 max-w-2xl">{s.short}</p>
        <p className="text-lg text-ink/90 mb-8 max-w-2xl leading-relaxed">{s.long}</p>

        <ServiceCta slug={s.slug} />

        <nav className="mt-16 pt-8 border-t border-rule" aria-label="Outros serviços">
          <p className="txt-eyebrow text-mute mb-4">Outros serviços</p>
          <ul className="flex flex-wrap gap-3">
            {SERVICES.filter((x) => x.slug !== s.slug).map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/servicos/${x.slug}`}
                  className="inline-block px-4 py-2 rounded-full border border-rule text-ink hover:border-accent hover:text-accent transition"
                >
                  {x.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
