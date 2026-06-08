import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTotalPages } from "@/lib/blog";
import { BlogListView } from "@/components/blog/BlogListView";

export function generateStaticParams() {
  const total = getTotalPages();
  const params: { page: string }[] = [];
  for (let p = 2; p <= total; p++) params.push({ page: String(p) });
  return params;
}

export async function generateMetadata(
  { params }: { params: Promise<{ page: string }> }
): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog da Bulk — Página ${page}`,
    description:
      "Dicas práticas de criação de sites, Google Meu Negócio, tráfego pago, social media e IA no WhatsApp para negócios locais venderem mais.",
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPaginated(
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params;
  const pageNum = Number(page);

  if (!Number.isInteger(pageNum) || pageNum < 2 || pageNum > getTotalPages()) {
    notFound();
  }

  return <BlogListView page={pageNum} />;
}
