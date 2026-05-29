"use client";
import { useContactModal } from "@/components/contact/useContactModal";

export function BlogCta() {
  const { openContact } = useContactModal();
  return (
    <div className="mt-12 p-8 rounded-2xl bg-dark text-bg text-center">
      <h2 className="txt-display text-2xl md:text-3xl mb-2">Quer aplicar isso no seu negócio?</h2>
      <p className="text-bg/70 mb-6">Agende um diagnóstico gratuito e veja por onde começar.</p>
      <button
        onClick={() => openContact()}
        className="min-h-[52px] px-8 rounded-full bg-accent text-bg font-semibold hover:bg-sun transition"
      >
        Agendar diagnóstico
      </button>
    </div>
  );
}

export function SidebarCta() {
  const { openContact } = useContactModal();
  return (
    <div className="p-6 rounded-2xl bg-dark text-bg">
      <p className="txt-display text-lg mb-2">Pronto para crescer?</p>
      <p className="text-bg/70 text-sm mb-4">Diagnóstico gratuito, sem compromisso.</p>
      <button
        onClick={() => openContact()}
        className="w-full min-h-[48px] rounded-full bg-accent text-bg font-semibold hover:bg-sun transition"
      >
        Agendar diagnóstico
      </button>
    </div>
  );
}
