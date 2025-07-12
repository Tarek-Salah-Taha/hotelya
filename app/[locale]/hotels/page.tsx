// import HotelCard from "@/app/_components/HotelCard";
// import { fetchBasicHotelInfo, fetchHotelCount } from "@/app/_lib/hotelsApi";
// import { SupportedLang } from "@/app/_types/types";
// import { notFound } from "next/navigation";

// export default async function Page({
//   params,
//   searchParams,
// }: {
//   params: { locale: SupportedLang };
//   searchParams: { page?: string };
// }) {
//   const locale = params.locale;

//   console.log("Current language:", locale);

//   const { page = "1" } = searchParams;

//   const limit = 15;
//   const currentPage = parseInt(page, 10);

//   const [hotels, totalCount] = await Promise.all([
//     fetchBasicHotelInfo(currentPage, limit, locale),
//     fetchHotelCount(),
//   ]);

//   const totalPages = Math.ceil(totalCount / limit);

//   if (!hotels || hotels.length === 0) notFound();

//   return (
//     <HotelCard
//       hotels={hotels}
//       currentPage={currentPage}
//       totalPages={totalPages}
//       // basePath={`${locale}/hotels`}
//       basePath="/hotels"
//     />
//   );
// }

import { fetchBasicHotelInfo, fetchHotelCount } from "@/app/_lib/hotelsApi";
import HotelCard from "@/app/_components/HotelCard";
import { SupportedLang } from "@/app/_types/types";
import { notFound } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: SupportedLang }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;

  const pageStr = page ?? "1";
  const currentPage = parseInt(pageStr, 10) || 1;

  const limit = 15;

  const [hotels, totalCount] = await Promise.all([
    fetchBasicHotelInfo(currentPage, limit, locale),
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
