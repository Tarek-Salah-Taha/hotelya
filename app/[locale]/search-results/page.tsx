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
    fetchFilteredHotels(destination, "", page, limit, locale),
    fetchFilteredHotelCount(destination, "", locale),
  ]);

  if (
    !hotelsResult.data ||
    hotelsResult.error ||
    countResult.error ||
    hotelsResult.data.length === 0
  ) {
    console.error("Search error:", hotelsResult.error || countResult.error);
    notFound();
  }

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
    <HotelCard
      hotels={normalizedHotels}
      currentPage={page}
      totalPages={totalPages}
      basePath="/search-results"
      // basePath={`${locale}/search-results`}
      destination={destination}
    />
  );
}
