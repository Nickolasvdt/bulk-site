"use client";
import { useContactModal } from "@/components/contact/useContactModal";

export function OrcamentoCta() {
  const { openContact } = useContactModal();
  return (
    <button
      onClick={() => openContact()}
      className="min-h-[52px] px-8 rounded-full bg-accent text-bg font-semibold hover:bg-sun transition"
    >
      Solicitar meu orçamento
    </button>
  );
}
