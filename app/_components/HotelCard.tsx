"use client";

import Link from "next/link";
import HotelCardItem from "./HotelCardItem";
import { HotelCardProps } from "../_types/types";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function HotelCard({
  hotels,
  currentPage,
  totalPages,
  basePath,
  destination = "",
  onPageChange,
}: HotelCardProps) {
  const locale = useLocale() as SupportedLang;

  const t = useTranslations("HotelsPage");

  const createQuery = (page: number) => {
    const query: Record<string, string | number> = { page };
    if (destination.trim() && basePath === "/search-results") {
      query.destination = destination;
    }
    return query;
  };

  // Add locale prefix to basePath
  const localizedPath = `/${locale}${basePath}`;

  return (
    <div className="space-y-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCardItem key={hotel.id} hotel={hotel} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 m-6 flex-wrap">
          {/* Prev */}
          <Link
            href={{
              pathname: localizedPath,
              query: createQuery(currentPage - 1),
            }}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 pointer-events-none"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            aria-disabled={currentPage === 1}
          >
            {t("Prev")}
          </Link>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 3),
              Math.min(totalPages, currentPage + 2)
            )
            .map((page) =>
              onPageChange ? (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <Link
                  key={page}
                  href={{ pathname: localizedPath, query: createQuery(page) }}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </Link>
              )
            )}

          {/* Next */}
          <Link
            href={{
              pathname: localizedPath,
              query: createQuery(currentPage + 1),
            }}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 pointer-events-none"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            aria-disabled={currentPage === totalPages}
          >
            {t("Next")}
          </Link>
        </div>
      )}
    </div>
  );
}
