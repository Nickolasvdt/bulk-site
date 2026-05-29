import { NextRequest, NextResponse } from "next/server";
import { validateContactInput, buildDiscordPayload, type ContactInput } from "@/lib/contact-message";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "Configuração ausente." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const result = validateContactInput(body as ContactInput);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildDiscordPayload(result.value)),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Falha ao enviar." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
