// Conteúdo rico por serviço para as landing pages /servicos/[slug].
// Mantém site-config.ts enxuto; aqui vive a copy de conversão + SEO.

export type ServiceDetail = {
  heroImage: string;
  promise: string; // subheadline forte (abaixo do H1)
  intro: string; // parágrafo de abertura (usa a palavra-chave naturalmente)
  benefits: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "criacao-de-sites": {
    heroImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1400&q=80",
    promise: "Um site profissional no ar em 7 dias — feito para vender, não só para existir.",
    intro:
      "A criação de sites da Bulk entrega muito mais que uma página bonita: um site rápido, mobile-first e otimizado para o Google, que transforma quem visita em cliente. Domínio, hospedagem e otimização inicial já vêm inclusos.",
    benefits: [
      { title: "No ar em 7 dias", text: "Processo enxuto e sem enrolação: do briefing ao site publicado em uma semana." },
      { title: "Mobile-first e veloz", text: "A maioria dos seus clientes acessa pelo celular. Seu site carrega rápido e funciona perfeito em qualquer tela." },
      { title: "Pronto para o Google", text: "Estrutura, títulos e velocidade otimizados desde o primeiro dia para você ser encontrado." },
      { title: "Feito para converter", text: "Botões de WhatsApp, chamadas claras e caminhos diretos para o cliente entrar em contato." },
    ],
    steps: [
      { title: "Diagnóstico", text: "Entendemos seu negócio, seus clientes e o que o site precisa fazer por você." },
      { title: "Criação", text: "Desenhamos e desenvolvemos o site sob medida, com seu conteúdo e identidade." },
      { title: "No ar", text: "Publicamos com domínio e hospedagem, testamos tudo e deixamos pronto para receber clientes." },
    ],
    faqs: [
      { q: "Quanto tempo leva para o site ficar pronto?", a: "Nosso prazo padrão é 7 dias corridos após a aprovação do briefing e o envio do conteúdo." },
      { q: "O domínio e a hospedagem estão inclusos?", a: "Sim. Cuidamos do domínio, da hospedagem e da configuração técnica — você não precisa se preocupar com nada disso." },
      { q: "Consigo atualizar o site depois?", a: "Sim. Você pode pedir alterações pela manutenção mensal ou solicitar mudanças pontuais quando precisar." },
    ],
  },

  "gestao-de-trafego": {
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    promise: "Anúncios no Google e Meta que trazem o cliente certo — com investimento sob controle.",
    intro:
      "A gestão de tráfego pago da Bulk coloca seu negócio na frente de quem já está pronto para comprar. Planejamos, criamos e otimizamos campanhas no Google Ads e Meta Ads com foco em retorno: menos clique desperdiçado, mais cliente no WhatsApp.",
    benefits: [
      { title: "Cliente com intenção de compra", text: "Aparecemos no momento em que a pessoa procura o seu serviço — quando ela está pronta para decidir." },
      { title: "Investimento controlado", text: "Você sabe quanto entra e quanto retorna. Cortamos o que não converte e reforçamos o que funciona." },
      { title: "Google + Meta", text: "Capturamos a demanda no Google e ampliamos alcance e remarketing no Instagram e Facebook." },
      { title: "Otimização contínua", text: "Acompanhamos as campanhas de perto e ajustamos toda semana para melhorar o resultado." },
    ],
    steps: [
      { title: "Estratégia", text: "Definimos objetivo, público, região e o orçamento ideal para o seu momento." },
      { title: "Campanhas", text: "Criamos anúncios e páginas de destino afiadas para o clique virar contato." },
      { title: "Otimização", text: "Medimos, cortamos desperdício e realocamos a verba para o que traz cliente." },
    ],
    faqs: [
      { q: "Qual o investimento mínimo em anúncios?", a: "Depende do seu objetivo e da concorrência na sua região. No diagnóstico, indicamos um valor realista para gerar resultado sem desperdício." },
      { q: "Em quanto tempo vejo resultado?", a: "O tráfego pago gera contatos desde os primeiros dias. As primeiras semanas servem para calibrar e melhorar o custo por cliente." },
      { q: "O valor dos anúncios está incluso no serviço?", a: "Não. A gestão é o nosso trabalho; o investimento em mídia vai direto para o Google/Meta e fica sob seu controle." },
    ],
  },

  "social-media": {
    heroImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1400&q=80",
    promise: "Conteúdo estratégico que constrói autoridade e mantém seu negócio lembrado.",
    intro:
      "A gestão de social media da Bulk transforma suas redes em um canal de autoridade e relacionamento. Com conteúdo planejado, design consistente e calendário de publicações, seu negócio fica presente e confiável — e o seguidor vira cliente.",
    benefits: [
      { title: "Estratégia, não improviso", text: "Pilares de conteúdo definidos: autoridade, prova, oferta e conexão. Nada de postar no impulso." },
      { title: "Presença consistente", text: "Calendário e ritmo definidos para o algoritmo e o público recompensarem a regularidade." },
      { title: "Design da sua marca", text: "Publicações com identidade visual coerente que passam profissionalismo." },
      { title: "Foco em conversão", text: "Cada post com chamada clara para o cliente chamar no WhatsApp ou visitar o site." },
    ],
    steps: [
      { title: "Planejamento", text: "Definimos pilares, tom de voz e o calendário de conteúdo do mês." },
      { title: "Produção", text: "Criamos os posts com design e textos alinhados à sua marca." },
      { title: "Publicação", text: "Publicamos, acompanhamos os números e ajustamos o que dá mais resultado." },
    ],
    faqs: [
      { q: "Vocês criam o conteúdo ou eu preciso enviar?", a: "Nós criamos. Você pode enviar fotos e novidades do dia a dia, e cuidamos de transformar isso em conteúdo estratégico." },
      { q: "Quantos posts por mês?", a: "Definimos a frequência no diagnóstico, de acordo com o seu objetivo. Consistência vale mais do que volume." },
      { q: "Social media substitui anúncios?", a: "Não — se completam. As redes constroem autoridade no longo prazo; os anúncios aceleram o alcance e a venda." },
    ],
  },

  "google-meu-negocio": {
    heroImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80",
    promise: "Apareça no mapa e na página 1 quando buscam seu serviço perto de você.",
    intro:
      "A otimização do Google Meu Negócio (Google Business Profile) coloca sua empresa no Local Pack — aquele bloco com mapa e avaliações que aparece antes de tudo. Configuramos e otimizamos seu perfil para você ser encontrado por quem procura na sua região.",
    benefits: [
      { title: "Visível na busca local", text: "Apareça quando alguém pesquisa o seu serviço com 'perto de mim' na sua região." },
      { title: "Perfil 100% completo", text: "Categoria certa, NAP padronizado, horários, fotos e serviços — tudo que o Google valoriza." },
      { title: "Mais ligações e rotas", text: "Um perfil otimizado gera mais cliques, ligações e pedidos de rota até você." },
      { title: "Estratégia de avaliações", text: "Orientação para receber e responder avaliações — o sinal mais forte do ranqueamento local." },
    ],
    steps: [
      { title: "Auditoria", text: "Analisamos seu perfil atual e a concorrência na sua região." },
      { title: "Otimização", text: "Configuramos categoria, informações, fotos e serviços para máxima relevância." },
      { title: "Crescimento", text: "Implantamos a rotina de avaliações e posts que mantém o perfil forte." },
    ],
    faqs: [
      { q: "Funciona para o meu tipo de negócio?", a: "Funciona para qualquer negócio com endereço físico ou que atenda uma área geográfica definida — comércio, serviços, clínicas, alimentação e mais." },
      { q: "Em quanto tempo subo nas buscas?", a: "Os primeiros efeitos de um perfil bem configurado costumam aparecer em poucas semanas; a autoridade cresce com avaliações e consistência." },
      { q: "Preciso ter site para isso funcionar?", a: "Não é obrigatório, mas um site reforça muito o resultado: Google + site profissional é a dupla que mais converte no local." },
    ],
  },

  "ia-no-whatsapp": {
    heroImage: "https://images.unsplash.com/photo-1563986768817-257bf91c5753?auto=format&fit=crop&w=1400&q=80",
    promise: "Um agente de IA que atende, qualifica e agenda no seu WhatsApp — 24h por dia.",
    intro:
      "A IA no WhatsApp da Bulk garante que você nunca mais perca um cliente por demora na resposta. Um agente inteligente responde na hora, tira dúvidas, qualifica o interesse e agenda — domingo às 23h ou no pico do movimento, sem parar.",
    benefits: [
      { title: "Resposta em segundos", text: "Quem responde primeiro fecha a venda. O agente atende na hora, a qualquer momento." },
      { title: "Qualifica os leads", text: "Faz as perguntas certas e entrega ao seu time apenas o que vale o tempo dele." },
      { title: "Agenda sozinho", text: "Oferece horários, confirma e organiza — sua agenda começa a semana cheia." },
      { title: "Com a sua cara", text: "Configurado com o tom da sua marca e regras claras de quando chamar um humano." },
    ],
    steps: [
      { title: "Mapeamento", text: "Levantamos as perguntas reais dos seus clientes e o objetivo de cada conversa." },
      { title: "Configuração", text: "Montamos o agente com o seu tom, suas regras e os caminhos de repasse." },
      { title: "Ajuste fino", text: "Acompanhamos as conversas reais e refinamos para aumentar a conversão." },
    ],
    faqs: [
      { q: "A IA substitui meu atendente?", a: "Não — complementa. Ela cuida do primeiro contato e do fora do expediente, e passa para você o que exige toque humano." },
      { q: "Funciona no meu número atual?", a: "Sim. Implementamos no WhatsApp do seu negócio, mantendo o atendimento humano disponível quando necessário." },
      { q: "E se a IA não souber responder?", a: "Ela é configurada para reconhecer o limite e encaminhar a conversa para uma pessoa, sem deixar o cliente na mão." },
    ],
  },

  "manutencao": {
    heroImage: "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=1400&q=80",
    promise: "Seu site sempre no ar, atualizado e seguro — com relatório e suporte todo mês.",
    intro:
      "A manutenção mensal da Bulk cuida da sua presença digital para você focar no negócio. Atualizações de segurança, monitoramento, pequenos ajustes de conteúdo e um relatório mensal mantêm tudo funcionando e convertendo, sem dor de cabeça.",
    benefits: [
      { title: "Sempre no ar e seguro", text: "Monitoramento e atualizações de segurança para evitar site fora do ar ou desatualizado." },
      { title: "Relatório mensal", text: "Você recebe um panorama de desempenho e do que foi feito no mês." },
      { title: "Ajustes inclusos", text: "Pequenas alterações de conteúdo e melhorias entram na rotina, sem custo extra." },
      { title: "Suporte prioritário", text: "Resposta rápida por WhatsApp e e-mail quando você precisar." },
    ],
    steps: [
      { title: "Monitoramento", text: "Acompanhamos seu site continuamente para agir antes do problema aparecer." },
      { title: "Manutenção", text: "Aplicamos atualizações, ajustes e melhorias ao longo do mês." },
      { title: "Relatório", text: "Enviamos o resumo do mês com tudo que foi feito e os próximos passos." },
    ],
    faqs: [
      { q: "A manutenção é obrigatória?", a: "Não — é um serviço contínuo opcional. Mas é o que garante que seu site continue rápido, seguro e atualizado ao longo do tempo." },
      { q: "O que entra nas alterações inclusas?", a: "Pequenas mudanças de texto, imagens, horários e ajustes de conteúdo. Mudanças grandes são orçadas à parte." },
      { q: "Como peço uma alteração?", a: "Basta chamar no WhatsApp. Clientes com manutenção ativa têm suporte prioritário." },
    ],
  },
};

export function getServiceDetail(slug: string) {
  return SERVICE_DETAILS[slug];
}
