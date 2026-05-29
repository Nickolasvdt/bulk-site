import { VLibras } from "@/components/ui/VLibras";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Acessibilidade em Libras para o conteúdo do blog */}
      <VLibras />
    </>
  );
}
