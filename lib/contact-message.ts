import { SERVICES } from "./site-config";

export type ContactInput = {
  name: string;
  whatsapp: string;
  service: string; // slug ou ""
  message?: string;
};

export function validateContactInput(
  input: ContactInput
): { ok: true; value: ContactInput } | { ok: false; error: string } {
  const name = (input?.name ?? "").trim();
  const whatsapp = (input?.whatsapp ?? "").replace(/\D/g, "");
  if (name.length < 2) return { ok: false, error: "Informe seu nome." };
  if (whatsapp.length < 10) return { ok: false, error: "Informe um WhatsApp válido com DDD." };
  return {
    ok: true,
    value: { name, whatsapp, service: input.service ?? "", message: input.message },
  };
}

export function buildDiscordPayload(input: ContactInput) {
  const svc = SERVICES.find((s) => s.slug === input.service);
  const serviceName = svc?.name ?? "Não sei ainda";
  return {
    username: "Bulk — Site",
    embeds: [
      {
        title: "📩 Novo pedido de diagnóstico",
        color: 0x7a0000,
        fields: [
          { name: "Nome", value: input.name, inline: true },
          { name: "WhatsApp", value: input.whatsapp, inline: true },
          { name: "Serviço", value: serviceName, inline: false },
          { name: "Mensagem", value: input.message?.trim() || "—", inline: false },
        ],
      },
    ],
  };
}
