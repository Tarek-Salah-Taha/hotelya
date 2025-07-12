// import HotelPage from "@/app/_components/HotelPage";
// import HotelReviews from "@/app/_components/HotelReviews";
// import { fetchHotelInfo } from "@/app/_lib/hotelsApi";
// import { getHotelReviews } from "@/app/_lib/reviewsApi";
// import { getRooms } from "@/app/_lib/roomsApi";
// import { transformHotelFields } from "@/app/_lib/transformHotel";
// import { SupportedLang } from "@/app/_types/types";

// export default async function Page({
//   params,
// }: {
//   params: { id: string; locale: SupportedLang };
// }) {
//   const { id, locale } = params;

//   const [rawHotel, reviews, rooms] = await Promise.all([
//     fetchHotelInfo(id),
//     getHotelReviews(id),
//     getRooms(id),
//   ]);

//   const hotel = transformHotelFields(rawHotel, locale);

//   return (
//     <>
//       <HotelPage hotel={hotel} rooms={rooms} />
//       <HotelReviews initialReviews={reviews} hotelId={id} />
//     </>
//   );
// }

import HotelPage from "@/app/_components/HotelPage";
import HotelReviews from "@/app/_components/HotelReviews";
import { fetchHotelInfo } from "@/app/_lib/hotelsApi";
import { getHotelReviews } from "@/app/_lib/reviewsApi";
import { getRooms } from "@/app/_lib/roomsApi";
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
    fetchHotelInfo(id),
    getHotelReviews(id),
    getRooms(id),
  ]);

  const hotel = transformHotelFields(rawHotel, locale);

  return (
    <>
      <HotelPage hotel={hotel} rooms={rooms} />
      <HotelReviews initialReviews={reviews} hotelId={id} />
    </>
  );
}
