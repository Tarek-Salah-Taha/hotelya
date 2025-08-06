import HotelPage from "@/app/_components/HotelPage";
import HotelReviews from "@/app/_components/HotelReviews";
import { fetchHotelById } from "@/app/_lib/hotelsApi";
import { fetchHotelReviews } from "@/app/_lib/reviewsApi";
import { fetchRoomsByHotelId } from "@/app/_lib/roomsApi";
import { transformHotelFields } from "@/app/_lib/transformHotel";
import { SupportedLang } from "@/app/_types/types";

type PageParams = {
  params: Promise<{
    id: string;
    locale: SupportedLang;
  }>;
};

export default async function Page({ params }: PageParams) {
  const { id, locale } = await params;

  const [rawHotel, reviews, rooms] = await Promise.all([
    fetchHotelById(id),
    fetchHotelReviews(id),
    fetchRoomsByHotelId(id),
  ]);

  const hotel = transformHotelFields(rawHotel, locale);

  return (
    <>
      <HotelPage hotel={hotel} rooms={rooms} />
      <HotelReviews initialReviews={reviews} hotelId={id} />
    </>
  );
}
