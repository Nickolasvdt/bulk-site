"use client";

export function Footer() {
  return (
    <footer className="border-t border-ink/[0.07]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-10">
          <div>
            <div className="font-display font-semibold text-[20px] leading-none tracking-[-0.02em]">Bulk</div>
            <p className="text-[11px] font-mono tracking-[0.14em] uppercase text-mute mt-2">
              Agência Digital · São Paulo
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-mute mb-4">Serviços</p>
              <ul className="space-y-2.5 text-[13px] text-ink/50">
                <li><a href="#como-funciona" className="hover:text-ink transition-colors">Sites</a></li>
                <li><a href="#como-funciona" className="hover:text-ink transition-colors">IA no WhatsApp</a></li>
                <li><a href="#como-funciona" className="hover:text-ink transition-colors">Google Meu Negócio</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-mute mb-4">Empresa</p>
              <ul className="space-y-2.5 text-[13px] text-ink/50">
                <li><a href="#planos" className="hover:text-ink transition-colors">Planos</a></li>
                <li><a href="#casos" className="hover:text-ink transition-colors">Casos</a></li>
                <li><a href="#contato" className="hover:text-ink transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-[0.16em] uppercase text-mute mb-4">Contato</p>
              <ul className="space-y-2.5 text-[13px] text-ink/50">
                <li><a href="mailto:bulkstudio1@gmail.com" className="hover:text-ink transition-colors">bulkstudio1@gmail.com</a></li>
                <li><a href="https://wa.me/5511999287779" className="hover:text-ink transition-colors">(11) 99928-7779</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/[0.06] pt-6 text-[10px] font-mono tracking-[0.14em] uppercase text-mute">
          <span>© 2026 Bulk · São Paulo · Brasil</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-ink transition-colors">Privacidade</a>
            <a href="#" className="hover:text-ink transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
