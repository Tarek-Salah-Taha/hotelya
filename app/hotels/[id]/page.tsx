import HotelPage from "@/app/_components/HotelPage";
import HotelReviews from "@/app/_components/HotelReviews";
import { fetchHotelInfo } from "@/app/_lib/hotelsApi";
import { getHotelReviews } from "@/app/_lib/reviewsApi";
import { getRooms } from "@/app/_lib/roomsApi";

async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
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

export default Page;
