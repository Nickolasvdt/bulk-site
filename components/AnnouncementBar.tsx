"use client";

import { useState } from "react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-accent text-bg py-2.5 px-4 pb-20 md:pb-2.5 flex items-center justify-center gap-3">
      <p className="text-[12px] font-mono tracking-[0.12em] uppercase text-center">
        <span className="font-semibold">Novo:</span>{" "}
        IA no WhatsApp disponível para o seu negócio{" "}
        <a href="/servicos/ia-no-whatsapp" className="underline underline-offset-2 hover:no-underline ml-1">
          Saiba mais →
        </a>
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Fechar aviso"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-bg/60 hover:text-bg transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
