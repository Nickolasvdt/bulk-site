"use client";

import { useState } from "react";

type Drawer = "servicos" | "casos" | "planos" | "mais" | null;

const drawerContent: Record<NonNullable<Drawer>, { title: string; subtitle?: string; href: string }[]> = {
  servicos: [
    { title: "Site Profissional", subtitle: "No ar em 7 dias", href: "#como-funciona" },
    { title: "IA no WhatsApp", subtitle: "Atendimento 24h/7d", href: "#como-funciona" },
    { title: "Google Meu Negócio", subtitle: "Pág. 1 no local", href: "#como-funciona" },
    { title: "Manutenção Mensal", subtitle: "Suporte contínuo", href: "#como-funciona" },
  ],
  casos: [
    { title: "Todos os Casos", href: "#casos" },
    { title: "Barbearias", href: "#casos" },
    { title: "Restaurantes", href: "#casos" },
    { title: "Salões e Beleza", href: "#casos" },
  ],
  planos: [
    { title: "Ver Planos", href: "#planos" },
    { title: "Agendar diagnóstico", href: "#contato" },
  ],
  mais: [
    { title: "Sobre a Bulk", href: "#sobre" },
    { title: "Blog", href: "#blog" },
    { title: "Contato", href: "#contato" },
    { title: "Política de Privacidade", href: "#" },
  ],
};

export function MobileBottomNav() {
  const [open, setOpen] = useState<Drawer>(null);

  const toggle = (drawer: Drawer) =>
    setOpen((prev) => (prev === drawer ? null : drawer));

  return (
    <>
      {/* Spacer */}
      <div className="md:hidden h-[70px]" />

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-ink/30 z-[99998] md:hidden"
          onClick={() => setOpen(null)}
        />
      )}

      {/* Drawer */}
      {open && (
        <div className="fixed left-0 right-0 bottom-[70px] max-h-[55vh] bg-bg rounded-t-2xl shadow-2xl z-[100000] md:hidden flex flex-col overflow-hidden">
          <div className="w-20 h-1 bg-ink rounded-full mx-auto mt-3 mb-2 cursor-pointer" onClick={() => setOpen(null)} />
          <div className="overflow-auto pb-4">
            {drawerContent[open].map((item) => (
              <a
                key={item.href + item.title}
                href={item.href}
                onClick={() => setOpen(null)}
                className="flex items-center justify-between px-5 py-4 border-b border-rule hover:bg-ink/[0.03]"
              >
                <div>
                  <p className="font-semibold text-[16px] text-ink">{item.title}</p>
                  {item.subtitle && <p className="text-[13px] text-mute mt-0.5">{item.subtitle}</p>}
                </div>
                <span className="text-mute text-sm">›</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-[70px] bg-bg border-t border-rule z-[99999] md:hidden flex">
        {(["servicos", "casos", "planos", "mais"] as Drawer[]).map((id) => {
          const labels: Record<NonNullable<Drawer>, string> = {
            servicos: "Serviços",
            casos: "Casos",
            planos: "Planos",
            mais: "Mais",
          };
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 text-[11px] font-mono tracking-wide transition-colors ${
                open === id ? "text-accent" : "text-mute"
              }`}
            >
              <span className="text-[18px] leading-none">
                {id === "servicos" ? "◈" : id === "casos" ? "◉" : id === "planos" ? "◎" : "⋯"}
              </span>
              {labels[id]}
            </button>
          );
        })}
      </nav>
    </>
  );
}
