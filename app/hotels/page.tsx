import { fetchBasicHotelInfo, fetchHotelCount } from "../_lib/hotelsApi";
import HotelCard from "../_components/HotelCard";

type Props = {
  searchParams: { page?: string };
};

export default async function HotelsPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 15;

  const [hotels, totalCount] = await Promise.all([
    fetchBasicHotelInfo(page, limit),
    fetchHotelCount(),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <HotelCard hotels={hotels} currentPage={page} totalPages={totalPages} />
  );
}
