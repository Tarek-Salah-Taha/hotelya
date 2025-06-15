import HotelPage from "@/app/_components/HotelPage";
import HotelReviews from "@/app/_components/HotelReviews";
import { fetchHotelInfo } from "@/app/_lib/hotelsApi";
import { getHotelReviews } from "@/app/_lib/reviewsApi";
import { getRooms } from "@/app/_lib/roomsApi";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [hotel, reviews, rooms] = await Promise.all([
    fetchHotelInfo(id),
    getHotelReviews(id),
    getRooms(id),
  ]);

  return (
    <>
      <HotelPage hotel={hotel} rooms={rooms} />
      <HotelReviews initialReviews={reviews} hotelId={id} />
    </>
  );
}
