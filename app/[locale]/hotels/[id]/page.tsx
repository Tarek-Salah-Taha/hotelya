import HotelPage from "@/app/_components/HotelPage";
import HotelReviews from "@/app/_components/HotelReviews";
import { fetchHotelPageData } from "@/app/_lib/hotelsApi";
import { SupportedLang } from "@/app/_types/types";

type PageParams = {
  params: Promise<{
    id: number;
    locale: SupportedLang;
  }>;
};

export default async function Page({ params }: PageParams) {
  const { id, locale } = await params;

  const { hotel, rooms, reviews } = await fetchHotelPageData(id, locale);

  return (
    <>
      <HotelPage hotel={hotel} rooms={rooms} />
      <HotelReviews initialReviews={reviews} hotelId={id} />
    </>
  );
}
