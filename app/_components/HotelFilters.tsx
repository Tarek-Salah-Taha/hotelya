"use client";

import { useState, useEffect, useMemo } from "react";
import {
  HotelFilterData,
  SupportedLang,
  HotelFilterParams,
} from "@/app/_types/types";
import getRatingLabel from "../_lib/getRatingLabel";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";

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
      maxPrice: 1000,
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
    newState.maxPrice = Number(searchParams.get("maxPrice")) || 1000;
    newState.selectedRatings = getParamArray("ratingLabels");
    newState.selectedStars = getParamArray("stars").map(Number);
    newState.selectedPayments = getParamArray("paymentOptions");
    newState.selectedLanguages = getParamArray("languagesSpoken");

    setFilterState(newState);
  }, [initialState, searchParams]);

  const [filterState, setFilterState] = useState(initialState);
  const [openSection, setOpenSection] = useState<string | null>(null);

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
    const params = new URLSearchParams();

    // Only add params that have values
    if (filterState.selectedContinents.length)
      params.set("continent", filterState.selectedContinents.join(","));
    if (filterState.selectedCountry)
      params.set("country", filterState.selectedCountry);
    if (filterState.selectedCity) params.set("city", filterState.selectedCity);
    if (filterState.minPrice > 0)
      params.set("minPrice", filterState.minPrice.toString());
    if (filterState.maxPrice < 1000)
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
    const currentQuery = window.location.search.slice(1); // Remove the '?' from the start

    // Only update URL if the query string has actually changed
    if (queryString !== currentQuery) {
      await router.replace(
        queryString ? `?${queryString}` : window.location.pathname
      );
    }

    // Call onApplyFilters after the URL is updated
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
  };

  const resetFilters = async () => {
    setFilterState(initialState);
    // Wait for the URL update to complete
    await router.replace("?");

    onApplyFilters?.({
      continent: [],
      country: "",
      city: "",
      minPrice: 0,
      maxPrice: 1000,
      ratingLabels: [],
      stars: [],
      paymentOptions: [],
      languagesSpoken: [],
    });
  };

  if (filters.length <= 1) return null;

  return (
    <section className="p-4 sm:p-6 border rounded-2xl bg-white shadow-lg text-sm space-y-4">
      {/* Sort By */}
      <div className="mb-4">
        <label htmlFor="sortBy" className="block font-semibold mb-1">
          Sort by:
        </label>
        <select
          id="sortBy"
          className="w-full border border-gray-300 p-2 rounded-lg"
          value={searchParams.get("sort") || ""}
          onChange={(e) => {
            const newSort = e.target.value;
            const params = new URLSearchParams(searchParams.toString());
            if (newSort) {
              params.set("sort", newSort);
            } else {
              params.delete("sort");
            }

            // Update the URL without reloading
            router.replace(`?${params.toString()}`);
          }}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="stars-desc">Stars: High to Low</option>
          <option value="stars-asc">Stars: Low to High</option>
        </select>
      </div>

      {/* Continent */}
      <div>
        <button
          className="flex justify-between items-center w-full font-semibold mb-2"
          onClick={() => toggleSection("continent")}
        >
          Continent{" "}
          {openSection === "continent" ? <IoChevronUp /> : <IoChevronDown />}
        </button>
        {openSection === "continent" && (
          <div className="space-y-1">
            {continents.map((item) => {
              const count = filters.filter((f) => f.continent === item).length;
              return (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-primary"
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
                  {item} ({count})
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Country */}
      <div>
        <button
          className="flex justify-between items-center w-full font-semibold mb-2"
          onClick={() => toggleSection("country")}
        >
          Country{" "}
          {openSection === "country" ? <IoChevronUp /> : <IoChevronDown />}
        </button>
        {openSection === "country" && (
          <select
            className="w-full border border-gray-300 p-2 rounded-lg"
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
        )}
      </div>

      {/* City */}
      <div>
        <button
          className="flex justify-between items-center w-full font-semibold mb-2"
          onClick={() => toggleSection("city")}
        >
          City {openSection === "city" ? <IoChevronUp /> : <IoChevronDown />}
        </button>
        {openSection === "city" && (
          <select
            className="w-full border border-gray-300 p-2 rounded-lg"
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
        )}
      </div>

      {/* Price */}
      <div>
        <button
          className="flex justify-between items-center w-full font-semibold mb-2"
          onClick={() => toggleSection("price")}
        >
          Price Range{" "}
          {openSection === "price" ? <IoChevronUp /> : <IoChevronDown />}
        </button>
        {openSection === "price" && (
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 border border-gray-300 p-2 rounded-lg"
              value={filterState.minPrice}
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
              className="w-1/2 border border-gray-300 p-2 rounded-lg"
              value={filterState.maxPrice}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  maxPrice: +e.target.value,
                }))
              }
            />
          </div>
        )}
      </div>

      {/* Rating */}
      <div>
        <button
          className="flex justify-between items-center w-full font-semibold mb-2"
          onClick={() => toggleSection("rating")}
        >
          Rating{" "}
          {openSection === "rating" ? <IoChevronUp /> : <IoChevronDown />}
        </button>
        {openSection === "rating" && (
          <div className="space-y-1">
            {ratingLabels.map((label) => (
              <label key={label} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
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
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stars */}
      <div>
        <button
          className="flex justify-between items-center w-full font-semibold mb-2"
          onClick={() => toggleSection("stars")}
        >
          Star Rating{" "}
          {openSection === "stars" ? <IoChevronUp /> : <IoChevronDown />}
        </button>
        {openSection === "stars" && (
          <div className="space-y-1">
            {starRatings.map((stars) => (
              <label key={stars} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
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
                {stars} stars
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Payment */}
      <div>
        <button
          className="flex justify-between items-center w-full font-semibold mb-2"
          onClick={() => toggleSection("payment")}
        >
          Payment Methods{" "}
          {openSection === "payment" ? <IoChevronUp /> : <IoChevronDown />}
        </button>
        {openSection === "payment" && (
          <div className="space-y-1">
            {paymentMethods.map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
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
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Languages */}
      <div>
        <button
          className="flex justify-between items-center w-full font-semibold mb-2"
          onClick={() => toggleSection("languages")}
        >
          Languages Spoken{" "}
          {openSection === "languages" ? <IoChevronUp /> : <IoChevronDown />}
        </button>
        {openSection === "languages" && (
          <div className="space-y-1">
            {languages.map((lang) => (
              <label key={lang} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
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
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="w-full border border-gray-400 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
