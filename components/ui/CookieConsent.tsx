"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "bulk-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(KEY, "accepted");
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed left-4 right-4 md:left-6 md:right-auto bottom-28 md:bottom-16 z-[55] md:max-w-sm bg-bg border border-rule rounded-2xl shadow-2xl p-5">
      <p className="text-[14px] text-ink leading-relaxed">
        Usamos cookies para melhorar sua experiência neste site. Ao continuar, você concorda com a
        nossa{" "}
        <Link href="/privacidade" className="text-accent underline underline-offset-2">
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={accept}
          className="min-h-[44px] px-5 rounded-full bg-accent text-bg text-sm font-semibold hover:bg-sun transition"
        >
          Aceitar
        </button>
        <Link
          href="/privacidade"
          className="text-sm text-mute hover:text-ink transition"
        >
          Saiba mais
        </Link>
      </div>
    </div>
  );
}
