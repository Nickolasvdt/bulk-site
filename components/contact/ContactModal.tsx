"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SERVICES } from "@/lib/site-config";
import { useContactModal } from "./useContactModal";

type Status = "idle" | "sending" | "success" | "error";

export function ContactModal() {
  const { open, service, close } = useContactModal();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setError("");
    } else {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      whatsapp: String(fd.get("whatsapp") || ""),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || ""),
    };
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Erro ao enviar.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erro ao enviar.");
    }
  }

  const inputClass =
    "w-full min-h-[48px] px-4 rounded-xl border border-rule bg-bg text-ink placeholder:text-mute focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Agendar diagnóstico gratuito"
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />

          <motion.div
            className="relative w-full md:max-w-md bg-bg rounded-t-3xl md:rounded-2xl p-6 md:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute right-3 top-3 w-11 h-11 flex items-center justify-center rounded-full text-mute hover:text-ink hover:bg-ink/[0.05] transition"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="py-10 text-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 14, stiffness: 220 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <h3 className="txt-display text-2xl text-ink mb-2">Recebido!</h3>
                <p className="text-mute">Em breve falamos com você no WhatsApp.</p>
                <button
                  onClick={close}
                  className="mt-6 min-h-[48px] px-7 rounded-full bg-accent text-bg font-semibold hover:bg-sun transition"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <p className="txt-eyebrow text-accent mb-2">Diagnóstico gratuito</p>
                <h3 className="txt-display text-2xl md:text-3xl text-ink mb-1">Agendar diagnóstico</h3>
                <p className="text-mute text-sm mb-6">Deixe seus dados e retornamos no WhatsApp.</p>

                <form onSubmit={onSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="cm-name" className="sr-only">Seu nome</label>
                    <input ref={firstFieldRef} id="cm-name" name="name" required placeholder="Seu nome" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="cm-wpp" className="sr-only">WhatsApp com DDD</label>
                    <input id="cm-wpp" name="whatsapp" required inputMode="tel" placeholder="WhatsApp com DDD" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="cm-svc" className="sr-only">Serviço de interesse</label>
                    <select id="cm-svc" name="service" defaultValue={service} className={inputClass}>
                      <option value="">Não sei ainda — quero orientação</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cm-msg" className="sr-only">Mensagem (opcional)</label>
                    <textarea id="cm-msg" name="message" rows={2} placeholder="Conte um pouco sobre seu negócio (opcional)" className="w-full px-4 py-3 rounded-xl border border-rule bg-bg text-ink placeholder:text-mute focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition" />
                  </div>

                  {status === "error" && (
                    <p className="text-accent text-sm" role="alert">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full min-h-[52px] rounded-full bg-accent text-bg font-semibold hover:bg-sun disabled:opacity-60 transition"
                  >
                    {status === "sending" ? "Enviando…" : "Quero meu diagnóstico"}
                  </button>
                  <p className="text-[12px] text-mute text-center">
                    Sem compromisso. Resposta em até 1 dia útil.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
