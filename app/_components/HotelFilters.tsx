"use client";

import { useState, useEffect, useMemo } from "react";
import {
  HotelFilterData,
  SupportedLang,
  HotelFilterParams,
} from "@/app/_types/types";
import getRatingLabel from "../_lib/getRatingLabel";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import {
  FaGlobe,
  FaFlag,
  FaCity,
  FaMoneyBill,
  FaLanguage,
  FaThumbsUp,
  FaSort,
  FaFilter,
  FaSpinner,
  FaStar,
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdSearch } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

const starRatings = [5, 4, 3, 2, 1];

function getUniqueRatingLabelsFromData(filters: HotelFilterData[]) {
  const ratings = new Set<string>();
  for (const item of filters) {
    if (item.rating !== undefined) {
      ratings.add(getRatingLabel(item.rating));
    }
  }
  return Array.from(ratings);
}

type Props = {
  filters: HotelFilterData[];
  locale: SupportedLang;
  onApplyFilters?: (filters: HotelFilterParams) => void;
};

export default function HotelFilters({ filters, onApplyFilters }: Props) {
  const initialState = useMemo(
    () => ({
      selectedContinents: [] as string[],
      selectedCountry: "",
      selectedCity: "",
      minPrice: 0,
      maxPrice: 0,
      selectedRatings: [] as string[],
      selectedStars: [] as number[],
      selectedPayments: [] as string[],
      selectedLanguages: [] as string[],
    }),
    []
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newState = { ...initialState };

    const getParamArray = (key: string) => {
      const param = searchParams.get(key);
      return param ? decodeURIComponent(param).split(",") : [];
    };

    newState.selectedContinents = getParamArray("continent");
    newState.selectedCountry = searchParams.get("country") || "";
    newState.selectedCity = searchParams.get("city") || "";
    newState.minPrice = Number(searchParams.get("minPrice")) || 0;
    newState.maxPrice = Number(searchParams.get("maxPrice")) || 0;
    newState.selectedRatings = getParamArray("ratingLabels");
    newState.selectedStars = getParamArray("stars").map(Number);
    newState.selectedPayments = getParamArray("paymentOptions");
    newState.selectedLanguages = getParamArray("languagesSpoken");

    setFilterState(newState);
  }, [initialState, searchParams]);

  const [filterState, setFilterState] = useState(initialState);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const getLocalizedValues = (key: keyof HotelFilterData): string[] => {
    const values: string[] = [];
    for (const item of filters) {
      const field = item[key];
      if (Array.isArray(field)) {
        values.push(...field);
      } else if (typeof field === "string") {
        values.push(field);
      }
    }
    return [...new Set(values)];
  };

  const continents = getLocalizedValues("continent");

  const countries = Array.from(
    new Set(
      filters
        .filter((item) =>
          filterState.selectedContinents.length === 0
            ? true
            : filterState.selectedContinents.includes(item.continent)
        )
        .map((item) => item.country)
    )
  );

  const cities = Array.from(
    new Set(
      filters
        .filter((item) =>
          filterState.selectedCountry
            ? item.country === filterState.selectedCountry
            : true
        )
        .map((item) => item.city)
    )
  );

  const filteredHotels = filters.filter((hotel) => {
    const matchContinent =
      filterState.selectedContinents.length === 0 ||
      filterState.selectedContinents.includes(hotel.continent);
    const matchCountry =
      !filterState.selectedCountry ||
      hotel.country === filterState.selectedCountry;
    const matchCity =
      !filterState.selectedCity || hotel.city === filterState.selectedCity;
    return matchContinent && matchCountry && matchCity;
  });

  const getFilteredValues = (
    key: keyof HotelFilterData,
    hotels: HotelFilterData[]
  ): string[] => {
    const values: string[] = [];
    for (const hotel of hotels) {
      const field = hotel[key];
      if (Array.isArray(field)) values.push(...field);
      else if (typeof field === "string") values.push(field);
    }
    return [...new Set(values)];
  };

  const paymentMethods = getFilteredValues("paymentOptions", filteredHotels);
  const languages = getFilteredValues("languagesSpoken", filteredHotels);
  const ratingLabels = getUniqueRatingLabelsFromData(filters);

  const handleApplyFilters = async () => {
    const isEmpty =
      filterState.selectedContinents.length === 0 &&
      !filterState.selectedCountry &&
      !filterState.selectedCity &&
      filterState.minPrice === 0 &&
      filterState.maxPrice === 0 &&
      filterState.selectedRatings.length === 0 &&
      filterState.selectedStars.length === 0 &&
      filterState.selectedPayments.length === 0 &&
      filterState.selectedLanguages.length === 0;

    if (isEmpty) {
      toast("No filters selected to apply.", { icon: "⚠️" });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams();

    if (filterState.selectedContinents.length)
      params.set("continent", filterState.selectedContinents.join(","));
    if (filterState.selectedCountry)
      params.set("country", filterState.selectedCountry);
    if (filterState.selectedCity) params.set("city", filterState.selectedCity);
    if (filterState.minPrice > 0)
      params.set("minPrice", filterState.minPrice.toString());
    if (filterState.maxPrice < 0)
      params.set("maxPrice", filterState.maxPrice.toString());
    if (filterState.selectedRatings.length)
      params.set("ratingLabels", filterState.selectedRatings.join(","));
    if (filterState.selectedStars.length)
      params.set("stars", filterState.selectedStars.join(","));
    if (filterState.selectedPayments.length)
      params.set("paymentOptions", filterState.selectedPayments.join(","));
    if (filterState.selectedLanguages.length)
      params.set("languagesSpoken", filterState.selectedLanguages.join(","));

    const queryString = params.toString();
    const currentQuery = window.location.search.slice(1);

    if (queryString !== currentQuery) {
      router.replace(
        queryString ? `?${queryString}` : window.location.pathname
      );
    }

    onApplyFilters?.({
      ...filterState,
      continent: [],
      country: "",
      city: "",
      ratingLabels: [],
      stars: [],
      paymentOptions: [],
      languagesSpoken: [],
    });

    setTimeout(() => setLoading(false), 500);
  };

  const resetFilters = async () => {
    const isEmpty =
      filterState.selectedContinents.length === 0 &&
      !filterState.selectedCountry &&
      !filterState.selectedCity &&
      filterState.minPrice === 0 &&
      filterState.maxPrice === 0 &&
      filterState.selectedRatings.length === 0 &&
      filterState.selectedStars.length === 0 &&
      filterState.selectedPayments.length === 0 &&
      filterState.selectedLanguages.length === 0;

    if (isEmpty) {
      toast("There are no filters to reset.", { icon: "ℹ️" });
      return;
    }

    setFilterState(initialState);
    router.replace("?");
    onApplyFilters?.({
      continent: [],
      country: "",
      city: "",
      minPrice: 0,
      maxPrice: 0,
      ratingLabels: [],
      stars: [],
      paymentOptions: [],
      languagesSpoken: [],
    });
  };

  if (filters.length <= 1) return null;

  const filterLabels: Record<keyof typeof filterState, string> = {
    selectedContinents: "Continent",
    selectedCountry: "Country",
    selectedCity: "City",
    minPrice: "Min Price",
    maxPrice: "Max Price",
    selectedRatings: "Rating",
    selectedStars: "Stars",
    selectedPayments: "Payment Method",
    selectedLanguages: "Language",
  };

  const removeFilter = (
    key: keyof typeof filterState,
    value?: string | number
  ) => {
    setFilterState((prev) => {
      const newState = { ...prev };
      if (Array.isArray(prev[key])) {
        (newState[key as keyof typeof filterState] as unknown[]) = (
          prev[key] as unknown as (string | number)[]
        ).filter((v) => v !== value);
      } else {
        (newState[key as keyof typeof filterState] as unknown) =
          typeof prev[key] === "number" ? 0 : "";
      }
      return newState;
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 text-sm space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800">
          <FaFilter className="text-primary" /> Filters
        </h2>
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <FaSpinner className="text-primary" />
          </motion.div>
        )}
      </div>

      {/* Filter Summary */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(filterState)
          .filter(([, val]) => (Array.isArray(val) ? val.length > 0 : val))
          .map(([key, val]) => {
            const label = filterLabels[key as keyof typeof filterState] || key;
            const values = Array.isArray(val) ? val : [val];

            return values.map((v) => (
              <motion.span
                key={`${key}-${v}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
              >
                {label}: {v}
                <button
                  onClick={() =>
                    removeFilter(key as keyof typeof filterState, v)
                  }
                  className="ml-1.5 text-blue-600 hover:text-red-500 transition-colors"
                  aria-label="Remove filter"
                >
                  ×
                </button>
              </motion.span>
            ));
          })}
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <label
          htmlFor="sortBy"
          className="flex items-center gap-2 font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <FaSort className="text-primary" /> Sort by:
        </label>
        <select
          id="sortBy"
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          value={searchParams.get("sort") || ""}
          onChange={(e) => {
            const newSort = e.target.value;
            const params = new URLSearchParams(searchParams.toString());
            if (newSort) {
              params.set("sort", newSort);
            } else {
              params.delete("sort");
            }
            router.replace(`?${params.toString()}`);
          }}
        >
          <option value="">Default</option>
          <option value="price-asc">▲ Price: Low to High</option>
          <option value="price-desc">▼ Price: High to Low</option>
          <option value="rating-asc">▲ Rating: Low to High</option>
          <option value="rating-desc">▼ Rating: High to Low</option>
          <option value="stars-asc">▲ Stars: Low to High</option>
          <option value="stars-desc">▼ Stars: High to Low</option>
        </select>
      </div>

      {/* Continent */}
      <div className="border-b border-gray-100 pb-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex justify-between items-center w-full font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("continent")}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <FaGlobe className="text-primary" /> Continent
          </span>
          {openSection === "continent" ? (
            <IoChevronUp className="text-gray-500" />
          ) : (
            <IoChevronDown className="text-gray-500" />
          )}
        </motion.button>

        <AnimatePresence>
          {openSection === "continent" && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              className="space-y-2 pl-8"
            >
              {continents.map((item) => {
                const count = filters.filter(
                  (f) => f.continent === item
                ).length;
                return (
                  <motion.label
                    key={item}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 cursor-pointer text-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={filterState.selectedContinents.includes(item)}
                      onChange={(e) =>
                        setFilterState((prev) => ({
                          ...prev,
                          selectedContinents: e.target.checked
                            ? [...prev.selectedContinents, item]
                            : prev.selectedContinents.filter((c) => c !== item),
                          selectedCountry: "",
                          selectedCity: "",
                        }))
                      }
                    />
                    <span>
                      {item} <span className="text-gray-500">({count})</span>
                    </span>
                  </motion.label>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Country */}
      <div className="border-b border-gray-100 pb-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex justify-between items-center w-full font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("country")}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <FaFlag className="text-primary" /> Country
          </span>
          {openSection === "country" ? (
            <IoChevronUp className="text-gray-500" />
          ) : (
            <IoChevronDown className="text-gray-500" />
          )}
        </motion.button>

        <AnimatePresence>
          {openSection === "country" && (
            <motion.div initial="closed" animate="open" exit="closed">
              <select
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={filterState.selectedCountry}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    selectedCountry: e.target.value,
                    selectedCity: "",
                  }))
                }
              >
                <option value="">All Countries</option>
                {countries.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* City */}
      <div className="border-b border-gray-100 pb-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex justify-between items-center w-full font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("city")}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <FaCity className="text-primary" /> City
          </span>
          {openSection === "city" ? (
            <IoChevronUp className="text-gray-500" />
          ) : (
            <IoChevronDown className="text-gray-500" />
          )}
        </motion.button>

        <AnimatePresence>
          {openSection === "city" && (
            <motion.div initial="closed" animate="open" exit="closed">
              <select
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={filterState.selectedCity}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    selectedCity: e.target.value,
                  }))
                }
              >
                <option value="">All Cities</option>
                {cities.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price */}
      <div className="border-b border-gray-100 pb-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex justify-between items-center w-full font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("price")}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <FaMoneyBill className="text-primary" /> Price Range
          </span>
          {openSection === "price" ? (
            <IoChevronUp className="text-gray-500" />
          ) : (
            <IoChevronDown className="text-gray-500" />
          )}
        </motion.button>

        <AnimatePresence>
          {openSection === "price" && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              className="flex gap-3"
            >
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={filterState.minPrice}
                min={0}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    minPrice: +e.target.value,
                  }))
                }
              />
              <input
                type="number"
                placeholder="Max"
                max={filterState.maxPrice}
                className="w-1/2 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={filterState.maxPrice}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    maxPrice: +e.target.value,
                  }))
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating */}
      <div className="border-b border-gray-100 pb-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex justify-between items-center w-full font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("rating")}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <FaThumbsUp className="text-primary" /> User Rating
          </span>
          {openSection === "rating" ? (
            <IoChevronUp className="text-gray-500" />
          ) : (
            <IoChevronDown className="text-gray-500" />
          )}
        </motion.button>

        <AnimatePresence>
          {openSection === "rating" && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              className="space-y-2 pl-8"
            >
              {ratingLabels.map((label) => (
                <motion.label
                  key={label}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    checked={filterState.selectedRatings.includes(label)}
                    onChange={(e) =>
                      setFilterState((prev) => ({
                        ...prev,
                        selectedRatings: e.target.checked
                          ? [...prev.selectedRatings, label]
                          : prev.selectedRatings.filter((r) => r !== label),
                      }))
                    }
                  />
                  {label}
                </motion.label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stars */}
      <div className="border-b border-gray-100 pb-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex justify-between items-center w-full font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("stars")}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <FaStar className="text-primary" /> Star Rating
          </span>
          {openSection === "stars" ? (
            <IoChevronUp className="text-gray-500" />
          ) : (
            <IoChevronDown className="text-gray-500" />
          )}
        </motion.button>

        <AnimatePresence>
          {openSection === "stars" && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              className="space-y-2 pl-8"
            >
              {starRatings.map((stars) => (
                <motion.label
                  key={stars}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    checked={filterState.selectedStars.includes(stars)}
                    onChange={(e) =>
                      setFilterState((prev) => ({
                        ...prev,
                        selectedStars: e.target.checked
                          ? [...prev.selectedStars, stars]
                          : prev.selectedStars.filter((s) => s !== stars),
                      }))
                    }
                  />

                  <span className="flex items-center gap-1">
                    {/* Render star icons */}
                    {Array.from({ length: stars }, (_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                    {/* Optional text */}
                    <span className="ml-1 text-sm text-gray-500">
                      ({stars} Star{stars > 1 ? "s" : ""})
                    </span>
                  </span>
                </motion.label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Payment */}
      <div className="border-b border-gray-100 pb-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex justify-between items-center w-full font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("payment")}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <FaMoneyBill className="text-primary" /> Payment Methods
          </span>
          {openSection === "payment" ? (
            <IoChevronUp className="text-gray-500" />
          ) : (
            <IoChevronDown className="text-gray-500" />
          )}
        </motion.button>

        <AnimatePresence>
          {openSection === "payment" && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              className="space-y-2 pl-8"
            >
              {paymentMethods.map((method) => (
                <motion.label
                  key={method}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    checked={filterState.selectedPayments.includes(method)}
                    onChange={(e) =>
                      setFilterState((prev) => ({
                        ...prev,
                        selectedPayments: e.target.checked
                          ? [...prev.selectedPayments, method]
                          : prev.selectedPayments.filter((m) => m !== method),
                      }))
                    }
                  />
                  {method}
                </motion.label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Languages */}
      <div className="border-b border-gray-100 pb-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex justify-between items-center w-full font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection("languages")}
        >
          <span className="flex items-center gap-2 text-gray-700">
            <FaLanguage className="text-primary" /> Languages Spoken
          </span>
          {openSection === "languages" ? (
            <IoChevronUp className="text-gray-500" />
          ) : (
            <IoChevronDown className="text-gray-500" />
          )}
        </motion.button>

        <AnimatePresence>
          {openSection === "languages" && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              className="space-y-2 pl-8"
            >
              {languages.map((lang) => (
                <motion.label
                  key={lang}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    checked={filterState.selectedLanguages.includes(lang)}
                    onChange={(e) =>
                      setFilterState((prev) => ({
                        ...prev,
                        selectedLanguages: e.target.checked
                          ? [...prev.selectedLanguages, lang]
                          : prev.selectedLanguages.filter((l) => l !== lang),
                      }))
                    }
                  />
                  {lang}
                </motion.label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <motion.div
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleApplyFilters}
          className="w-full bg-primary text-white px-2 py-3 rounded-lg font-semibold hover:bg-success transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1"
        >
          <IoMdSearch className="text-base" /> Apply Filters
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetFilters}
          className="w-full border gap-1 border-gray-300 text-gray-700 px-2 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center justify-center"
        >
          <VscDebugRestart className="text-base" /> Reset
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
