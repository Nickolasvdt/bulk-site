import assert from "node:assert/strict";
import { test } from "node:test";
import { validateContactInput, buildDiscordPayload } from "./contact-message";

test("rejeita nome vazio", () => {
  const r = validateContactInput({ name: " ", whatsapp: "11999998888", service: "criacao-de-sites" });
  assert.equal(r.ok, false);
});

test("rejeita whatsapp curto", () => {
  const r = validateContactInput({ name: "Ana", whatsapp: "123", service: "" });
  assert.equal(r.ok, false);
});

test("aceita input válido e monta embed", () => {
  const r = validateContactInput({
    name: "Ana",
    whatsapp: "(11) 99999-8888",
    service: "criacao-de-sites",
    message: "oi",
  });
  assert.equal(r.ok, true);
  if (!r.ok) return;
  const payload = buildDiscordPayload(r.value);
  assert.ok(payload.embeds[0].title.includes("diagnóstico"));
  assert.ok(JSON.stringify(payload).includes("Ana"));
  assert.ok(JSON.stringify(payload).includes("Criação de Sites"));
});

test("serviço desconhecido vira 'Não sei ainda'", () => {
  const payload = buildDiscordPayload({ name: "Bia", whatsapp: "11988887777", service: "" });
  assert.ok(JSON.stringify(payload).includes("Não sei ainda"));
});
