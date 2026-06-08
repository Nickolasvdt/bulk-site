import { SITE, SERVICES, getService } from "@/lib/site-config";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  email: SITE.email,
  telephone: `+${SITE.whatsapp}`,
  description: SITE.description,
  areaServed: SITE.city,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  sameAs: [`https://instagram.com/${SITE.instagram}`],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "pt-BR",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "SiteNavigationElement",
    position: i + 1,
    name: s.name,
    url: `${SITE.url}/servicos/${s.slug}`,
  })),
};

export function serviceSchema(slug: string) {
  const s = getService(slug);
  if (!s) return {};
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.long,
    provider: { "@type": "LocalBusiness", name: SITE.name, url: SITE.url },
    areaServed: SITE.city,
    url: `${SITE.url}/servicos/${s.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqSchema(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}

export function articleSchema(p: {
  title: string;
  description: string;
  slug: string;
  date: string;
  cover?: string;
}) {
  const url = `${SITE.url}/blog/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: p.cover ? [p.cover] : undefined,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}
