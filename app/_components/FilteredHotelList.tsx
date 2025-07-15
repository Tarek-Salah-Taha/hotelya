"use client";

import { useEffect, useState } from "react";
import HotelFilters from "./HotelFilters";
import HotelCard from "./HotelCard";
import Spinner from "./Spinner";
import { fetchFilteredHotels } from "../_lib/hotelsApi";
import { HotelFilterData, HotelCardData, SupportedLang } from "../_types/types";
import NoResults from "./NoResults";

type Props = {
  filters: HotelFilterData[];
  locale: SupportedLang;
  initialHotels: HotelCardData[];
  initialTotalPages: number;
  layout?: "filters" | "hotels"; // optional layout toggle
};

export default function FilteredHotelList({
  filters,
  locale,
  initialHotels,
  initialTotalPages,
}: Props) {
  const [filteredHotels, setFilteredHotels] = useState(initialHotels);
  const [filterParams, setFilterParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 15;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [filterParams, locale, currentPage]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <HotelFilters
          filters={filters}
          locale={locale}
          onApplyFilters={(filters) => {
            setFilterParams(filters);
            setCurrentPage(1);
          }}
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
              onApplyFilters={(filters) => {
                setFilterParams(filters);
                setCurrentPage(1);
              }}
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
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        )}
      </main>
    </>
  );
}
