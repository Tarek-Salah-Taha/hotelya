import {
  fetchFilteredHotels,
  fetchFilteredHotelCount,
} from "../_lib/hotelsApi";
import HotelCard from "../_components/HotelCard";
import { notFound } from "next/navigation";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ destination?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;

  const destination = resolvedParams?.destination?.trim() || "";
  if (!destination) notFound();

  const page = parseInt(resolvedParams?.page || "1", 10);
  const limit = 15;

  const [hotelsResult, countResult] = await Promise.all([
    fetchFilteredHotels(destination, "", page, limit),
    fetchFilteredHotelCount(destination, ""),
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

  return (
    <HotelCard
      hotels={hotelsResult.data}
      currentPage={page}
      totalPages={totalPages}
      basePath="/search-results"
      destination={destination}
    />
  );
}
