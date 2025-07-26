import HotelCard from "@/app/_components/HotelCard";
import {
  fetchFilteredHotelCount,
  fetchFilteredHotels,
} from "@/app/_lib/hotelsApi";
import { normalizeLocalizedFields } from "@/app/_lib/normalizeLocalizedFields";
import { HotelCardData, SupportedLang } from "@/app/_types/types";
import { notFound } from "next/navigation";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{
    destination?: string;
    page?: string;
    locale: SupportedLang;
  }>;
}) {
  const resolvedParams = await searchParams;

  const destination = resolvedParams?.destination?.trim() || "";
  if (!destination) notFound();

  const page = parseInt(resolvedParams?.page || "1", 10);
  const limit = 15;

  const locale = resolvedParams?.locale || "en";

  const [hotelsResult, countResult] = await Promise.all([
    fetchFilteredHotels({
      city: destination,
      locale,
      page,
      limit,
    }),
    fetchFilteredHotelCount(destination, "", locale),
  ]);

  const totalPages = Math.ceil((countResult.count || 0) / limit);

  const normalizedHotels = hotelsResult.data.map((hotel) =>
    normalizeLocalizedFields<HotelCardData>(hotel, locale, [
      "hotelName",
      "city",
      "country",
      "tags",
    ])
  );

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6">
      <HotelCard
        hotels={normalizedHotels}
        currentPage={page}
        totalPages={totalPages}
        basePath="/search-results"
        // basePath={`${locale}/search-results`}
        destination={destination}
      />
    </div>
  );
}
