import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site da Bulk.",
  alternates: { canonical: "/termos-de-uso" },
  robots: { index: false, follow: true },
};

export default function TermosDeUso() {
  return (
    <main className="pt-28 pb-24 min-h-screen bg-bg">
      <div className="max-w-[760px] mx-auto px-6 md:px-8">
        <p className="txt-eyebrow text-accent mb-3">Legal</p>
        <h1 className="txt-display text-4xl md:text-5xl text-ink mb-3">Termos de Uso</h1>
        <p className="text-mute text-sm mb-10">Última atualização: 29 de maio de 2026</p>

        <div className="prose-bulk text-ink/90 leading-relaxed">
          <h2>1. Aceitação dos termos</h2>
          <p>
            Ao acessar e utilizar o site da {SITE.name} ({SITE.url}), você concorda com estes
            Termos de Uso. Caso não concorde, recomendamos não utilizar o site.
          </p>

          <h2>2. Sobre a Bulk</h2>
          <p>
            A {SITE.name} é uma agência digital que oferece serviços de criação de sites, gestão
            de tráfego, social media, configuração de Google Meu Negócio, automação de atendimento
            com IA no WhatsApp e manutenção, voltados a negócios locais.
          </p>

          <h2>3. Uso do site</h2>
          <p>
            O conteúdo deste site tem caráter informativo. Você se compromete a utilizá-lo de forma
            lícita, sem prejudicar o funcionamento do site ou os direitos de terceiros.
          </p>

          <h2>4. Propriedade intelectual</h2>
          <p>
            Textos, marcas, logotipos e elementos visuais deste site pertencem à {SITE.name} ou são
            utilizados mediante autorização. É vedada a reprodução sem consentimento prévio.
          </p>

          <h2>5. Orçamentos e contratação</h2>
          <p>
            As informações sobre serviços não constituem oferta vinculante. Cada projeto é orçado
            individualmente; condições, prazos e valores são definidos em proposta específica.
          </p>

          <h2>6. Limitação de responsabilidade</h2>
          <p>
            A {SITE.name} empenha-se em manter as informações corretas e o site disponível, mas não
            garante ausência de erros ou interrupções. O uso do site é de responsabilidade do
            usuário.
          </p>

          <h2>7. Alterações</h2>
          <p>
            Estes termos podem ser atualizados a qualquer momento. A versão vigente é sempre a
            publicada nesta página.
          </p>

          <h2>8. Contato</h2>
          <p>
            Dúvidas sobre estes termos podem ser enviadas para {SITE.email}.
          </p>

          <p className="text-mute text-sm">
            Este documento é um modelo inicial e deve ser revisado por um profissional jurídico
            antes da publicação definitiva.
          </p>
        </div>
      </div>
    </main>
  );
}
