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
import { useHotelFilters } from "../_hooks/useHotelFilters";

type Props = {
  filters: HotelFilterData[];
  locale: SupportedLang;
  initialHotels: HotelCardData[];
  initialTotalPages: number;
};

const LIMIT = 15;

export default function FilteredHotelList({
  filters,
  locale,
  initialHotels,
  initialTotalPages,
}: Props) {
  const searchParams = useSearchParams();
  const [filteredHotels, setFilteredHotels] =
    useState<HotelCardData[]>(initialHotels);
  const [isOpen, setIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const tFilters = useTranslations("FiltersPage");

  // Memoize the searchParams dependency
  const searchParamsString = useMemo(
    () => searchParams.toString(),
    [searchParams]
  );

  // Update currentPage when URL changes
  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);
    const page = parseInt(params.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParamsString]);

  const filterParams = useHotelFilters(searchParamsString);

  // Memoize the fetch function with individual filter params as dependencies
  const fetchHotels = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fetchFilteredHotels({
        ...filterParams,
        locale,
        page: currentPage,
        limit: LIMIT,
      });

      setFilteredHotels(result.data);
      setTotalPages(Math.ceil(result.count / LIMIT));
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setFilteredHotels([]);
    } finally {
      setIsLoading(false);
      setIsFilterLoading(false); // Reset filter loading when fetch completes
    }
  }, [filterParams, currentPage, locale]);

  useEffect(() => {
    const hasSearchParams = searchParamsString.length > 0;

    if (hasSearchParams) {
      fetchHotels();
    } else {
      setFilteredHotels(initialHotels);
      setTotalPages(initialTotalPages);
      setIsLoading(false);
      setIsFilterLoading(false);
    }
  }, [fetchHotels, searchParamsString, initialHotels, initialTotalPages]);

  // Memoize the toggle function for the mobile drawer
  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const resetPage = () => setCurrentPage(1);

  // Handle filter application with loading state
  const handleApplyFilters = useCallback(() => {
    setIsFilterLoading(true);
    resetPage();
  }, []);

  const mainContent = useMemo(() => {
    if (isLoading || isFilterLoading) {
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
  }, [isLoading, isFilterLoading, filteredHotels, currentPage, totalPages]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <HotelFilters
          filters={filters}
          locale={locale}
          onApplyFilters={handleApplyFilters}
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
                    onApplyFilters={handleApplyFilters}
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
