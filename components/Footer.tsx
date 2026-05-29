import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/site-config";

const footerLinks = {
  "Serviços": SERVICES.map((s) => ({ label: s.name, href: `/servicos/${s.slug}` })),
  "Empresa": [
    { label: "A Bulk", href: "#sobre" },
    { label: "Blog", href: "/blog" },
    { label: "Solicitar orçamento", href: "/orcamento" },
    { label: "Contato", href: "#contato" },
  ],
  "Legal": [
    { label: "Termos de Uso", href: "/termos-de-uso" },
    { label: "Política de Privacidade", href: "/privacidade" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16">
        {/* Logo + links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo col */}
          <div className="col-span-2 md:col-span-1 flex flex-col">
            <Image
              src="/logo.png"
              alt="Bulk"
              width={200}
              height={80}
              className="h-16 w-auto object-contain brightness-0 invert"
            />
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <h4 className="text-[11px] font-mono tracking-[0.14em] uppercase text-bg/40 mb-1">
                {title}
              </h4>
              {links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-[13px] text-bg/55 hover:text-bg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-bg/[0.08] mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] text-bg/30">
              Bulk Digital LTDA. Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-bg/20">
              São Paulo – SP · contato@bulkstudio.com.br
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { name: "Instagram", href: "#", icon: "IG" },
              { name: "WhatsApp", href: "#", icon: "WA" },
              { name: "YouTube", href: "#", icon: "YT" },
              { name: "LinkedIn", href: "#", icon: "LI" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center text-[10px] font-mono text-accent/70 hover:border-accent hover:text-accent transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
