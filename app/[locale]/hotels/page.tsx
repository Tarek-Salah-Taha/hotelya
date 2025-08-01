// app/(locale)/hotels/page.tsx or similar
import { fetchBasicHotelInfo, fetchHotelCount } from "@/app/_lib/hotelsApi";
import { fetchFilters } from "@/app/_lib/filtersApi";
import FilteredHotelList from "@/app/_components/FilteredHotelList";
import { SupportedLang } from "@/app/_types/types";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: SupportedLang }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;

  const pageStr = page ?? "1";
  const currentPage = parseInt(pageStr, 10) || 1;
  const limit = 15;

  const [hotels, filters] = await Promise.all([
    fetchBasicHotelInfo(currentPage, limit, locale),
    fetchFilters({ locale }),
  ]);

  const totalCount =
    hotels.length < limit ? hotels.length : await fetchHotelCount();
  const totalPages = Math.ceil(totalCount / limit);

  if (!hotels || hotels.length === 0) notFound();

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6">
      <div className="lg:grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Always render one FilteredHotelList */}
        <FilteredHotelList
          filters={filters}
          initialHotels={hotels}
          initialTotalPages={totalPages}
          locale={locale}
        />
      </div>
    </div>
  );
}
