"use client";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const PILLARS = [
  {
    slug: "criacao-de-sites",
    title: "Um site que é sua base",
    text: "Tudo começa por uma casa própria na internet. Um site profissional dá credibilidade, hospeda suas palavras-chave e converte o visitante em cliente.",
  },
  {
    slug: "google-meu-negocio",
    title: "Ser achado no Google",
    text: "Quando alguém busca seu serviço na região, você precisa aparecer. O Google Meu Negócio coloca sua empresa no mapa e na primeira página local.",
  },
  {
    slug: "gestao-de-trafego",
    title: "Tráfego que traz comprador",
    text: "Anúncios bem feitos no Google e nas redes colocam seu negócio na frente de quem já está pronto para comprar — com investimento controlado.",
  },
  {
    slug: "ia-no-whatsapp",
    title: "Atendimento que não dorme",
    text: "De nada adianta atrair se você não responde a tempo. A IA no WhatsApp atende, qualifica e agenda 24h, para nenhuma oportunidade esfriar.",
  },
];

export function MarketingSection() {
  return (
    <section id="marketing" className="py-20 md:py-28 bg-bg">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <Reveal>
          <p className="txt-eyebrow text-accent mb-3">Marketing digital para negócio local</p>
          <h2 className="txt-display text-3xl md:text-5xl text-ink mb-4 max-w-3xl">
            Presença digital não é uma peça solta — é um sistema que vende
          </h2>
          <p className="text-mute max-w-2xl mb-12 leading-relaxed">
            Para um negócio local crescer na internet, não basta ter só um site, só um perfil no
            Google ou só anúncios. O que vende todo dia é a combinação certa: ser encontrado,
            passar confiança, atrair o cliente certo e responder na hora. Cada peça reforça a
            outra — e é exatamente assim que estruturamos o trabalho na Bulk.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={`/servicos/${p.slug}`}
                className="group block h-full p-7 rounded-2xl border border-rule hover:border-accent transition"
              >
                <h3 className="txt-display text-2xl text-ink mb-2 group-hover:text-accent transition">
                  {p.title}
                </h3>
                <p className="text-mute leading-relaxed">{p.text}</p>
                <span className="inline-block mt-4 text-accent font-medium">Saiba mais →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
