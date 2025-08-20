"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import HotelFilters from "./HotelFilters";
import HotelCardList from "./HotelCardList";
import Spinner from "./Spinner";
import NoResults from "./NoResults";
import { fetchFilteredHotels } from "../_lib/hotelsApi";
import { HotelFilterData, HotelCardData, SupportedLang } from "../_types/types";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { useTranslations } from "next-intl";

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
  const [isOpen, setIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [isLoading, setIsLoading] = useState(true);

  const tFilters = useTranslations("FiltersPage");

  // Memoize the searchParams dependency
  const searchParamsString = useMemo(
    () => searchParams.toString(),
    [searchParams]
  );

  // Update currentPage when URL changes
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParamsString, searchParams]);

  // Memoize filter params parsing
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
      sort: searchParams.get("sort") || "",
    };
  }, [searchParams]);

  // Memoize the fetch function
  const fetchHotels = useCallback(async () => {
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
  }, [filterParams, currentPage, locale]);

  useEffect(() => {
    if ([...searchParams.keys()].length > 0) {
      setIsLoading(true);
      fetchHotels();
    } else {
      setFilteredHotels(initialHotels);
      setTotalPages(initialTotalPages);
      setIsLoading(false);
    }
  }, [
    fetchHotels,
    searchParamsString,
    initialHotels,
    initialTotalPages,
    searchParams,
  ]);

  // Memoize the toggle function for the mobile drawer
  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Memoize the reset page function
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Memoize the main content to avoid unnecessary re-renders
  const mainContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-10">
          <Spinner />
        </div>
      );
    }

    if (filteredHotels.length === 0) {
      return (
        <NoResults
          message="Sorry, we couldn't find any hotels matching your filters"
          buttonText="Reset Filters"
          destination="/hotels"
        />
      );
    }

    return (
      <HotelCardList
        hotels={filteredHotels}
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/hotels"
      />
    );
  }, [isLoading, filteredHotels, currentPage, totalPages]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <HotelFilters
          filters={filters}
          locale={locale}
          onApplyFilters={resetPage}
        />
      </aside>

      {/* Mobile drawer */}
      <div className="block lg:hidden mb-6">
        <motion.div
          className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          whileHover={{ scale: 1.005 }}
        >
          <motion.button
            onClick={toggleDrawer}
            className="w-full px-5 py-3 bg-gray-50 hover:bg-gray-100 
                flex items-center justify-between text-gray-700
                transition-colors focus:outline-none
                focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            whileTap={{ scale: 0.98 }}
            aria-expanded={isOpen}
          >
            <div className="font-semibold text-gray-800 flex items-center gap-3">
              {isOpen ? tFilters("Hide filters") : tFilters("Show filters")}
            </div>
            {isOpen ? (
              <FaChevronCircleUp className="text-primary" />
            ) : (
              <FaChevronCircleDown className="text-primary" />
            )}
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div className="bg-white border-t border-gray-100">
                <div className="p-4 border-t border-gray-100">
                  <HotelFilters
                    filters={filters}
                    locale={locale}
                    onApplyFilters={resetPage}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Hotel Cards */}
      <main className="w-full">{mainContent}</main>
    </>
  );
}
