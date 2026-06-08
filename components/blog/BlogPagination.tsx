import Link from "next/link";

function pageHref(page: number) {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

const base =
  "inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 rounded-full border text-[14px] font-semibold transition";

export function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginação do blog"
      className="flex flex-wrap items-center justify-center gap-2 mt-16"
    >
      {currentPage > 1 && (
        <Link
          href={pageHref(currentPage - 1)}
          aria-label="Página anterior"
          className={`${base} border-rule text-ink hover:border-accent hover:text-accent`}
        >
          ←
        </Link>
      )}

      {pages.map((p) =>
        p === currentPage ? (
          <span
            key={p}
            aria-current="page"
            className={`${base} border-accent bg-accent text-white`}
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p)}
            aria-label={`Página ${p}`}
            className={`${base} border-rule text-ink hover:border-accent hover:text-accent`}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={pageHref(currentPage + 1)}
          aria-label="Próxima página"
          className={`${base} border-rule text-ink hover:border-accent hover:text-accent`}
        >
          →
        </Link>
      )}
    </nav>
  );
}
