import HotelCardItem from "./HotelCardItem";
import { HotelCardData } from "@/app/_types/types";

type HotelCardProps = {
  hotels: HotelCardData[];
  currentPage: number;
  totalPages: number;
};

export default function HotelCard({
  hotels,
  currentPage,
  totalPages,
}: HotelCardProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCardItem key={hotel.id} hotel={hotel} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 m-6 flex-wrap">
        {/* Prev */}
        <a
          href={`?page=${Math.max(currentPage - 1, 1)}`}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 pointer-events-none"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Prev
        </a>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(totalPages, currentPage + 2)
          )
          .map((page) => (
            <a
              key={page}
              href={`?page=${page}`}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {page}
            </a>
          ))}

        {/* Next */}
        <a
          href={`?page=${Math.min(currentPage + 1, totalPages)}`}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 pointer-events-none"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Next
        </a>
      </div>
    </div>
  );
}
