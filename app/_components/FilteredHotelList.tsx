"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import HotelFilters from "./HotelFilters";
import HotelCard from "./HotelCard";
import Spinner from "./Spinner";
import NoResults from "./NoResults";
import { fetchFilteredHotels } from "../_lib/hotelsApi";
import { HotelFilterData, HotelCardData, SupportedLang } from "../_types/types";

type Props = {
  filters: HotelFilterData[];
  locale: SupportedLang;
  initialHotels: HotelCardData[];
  initialTotalPages: number;
};

const limit = 15;

export default function FilteredHotelList({
  filters,
  locale,
  initialHotels,
  initialTotalPages,
}: Props) {
  const searchParams = useSearchParams();
  const [filteredHotels, setFilteredHotels] = useState<HotelCardData[]>([]);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Parse filter params from URL
  const filterParams = useMemo(() => {
    const getArray = (key: string) =>
      searchParams.get(key)?.split(",").map(decodeURIComponent) ?? [];

    return {
      continent: getArray("continent"),
      country: searchParams.get("country") || "",
      city: searchParams.get("city") || "",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || 1000,
      ratingLabels: getArray("ratingLabels"),
      stars: getArray("stars").map(Number),
      paymentOptions: getArray("paymentOptions"),
      languagesSpoken: getArray("languagesSpoken"),
      sort: searchParams.get("sort") || "", // Add this line
    };
  }, [searchParams]);

  useEffect(() => {
    const hasFilters = searchParams.toString() !== "";

    const fetchData = async () => {
      try {
        const result = await fetchFilteredHotels({
          ...filterParams,
          locale,
          page: currentPage,
          limit,
        });

        setFilteredHotels(result.data);
        setTotalPages(Math.ceil(result.count / limit));
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setFilteredHotels([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (hasFilters) {
      setIsLoading(true);
      fetchData();
    } else {
      setFilteredHotels(initialHotels);
      setIsLoading(false);
    }
  }, [filterParams, currentPage, locale, searchParams, initialHotels]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <HotelFilters
          filters={filters}
          locale={locale}
          onApplyFilters={() => setCurrentPage(1)}
        />
      </aside>

      {/* Mobile drawer */}
      <div className="block lg:hidden mb-4">
        <details className="border border-gray-300 rounded-lg">
          <summary className="cursor-pointer px-4 py-2 font-medium bg-gray-100 rounded-t-lg">
            Filters
          </summary>
          <div className="p-4">
            <HotelFilters
              filters={filters}
              locale={locale}
              onApplyFilters={() => setCurrentPage(1)}
            />
          </div>
        </details>
      </div>

      {/* Hotel Cards */}
      <main className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner />
          </div>
        ) : filteredHotels.length === 0 ? (
          <NoResults message="Sorry, we couldn't find any hotels matching your filters." />
        ) : (
          <HotelCard
            hotels={filteredHotels}
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/hotels"
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </main>
    </>
  );
}
