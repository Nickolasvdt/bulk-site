"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-md border-t border-ink/[0.08]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-medium text-ink">
                Pronto para colocar seu negócio no mapa?
              </p>
              <p className="text-[11px] text-mute mt-0.5">
                Site no ar em 7 dias · Proposta em 24h · Sem contrato
              </p>
            </div>
            <a
              href="#contato"
              className="shrink-0 inline-flex items-center gap-1.5 bg-ink text-bg px-5 py-2.5 rounded-md text-[12px] font-medium hover:bg-accent transition-colors whitespace-nowrap"
            >
              Faça seu orçamento →
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
