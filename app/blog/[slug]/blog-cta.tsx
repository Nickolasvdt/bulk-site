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
