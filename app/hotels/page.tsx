// No dynamic export needed here

import { fetchBasicHotelInfo, fetchHotelCount } from "../_lib/hotelsApi";
import HotelCard from "../_components/HotelCard";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const limit = 15;
  const currentPage = parseInt(page, 10);

  const [hotels, totalCount] = await Promise.all([
    fetchBasicHotelInfo(currentPage, limit),
    fetchHotelCount(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  if (!hotels || hotels.length === 0) notFound();

  return (
    <HotelCard
      hotels={hotels}
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/hotels"
    />
  );
}
