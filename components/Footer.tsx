import Image from "next/image";

const footerLinks = {
  "Serviços": [
    { label: "Site Profissional", href: "#como-funciona" },
    { label: "IA no WhatsApp", href: "#como-funciona" },
    { label: "Google Meu Negócio", href: "#como-funciona" },
    { label: "Manutenção Mensal", href: "#planos" },
    { label: "Ver todos", href: "#como-funciona" },
  ],
  "Casos": [
    { label: "Barbearias", href: "#casos" },
    { label: "Restaurantes", href: "#casos" },
    { label: "Salões de Beleza", href: "#casos" },
    { label: "Lojas", href: "#casos" },
    { label: "Todos os casos", href: "#casos" },
  ],
  "Planos": [
    { label: "Site Básico", href: "#planos" },
    { label: "Plano Completo", href: "#planos" },
    { label: "Bulk Pass", href: "#planos" },
    { label: "Agendar diagnóstico", href: "#contato" },
  ],
  "Conteúdo": [
    { label: "Blog", href: "#blog" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
  "Sobre": [
    { label: "A Bulk", href: "#sobre" },
    { label: "Nossa equipe", href: "#sobre" },
    { label: "Contato", href: "#contato" },
    { label: "Carreiras", href: "#" },
  ],
  "Legal": [
    { label: "Termos de Uso", href: "#" },
    { label: "Política de Privacidade", href: "#" },
    { label: "Central de Ajuda", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-16">
        {/* Logo + links grid */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-8 mb-12">
          {/* Logo col */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Image
              src="/logo.png"
              alt="Bulk"
              width={80}
              height={32}
              className="h-8 w-auto brightness-100"
            />
            <p className="text-[12px] text-bg/35 leading-[1.6]">
              Presença digital para negócio local crescer.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <h4 className="text-[11px] font-mono tracking-[0.14em] uppercase text-bg/40 mb-1">
                {title}
              </h4>
              {links.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="text-[13px] text-bg/55 hover:text-bg transition-colors"
                >
                  {link.label}
                </a>
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
              São Paulo – SP · contato@bulk.digital
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
