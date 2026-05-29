import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Bulk coleta, usa e protege seus dados pessoais (LGPD).",
  alternates: { canonical: "/privacidade" },
  robots: { index: false, follow: true },
};

export default function Privacidade() {
  return (
    <main className="pt-28 pb-24 min-h-screen bg-bg">
      <div className="max-w-[760px] mx-auto px-6 md:px-8">
        <p className="txt-eyebrow text-accent mb-3">Legal</p>
        <h1 className="txt-display text-4xl md:text-5xl text-ink mb-3">Política de Privacidade</h1>
        <p className="text-mute text-sm mb-10">Última atualização: 29 de maio de 2026</p>

        <div className="prose-bulk text-ink/90 leading-relaxed">
          <h2>1. Quem somos</h2>
          <p>
            A {SITE.name} ({SITE.url}) respeita a sua privacidade e trata seus dados pessoais de
            acordo com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
          </p>

          <h2>2. Quais dados coletamos</h2>
          <p>
            Coletamos os dados que você nos fornece ao solicitar um diagnóstico ou orçamento — como
            nome, número de WhatsApp e mensagem — além de dados de navegação coletados
            automaticamente (como páginas visitadas), quando aplicável.
          </p>

          <h2>3. Como usamos seus dados</h2>
          <p>Utilizamos seus dados para:</p>
          <ul>
            <li>responder ao seu contato e enviar orçamentos;</li>
            <li>prestar os serviços contratados;</li>
            <li>melhorar o site e a comunicação;</li>
            <li>cumprir obrigações legais.</li>
          </ul>

          <h2>4. Compartilhamento</h2>
          <p>
            Não vendemos seus dados. Podemos utilizar ferramentas de terceiros (como serviços de
            mensagens e análise) que processam dados em nosso nome, sempre com finalidade legítima.
          </p>

          <h2>5. Seus direitos</h2>
          <p>
            Você pode solicitar a qualquer momento o acesso, a correção, a portabilidade ou a
            exclusão dos seus dados, bem como revogar consentimentos, entrando em contato pelo
            e-mail {SITE.email}.
          </p>

          <h2>6. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados contra
            acesso não autorizado, perda ou uso indevido.
          </p>

          <h2>7. Cookies</h2>
          <p>
            O site pode utilizar cookies para melhorar a sua experiência. Você pode gerenciar os
            cookies nas configurações do seu navegador.
          </p>

          <h2>8. Contato do encarregado</h2>
          <p>
            Para assuntos relacionados à proteção de dados, fale conosco pelo e-mail {SITE.email}.
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
