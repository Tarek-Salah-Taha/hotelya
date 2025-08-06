"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import HotelFilters from "./HotelFilters";
import HotelCard from "./HotelCard";
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
  // Update this line to get the initial page from URL
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [isLoading, setIsLoading] = useState(true);

  const tFilters = useTranslations("FiltersPage");

  // Add this effect to update currentPage when URL changes
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

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

    if ([...searchParams.keys()].length > 0) {
      setIsLoading(true);
      fetchData();
    } else {
      setFilteredHotels(initialHotels);
      setTotalPages(initialTotalPages);
      setIsLoading(false);
    }
  }, [
    filterParams,
    currentPage,
    locale,
    searchParams,
    initialHotels,
    initialTotalPages,
  ]);

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

      <div className="block lg:hidden mb-6">
        <motion.div
          className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          whileHover={{ scale: 1.005 }}
        >
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
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
              <>
                <FaChevronCircleUp className="text-primary" />
              </>
            ) : (
              <>
                <FaChevronCircleDown className="text-primary" />
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white border-t border-gray-100"
              >
                <div className="p-4 border-t border-gray-100">
                  <HotelFilters
                    filters={filters}
                    locale={locale}
                    onApplyFilters={() => setCurrentPage(1)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Hotel Cards */}
      <main className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner />
          </div>
        ) : filteredHotels.length === 0 ? (
          <NoResults
            message={tFilters(
              "Sorry, we couldn't find any hotels matching your filters"
            )}
          />
        ) : (
          <HotelCard
            hotels={filteredHotels}
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/hotels"
          />
        )}
      </main>
    </>
  );
}
