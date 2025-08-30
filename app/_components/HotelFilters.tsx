"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  HotelFilterData,
  SupportedLang,
  HotelFilterParams,
} from "@/app/_types/types";
import getRatingLabel from "../_helpers/getRatingLabel";
import {
  FaGlobe,
  FaFlag,
  FaCity,
  FaMoneyBill,
  FaLanguage,
  FaThumbsUp,
  FaFilter,
  FaSpinner,
  FaStar,
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FilterButtons from "./FilterButtons";
import FilterSelect from "./FilterSelect";
import FilterCheckboxList from "./FilterCheckboxList";
import FilterSection from "./FilterSection";
import FilterTagList from "./FilterTagList";
import SortSelect from "./SortSelect";
import PriceRangeInputs from "./PriceRangeInputs";
import StarCheckboxList from "./StarCheckboxList";

type Props = {
  filters: HotelFilterData[];
  locale: SupportedLang;
  onApplyFilters?: (filters: HotelFilterParams) => void;
};

export default function HotelFilters({ filters, onApplyFilters }: Props) {
  const searchParams = useSearchParams();

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
      sort: searchParams.get("sort") || "",
    }),
    [searchParams]
  );

  const router = useRouter();

  const tFavorites = useTranslations("FavoritesPage");
  const tFilters = useTranslations("FiltersPage");

  const sortOptions = [
    { value: "", label: tFilters("Default") },
    { value: tFilters("price-asc"), label: `▲ ${tFilters("price-asc")}` },
    { value: tFilters("price-desc"), label: `▼ ${tFilters("price-desc")}` },
    { value: tFilters("rating-asc"), label: `▲ ${tFilters("rating-asc")}` },
    { value: tFilters("rating-desc"), label: `▼ ${tFilters("rating-desc")}` },
    { value: tFilters("stars-asc"), label: `▲ ${tFilters("stars-asc")}` },
    { value: tFilters("stars-desc"), label: `▼ ${tFilters("stars-desc")}` },
  ];

  const getUniqueRatingLabelsFromData = useCallback(
    (hotels: HotelFilterData[]) => {
      const ratings = new Set<string>();
      for (const item of hotels) {
        if (item.rating !== undefined) {
          ratings.add(getRatingLabel(item.rating, tFavorites));
        }
      }
      return Array.from(ratings);
    },
    [tFavorites]
  );

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
    newState.sort = searchParams.get("sort") || "";

    setFilterState(newState);
  }, [initialState, searchParams]);

  const [filterState, setFilterState] = useState(initialState);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Filtered hotels based on location selection (continent, country, city)
  const locationFilteredHotels = useMemo(() => {
    return filters.filter((hotel) => {
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
  }, [
    filters,
    filterState.selectedContinents,
    filterState.selectedCountry,
    filterState.selectedCity,
  ]);

  const fullyFilteredHotels = useMemo(() => {
    return locationFilteredHotels.filter((hotel) => {
      // Apply rating filter
      const matchRating =
        filterState.selectedRatings.length === 0 ||
        (hotel.rating !== undefined &&
          filterState.selectedRatings.includes(
            getRatingLabel(hotel.rating, tFavorites)
          ));

      // Apply star filter
      const matchStars =
        filterState.selectedStars.length === 0 ||
        (hotel.stars !== undefined &&
          filterState.selectedStars.includes(hotel.stars));

      // Apply price filter
      const matchPrice =
        (filterState.minPrice === 0 ||
          (hotel.priceNew !== undefined &&
            hotel.priceNew >= filterState.minPrice)) &&
        (filterState.maxPrice === 0 ||
          (hotel.priceNew !== undefined &&
            hotel.priceNew <= filterState.maxPrice));

      // Apply payment methods filter
      const matchPayment =
        filterState.selectedPayments.length === 0 ||
        (hotel.paymentOptions &&
          filterState.selectedPayments.some((payment) =>
            hotel.paymentOptions.includes(payment)
          ));

      // Apply languages filter
      const matchLanguages =
        filterState.selectedLanguages.length === 0 ||
        (hotel.languagesSpoken &&
          filterState.selectedLanguages.some((lang) =>
            hotel.languagesSpoken.includes(lang)
          ));

      return (
        matchRating &&
        matchStars &&
        matchPrice &&
        matchPayment &&
        matchLanguages
      );
    });
  }, [
    locationFilteredHotels,
    filterState.selectedRatings,
    filterState.selectedStars,
    filterState.minPrice,
    filterState.maxPrice,
    filterState.selectedPayments,
    filterState.selectedLanguages,
    tFavorites,
  ]);

  // Get available continents
  const continents = useMemo(() => {
    const values = Array.from(new Set(filters.map((item) => item.continent)));
    return values.sort((a, b) => a.localeCompare(b));
  }, [filters]);

  // Get available countries based on selected continents
  const countries = useMemo(() => {
    const filteredByContinent = filters.filter((item) =>
      filterState.selectedContinents.length === 0
        ? true
        : filterState.selectedContinents.includes(item.continent)
    );

    const values = Array.from(
      new Set(filteredByContinent.map((item) => item.country))
    );
    return values.sort((a, b) => a.localeCompare(b));
  }, [filters, filterState.selectedContinents]);

  // Get available cities based on selected country (and continents)
  const cities = useMemo(() => {
    const filteredByLocation = filters.filter((item) => {
      const matchContinent =
        filterState.selectedContinents.length === 0 ||
        filterState.selectedContinents.includes(item.continent);

      const matchCountry =
        !filterState.selectedCountry ||
        item.country === filterState.selectedCountry;

      return matchContinent && matchCountry;
    });

    const values = Array.from(
      new Set(filteredByLocation.map((item) => item.city))
    );
    return values.sort((a, b) => a.localeCompare(b));
  }, [filters, filterState.selectedContinents, filterState.selectedCountry]);

  // Get filtered values for other filters based on location
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

  // Get payment methods, languages, and ratings based on location filtering
  const paymentMethods = useMemo(
    () => getFilteredValues("paymentOptions", fullyFilteredHotels),
    [fullyFilteredHotels]
  );

  const languages = useMemo(
    () => getFilteredValues("languagesSpoken", fullyFilteredHotels),
    [fullyFilteredHotels]
  );

  const ratingLabels = useMemo(
    () => getUniqueRatingLabelsFromData(locationFilteredHotels),
    [locationFilteredHotels, getUniqueRatingLabelsFromData]
  );

  // Get star counts for filtered hotels
  const starCounts = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    locationFilteredHotels.forEach((hotel) => {
      if (hotel.stars && hotel.stars >= 1 && hotel.stars <= 5) {
        counts[hotel.stars] = (counts[hotel.stars] || 0) + 1;
      }
    });

    return counts;
  }, [locationFilteredHotels]);

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
      filterState.selectedLanguages.length === 0 &&
      !filterState.sort;

    if (isEmpty) {
      toast(tFilters("No filters selected to apply"), { icon: "⚠️" });
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (filterState.selectedContinents.length)
        params.set("continent", filterState.selectedContinents.join(","));
      if (filterState.selectedCountry)
        params.set("country", filterState.selectedCountry);
      if (filterState.selectedCity)
        params.set("city", filterState.selectedCity);
      if (filterState.minPrice > 0)
        params.set("minPrice", filterState.minPrice.toString());
      if (filterState.maxPrice > 0)
        params.set("maxPrice", filterState.maxPrice.toString());
      if (filterState.selectedRatings.length)
        params.set("ratingLabels", filterState.selectedRatings.join(","));
      if (filterState.selectedStars.length)
        params.set("stars", filterState.selectedStars.join(","));
      if (filterState.selectedPayments.length)
        params.set("paymentOptions", filterState.selectedPayments.join(","));
      if (filterState.selectedLanguages.length)
        params.set("languagesSpoken", filterState.selectedLanguages.join(","));
      if (filterState.sort) params.set("sort", filterState.sort);

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
    } finally {
      // Keep loading state until the parent component handles the update
      setTimeout(() => setLoading(false), 500);
    }
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
      filterState.selectedLanguages.length === 0 &&
      !filterState.sort;

    if (isEmpty) {
      toast(tFilters("There are no filters to reset"), { icon: "ℹ️" });
      return;
    }

    setLoading(true);

    try {
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
        sort: "",
      });
    } finally {
      // Keep loading state until the parent component handles the update
      setTimeout(() => setLoading(false), 500);
    }
  };

  if (filters.length <= 1) return null;

  const filterLabels: Record<keyof typeof filterState, string> = {
    selectedContinents: tFilters("Continent"),
    selectedCountry: tFilters("Country"),
    selectedCity: tFilters("City"),
    minPrice: tFilters("Minimum Price"),
    maxPrice: tFilters("Maximum Price"),
    selectedRatings: tFilters("User Rating"),
    selectedStars: tFilters("Star Rating"),
    selectedPayments: tFilters("Payment Methods"),
    selectedLanguages: tFilters("Languages Spoken"),
    sort: tFilters("Sort by"),
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
    <motion.section className="p-4 sm:p-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 text-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800">
          <FaFilter className="text-primary" /> {tFilters("Filters")}
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
      <FilterTagList
        filters={filterState}
        labels={filterLabels}
        onRemove={(key, value) =>
          removeFilter(key as keyof typeof filterState, value)
        }
        count={fullyFilteredHotels.length}
      />

      {/* Sort By */}
      <SortSelect
        value={filterState.sort}
        onChange={(val) =>
          setFilterState((prev) => ({
            ...prev,
            sort: val,
          }))
        }
        options={sortOptions}
        label={tFilters("Sort by")}
      />

      {/* Continent */}
      <FilterSection
        title={tFilters("Continent")}
        icon={<FaGlobe className="text-primary" />}
        isOpen={openSection === "continent"}
        onToggle={() => toggleSection("continent")}
      >
        {continents.map((item) => {
          const count = filters.filter((f) => f.continent === item).length;
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
                    // Reset dependent filters when continent changes
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
      </FilterSection>

      {/* Country */}
      <FilterSection
        title={tFilters("Country")}
        icon={<FaFlag className="text-primary" />}
        isOpen={openSection === "country"}
        onToggle={() => toggleSection("country")}
      >
        <FilterSelect
          value={filterState.selectedCountry}
          items={countries}
          placeholder={tFilters("All Countries")}
          onChange={(value) =>
            setFilterState((prev) => ({
              ...prev,
              selectedCountry: value,
              // Reset city when country changes
              selectedCity: "",
            }))
          }
        />
      </FilterSection>

      {/* City */}
      <FilterSection
        title={tFilters("City")}
        icon={<FaCity className="text-primary" />}
        isOpen={openSection === "city"}
        onToggle={() => toggleSection("city")}
      >
        <FilterSelect
          value={filterState.selectedCity}
          items={cities}
          placeholder={tFilters("All Cities")}
          onChange={(value) =>
            setFilterState((prev) => ({
              ...prev,
              selectedCity: value,
            }))
          }
        />
      </FilterSection>

      {/* Price */}
      <FilterSection
        title={tFilters("Price Range")}
        icon={<FaMoneyBill className="text-primary" />}
        isOpen={openSection === "price"}
        onToggle={() => toggleSection("price")}
      >
        <PriceRangeInputs
          min={filterState.minPrice}
          max={filterState.maxPrice}
          onChangeMin={(val) =>
            setFilterState((p) => ({ ...p, minPrice: val }))
          }
          onChangeMax={(val) =>
            setFilterState((p) => ({ ...p, maxPrice: val }))
          }
        />
      </FilterSection>

      {/* Rating - Now based on location filtered hotels */}
      <FilterSection
        title={tFilters("User Rating")}
        icon={<FaThumbsUp className="text-primary" />}
        isOpen={openSection === "rating"}
        onToggle={() => toggleSection("rating")}
      >
        <FilterCheckboxList
          items={ratingLabels}
          selected={filterState.selectedRatings}
          onChange={(value, checked) =>
            setFilterState((prev) => ({
              ...prev,
              selectedRatings: checked
                ? [...prev.selectedRatings, value]
                : prev.selectedRatings.filter((r) => r !== value),
            }))
          }
        />
      </FilterSection>

      {/* Stars - Now with counts based on location filtered hotels */}
      <FilterSection
        title={tFilters("Star Rating")}
        icon={<FaStar className="text-primary" />}
        isOpen={openSection === "stars"}
        onToggle={() => toggleSection("stars")}
      >
        <StarCheckboxList
          selected={filterState.selectedStars}
          counts={starCounts}
          onChange={(stars, checked) =>
            setFilterState((prev) => ({
              ...prev,
              selectedStars: checked
                ? [...prev.selectedStars, stars]
                : prev.selectedStars.filter((s) => s !== stars),
            }))
          }
        />
      </FilterSection>

      {/* Payment - Now based on location filtered hotels */}
      <FilterSection
        title={tFilters("Payment Methods")}
        icon={<FaMoneyBill className="text-primary" />}
        isOpen={openSection === "payment"}
        onToggle={() => toggleSection("payment")}
      >
        <FilterCheckboxList
          items={paymentMethods}
          selected={filterState.selectedPayments}
          onChange={(value, checked) =>
            setFilterState((prev) => ({
              ...prev,
              selectedPayments: checked
                ? [...prev.selectedPayments, value]
                : prev.selectedPayments.filter((m) => m !== value),
            }))
          }
        />
      </FilterSection>

      {/* Languages - Now based on location filtered hotels */}
      <FilterSection
        title={tFilters("Languages Spoken")}
        icon={<FaLanguage className="text-primary" />}
        isOpen={openSection === "languages"}
        onToggle={() => toggleSection("languages")}
      >
        <FilterCheckboxList
          items={languages}
          selected={filterState.selectedLanguages}
          onChange={(value, checked) =>
            setFilterState((prev) => ({
              ...prev,
              selectedLanguages: checked
                ? [...prev.selectedLanguages, value]
                : prev.selectedLanguages.filter((l) => l !== value),
            }))
          }
        />
      </FilterSection>

      {/* Buttons */}
      <FilterButtons
        onApply={handleApplyFilters}
        onReset={resetFilters}
        applyLabel={tFilters("Apply Filters")}
        resetLabel={tFilters("Reset")}
        loading={loading}
      />
    </motion.section>
  );
}
