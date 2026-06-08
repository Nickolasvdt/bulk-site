import type { MetadataRoute } from "next";
import { SITE, SERVICES } from "@/lib/site-config";
import { getAllPosts, getTotalPages } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticRoutes: MetadataRoute.Sitemap = ["", "/orcamento", "/blog"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/servicos/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogPageRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, getTotalPages() - 1) },
    (_, i) => ({
      url: `${base}/blog/page/${i + 2}`,
      changeFrequency: "weekly",
      priority: 0.5,
    })
  );

  return [...staticRoutes, ...serviceRoutes, ...blogPageRoutes, ...postRoutes];
}
