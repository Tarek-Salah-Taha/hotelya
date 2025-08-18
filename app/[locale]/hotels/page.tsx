import { fetchHotelsPageData } from "@/app/_lib/hotelsApi";
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

  const currentPage = Number(page) > 0 ? Number(page) : 1;
  const limit = 15;

  const { hotels, filters, totalPages } = await fetchHotelsPageData({
    page: currentPage,
    limit,
    locale,
  });

  if (!hotels || hotels.length === 0) notFound();

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6">
      <div className="lg:grid lg:grid-cols-[300px_1fr] gap-6">
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
