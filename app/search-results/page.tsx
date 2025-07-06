export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

import {
  fetchFilteredHotels,
  fetchFilteredHotelCount,
} from "../_lib/hotelsApi";
import HotelCard from "../_components/HotelCard";
import { notFound } from "next/navigation";

type SearchParams = {
  destination?: string;
  page?: string;
};

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const destination = searchParams.destination || "";
  if (!destination) notFound();

  const city = destination.trim();
  const country = "";

  if (!city) notFound();

  const page = parseInt(searchParams.page || "1", 10);
  const limit = 15;

  const [hotelsResult, countResult] = await Promise.all([
    fetchFilteredHotels(city, country, page, limit),
    fetchFilteredHotelCount(city, country),
  ]);

  console.log(destination);

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
    />
  );
}
