"use client";

import HotelCardItem from "./HotelCardItem";
import { HotelCardProps, SupportedLang } from "../_types/types";
import { useTranslations, useLocale } from "next-intl";
import HotelsPagination from "./HotelsPagination";

export default function HotelCardList({
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
        <HotelsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          localizedPath={localizedPath}
          createQuery={createQuery}
          onPageChange={onPageChange}
          t={t}
        />
      )}
    </div>
  );
}
