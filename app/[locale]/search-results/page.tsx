import HotelCardList from "@/app/_components/HotelCardList";
import NoResults from "@/app/_components/NoResults";
import {
  fetchHotelCountByCity,
  fetchFilteredHotels,
} from "@/app/_lib/hotelsApi";
import { normalizeLocalizedFields } from "@/app/_lib/normalizeLocalizedFields";
import { HotelCardData, SupportedLang } from "@/app/_types/types";

export default async function SearchResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: SupportedLang }>;
  searchParams: Promise<{
    destination?: string;
    page?: string;
  }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const destination = resolvedSearchParams.destination?.trim() || "";

  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const limit = 15;

  const locale = resolvedParams.locale || "en";

  const [hotelsResult, countResult] = await Promise.all([
    fetchFilteredHotels({
      city: destination,
      locale,
      page,
      limit,
    }),
    fetchHotelCountByCity(destination, locale),
  ]);

  if (hotelsResult.data.length === 0 || countResult.count === 0) {
    return (
      <NoResults
        message="No results found"
        buttonText="Back to search page"
        destination="/"
      />
    );
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
    <div className="px-4 md:px-6 lg:px-8 py-6">
      <HotelCardList
        hotels={normalizedHotels}
        currentPage={page}
        totalPages={totalPages}
        basePath="/search-results"
        destination={destination}
      />
    </div>
  );
}
