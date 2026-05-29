import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getService, whatsappLink, SITE } from "@/lib/site-config";
import { getServiceDetail } from "@/lib/service-details";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCta } from "./service-cta";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  const d = getServiceDetail(slug);
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
      images: d?.heroImage ? [d.heroImage] : undefined,
    },
  };
}

export default async function ServicePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const s = getService(slug);
  const d = getServiceDetail(slug);
  if (!s || !d) notFound();

  return (
    <main className="min-h-screen">
      <JsonLd data={serviceSchema(s.slug)} />
      <JsonLd data={faqSchema(d.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", url: SITE.url },
          { name: "Serviços", url: `${SITE.url}/#servicos` },
          { name: s.name, url: `${SITE.url}/servicos/${s.slug}` },
        ])}
      />

      {/* HERO */}
      <section className="pt-28 pb-12 md:pb-16 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <nav aria-label="Trilha" className="text-[13px] text-mute mb-8">
            <Link href="/" className="hover:text-ink">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/#servicos" className="hover:text-ink">Serviços</Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{s.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <Reveal>
              <p className="txt-eyebrow text-accent mb-3">Serviço</p>
              <h1 className="txt-display text-4xl md:text-6xl text-ink mb-5">{s.name}</h1>
              <p className="text-xl text-ink/90 mb-4 leading-snug">{d.promise}</p>
              <p className="text-mute mb-8 leading-relaxed">{d.intro}</p>
              <div className="flex flex-wrap items-center gap-3">
                <ServiceCta slug={s.slug} />
                <a
                  href={whatsappLink(`Olá! Tenho interesse em ${s.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] inline-flex items-center px-6 rounded-full border border-rule text-ink font-semibold hover:border-accent hover:text-accent transition"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                className="h-64 md:h-96 rounded-3xl bg-cover bg-center shadow-xl"
                style={{ backgroundImage: `url(${d.heroImage})` }}
                role="img"
                aria-label={s.name}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-16 md:py-20 bg-bg border-t border-rule">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <Reveal>
            <p className="txt-eyebrow text-accent mb-3">O que você ganha</p>
            <h2 className="txt-display text-3xl md:text-4xl text-ink mb-10 max-w-2xl">
              Feito para o seu negócio vender mais
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {d.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="h-full p-6 rounded-2xl border border-rule hover:border-accent transition">
                  <span className="text-2xl text-accent" aria-hidden="true">{s.icon}</span>
                  <h3 className="txt-display text-lg text-ink mt-3 mb-2">{b.title}</h3>
                  <p className="text-mute text-sm leading-relaxed">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-16 md:py-20 bg-ink/[0.025]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <Reveal>
            <p className="txt-eyebrow text-accent mb-3">Como funciona</p>
            <h2 className="txt-display text-3xl md:text-4xl text-ink mb-10 max-w-2xl">
              Simples, rápido e sem complicação
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {d.steps.map((st, i) => (
              <Reveal key={st.title} delay={i * 0.1}>
                <div className="h-full p-7 rounded-2xl bg-bg border border-rule">
                  <span className="font-mono text-accent text-sm">0{i + 1}</span>
                  <h3 className="txt-display text-xl text-ink mt-2 mb-2">{st.title}</h3>
                  <p className="text-mute leading-relaxed">{st.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-bg">
        <div className="max-w-[800px] mx-auto px-6 md:px-8">
          <Reveal>
            <p className="txt-eyebrow text-accent mb-3">Dúvidas frequentes</p>
            <h2 className="txt-display text-3xl md:text-4xl text-ink mb-8">
              Sobre {s.name}
            </h2>
          </Reveal>
          <div className="divide-y divide-rule border-t border-rule">
            {d.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-ink">
                  {f.q}
                  <span className="text-mute transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
                </summary>
                <p className="text-mute leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 md:py-20 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <Reveal>
            <div className="p-8 md:p-12 rounded-3xl bg-dark text-bg text-center">
              <h2 className="txt-display text-3xl md:text-4xl mb-3">Pronto para dar o próximo passo?</h2>
              <p className="text-bg/70 mb-7 max-w-xl mx-auto">
                Agende um diagnóstico gratuito e receba uma proposta sob medida para {s.name.toLowerCase()}.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <ServiceCta slug={s.slug} />
                <a
                  href={whatsappLink(`Olá! Quero saber mais sobre ${s.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] inline-flex items-center px-6 rounded-full border border-bg/25 text-bg font-semibold hover:bg-bg/10 transition"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVIÇOS RELACIONADOS */}
      <section className="pb-24 bg-bg">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 border-t border-rule pt-10">
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
        </div>
      </section>
    </main>
  );
}
