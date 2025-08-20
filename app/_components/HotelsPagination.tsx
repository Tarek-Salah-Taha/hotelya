import Link from "next/link";
import PageNav from "./PageNav";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  localizedPath: string;
  createQuery: (page: number) => Record<string, string | number>;
  onPageChange?: (page: number) => void;
  t: (key: string) => string;
};

export default function HotelsPagination({
  currentPage,
  totalPages,
  localizedPath,
  createQuery,
  onPageChange,
  t,
}: PaginationProps) {
  const renderPage = (page: number) => {
    const commonClasses = `px-3 py-1 rounded ${
      currentPage === page
        ? "bg-primary text-white"
        : "bg-gray-100 hover:bg-gray-200"
    }`;

    if (onPageChange) {
      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={commonClasses}
        >
          {page}
        </button>
      );
    }

    return (
      <Link
        key={page}
        href={{ pathname: localizedPath, query: createQuery(page) }}
        className={commonClasses}
      >
        {page}
      </Link>
    );
  };

  // Show window of 5 pages around current
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex justify-center items-center gap-2 m-6 flex-wrap">
      {/* Prev */}
      <PageNav
        disabled={currentPage === 1}
        href={{ pathname: localizedPath, query: createQuery(currentPage - 1) }}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        {t("Prev")}
      </PageNav>

      {/* Page Numbers */}
      {pages.map(renderPage)}

      {/* Next */}
      <PageNav
        disabled={currentPage === totalPages}
        href={{ pathname: localizedPath, query: createQuery(currentPage + 1) }}
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        {t("Next")}
      </PageNav>
    </div>
  );
}
