"use client";
import { useContactModal } from "@/components/contact/useContactModal";

export function ServiceCta({ slug }: { slug: string }) {
  const { openContact } = useContactModal();
  return (
    <button
      onClick={() => openContact(slug)}
      className="min-h-[52px] px-7 rounded-full bg-accent text-bg font-semibold hover:bg-sun transition"
    >
      Solicitar orçamento
    </button>
  );
}
