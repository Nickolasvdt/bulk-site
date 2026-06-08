import type { Metadata } from "next";
import { BlogListView } from "@/components/blog/BlogListView";

export const metadata: Metadata = {
  title: "Blog — Marketing digital para negócio local",
  description:
    "Dicas práticas de criação de sites, Google Meu Negócio, tráfego pago, social media e IA no WhatsApp para negócios locais venderem mais.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return <BlogListView page={1} />;
}
