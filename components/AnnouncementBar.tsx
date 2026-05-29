"use client";

import { useState } from "react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative z-50 bg-accent text-bg py-2.5 px-4 flex items-center justify-center gap-3">
      <p className="text-[12px] font-mono tracking-[0.12em] uppercase text-center">
        <span className="font-semibold">Novo:</span>{" "}
        IA no WhatsApp disponível para o seu negócio{" "}
        <a href="#contato" className="underline underline-offset-2 hover:no-underline ml-1">
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
