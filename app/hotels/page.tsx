// import { fetchBasicHotelInfo, fetchHotelCount } from "../_lib/hotelsApi";
// import HotelCard from "../_components/HotelCard";

// export default async function HotelsPage(props: {
//   searchParams: Promise<{ page?: string }>;
// }) {
//   const { page: pageStr } = await props.searchParams;
//   const page = parseInt(pageStr || "1", 10);
//   const limit = 15;

//   const [hotels, totalCount] = await Promise.all([
//     fetchBasicHotelInfo(page, limit),
//     fetchHotelCount(),
//   ]);

//   const totalPages = Math.ceil(totalCount / limit);

//   return (
//     <HotelCard hotels={hotels} currentPage={page} totalPages={totalPages} />
//   );
// }

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

import { fetchBasicHotelInfo, fetchHotelCount } from "../_lib/hotelsApi";
import HotelCard from "../_components/HotelCard";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr ?? "1", 10);
  const limit = 15;

  const [hotels, totalCount] = await Promise.all([
    fetchBasicHotelInfo(page, limit),
    fetchHotelCount(),
  ]);

  console.log(hotels, totalCount);

  const totalPages = Math.ceil(totalCount / limit);

  if (!hotels) notFound();

  return (
    <HotelCard hotels={hotels} currentPage={page} totalPages={totalPages} />
  );
}
