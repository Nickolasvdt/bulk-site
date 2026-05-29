"use client";

import Script from "next/script";

/**
 * Widget VLibras (gov.br) — tradução do conteúdo para Libras por avatar.
 * Acessibilidade para pessoas surdas. Posicionado à esquerda para não
 * conflitar com o botão flutuante do WhatsApp (à direita).
 */
export function VLibras() {
  return (
    <>
      {/* eslint-disable @typescript-eslint/no-explicit-any */}
      <div {...({ vw: "true" } as any)} className="enabled">
        <div {...({ "vw-access-button": "true" } as any)} className="active" />
        <div {...({ "vw-plugin-wrapper": "true" } as any)}>
          <div className="vw-plugin-top-wrapper" />
        </div>
      </div>
      {/* eslint-enable @typescript-eslint/no-explicit-any */}
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            // @ts-expect-error global injetado pelo plugin externo
            new window.VLibras.Widget({
              rootPath: "https://vlibras.gov.br/app",
              position: "L",
              opacity: 1,
            });
          } catch {
            // @ts-expect-error fallback para assinatura antiga
            new window.VLibras.Widget("https://vlibras.gov.br/app");
          }
        }}
      />
    </>
  );
}
