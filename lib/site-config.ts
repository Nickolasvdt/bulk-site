export const SITE = {
  name: "Bulk",
  legalName: "Bulk Studio",
  url: "https://bulkstudio.com.br",
  email: "contato@bulkstudio.com.br",
  // PLACEHOLDERS — trocar pelos dados reais antes de publicar:
  whatsapp: "5511999999999",
  whatsappDisplay: "(11) 99999-9999",
  city: "São Paulo",
  region: "SP",
  country: "BR",
  tagline: "Presença digital que vende todo dia",
  description:
    "Agência digital para negócios locais em São Paulo: criação de sites, gestão de tráfego, social media, Google Meu Negócio, IA no WhatsApp e manutenção.",
} as const;

export function whatsappLink(message = "Olá! Vim pelo site da Bulk e quero um diagnóstico gratuito.") {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Service = {
  slug: string;
  name: string;
  short: string; // subtítulo curto
  description: string; // 1 frase para cards
  long: string; // parágrafo para a página dedicada
  keyword: string; // termo SEO principal
  icon: string; // glyph simples (placeholder de ícone)
};

export const SERVICES: Service[] = [
  {
    slug: "criacao-de-sites",
    name: "Criação de Sites",
    short: "No ar em 7 dias, mobile-first",
    description: "Site profissional com domínio e hospedagem inclusos, pronto para vender.",
    long: "Criamos sites profissionais, rápidos e mobile-first que transformam visitantes em clientes. Entrega em 7 dias com domínio, hospedagem e otimização para o Google inclusos.",
    keyword: "criação de sites em São Paulo",
    icon: "◧",
  },
  {
    slug: "gestao-de-trafego",
    name: "Gestão de Tráfego",
    short: "Anúncios que trazem o cliente certo",
    description: "Campanhas no Google e Meta que colocam seu negócio na frente de quem compra.",
    long: "Planejamos, criamos e otimizamos campanhas no Google Ads e Meta Ads para atrair clientes prontos para comprar, com acompanhamento de resultados e otimização contínua do investimento.",
    keyword: "gestão de tráfego pago",
    icon: "◮",
  },
  {
    slug: "social-media",
    name: "Social Media",
    short: "Presença que constrói autoridade",
    description: "Conteúdo e gestão de redes que mantêm seu negócio lembrado e confiável.",
    long: "Gerimos suas redes sociais com conteúdo estratégico, design consistente e calendário de publicações que constroem autoridade, engajamento e confiança para o seu negócio local.",
    keyword: "gestão de social media",
    icon: "◍",
  },
  {
    slug: "google-meu-negocio",
    name: "Google Meu Negócio",
    short: "Página 1 no Google local",
    description: "Perfil configurado e otimizado para aparecer quando buscam perto de você.",
    long: "Configuramos e otimizamos seu perfil do Google Meu Negócio (Google Business Profile) para que sua empresa apareça no mapa e na primeira página quando alguém procura pelo seu serviço na região.",
    keyword: "Google Meu Negócio otimização",
    icon: "◉",
  },
  {
    slug: "ia-no-whatsapp",
    name: "IA no WhatsApp",
    short: "Atende, qualifica e agenda 24h",
    description: "Um agente de IA que responde, qualifica e agenda clientes a qualquer hora.",
    long: "Implementamos um agente de inteligência artificial no seu WhatsApp que responde mensagens, qualifica leads e agenda atendimentos 24 horas por dia, 7 dias por semana — sem perder cliente fora do horário comercial.",
    keyword: "IA no WhatsApp para empresas",
    icon: "◆",
  },
  {
    slug: "manutencao",
    name: "Manutenção Mensal",
    short: "Atualizações e suporte contínuo",
    description: "Atualizações, relatório mensal e suporte para nada ficar desatualizado.",
    long: "Cuidamos do seu site e da sua presença digital com atualizações, monitoramento, relatório mensal e suporte contínuo, para que tudo continue funcionando e convertendo.",
    keyword: "manutenção de sites",
    icon: "⬡",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
