"use client";

import { useState } from "react";
import { HotelFilterData, SupportedLang } from "@/app/_types/types";

type Props = {
  filters: HotelFilterData[];
  locale: SupportedLang;
  onApplyFilters?: (filters: Record<string, unknown>) => void;
};

export default function HotelFilters({ filters, onApplyFilters }: Props) {
  const initialState = {
    selectedContinent: "",
    selectedCountry: "",
    selectedCity: "",
    minPrice: 0,
    maxPrice: 1000,
    selectedRating: 0,
    selectedStars: 0,
    selectedPayments: [] as string[],
    selectedLanguages: [] as string[],
    cancellationFreeOnly: false,
  };

  const [filterState, setFilterState] = useState(initialState);

  // ✅ Get localized unique values
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
  const countries = getLocalizedValues("country");
  const cities = getLocalizedValues("city");
  const paymentMethods = getLocalizedValues("paymentOptions");
  const languages = getLocalizedValues("languagesSpoken");

  const handleApplyFilters = () => {
    onApplyFilters?.({
      continent: filterState.selectedContinent,
      country: filterState.selectedCountry,
      city: filterState.selectedCity,
      minPrice: filterState.minPrice,
      maxPrice: filterState.maxPrice,
      rating: filterState.selectedRating,
      stars: filterState.selectedStars,
      paymentOptions: filterState.selectedPayments,
      languagesSpoken: filterState.selectedLanguages,
      cancellationFreeOnly: filterState.cancellationFreeOnly,
    });
  };

  const resetFilters = () => setFilterState(initialState);

  if (filters.length <= 1) return null;

  return (
    <section className="grid gap-6 p-6 border rounded-2xl bg-white shadow-lg text-sm">
      {/* Continent Filter */}
      <div>
        <label className="block font-semibold mb-1">Continent</label>
        <select
          className="w-full border border-gray-300 p-2 rounded-lg"
          value={filterState.selectedContinent}
          onChange={(e) =>
            setFilterState((prev) => ({
              ...prev,
              selectedContinent: e.target.value,
            }))
          }
        >
          <option value="">All Continents</option>
          {continents.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Country Filter */}
      <div>
        <label className="block font-semibold mb-1">Country</label>
        <select
          className="w-full border border-gray-300 p-2 rounded-lg"
          value={filterState.selectedCountry}
          onChange={(e) =>
            setFilterState((prev) => ({
              ...prev,
              selectedCountry: e.target.value,
            }))
          }
        >
          <option value="">All Countries</option>
          {countries.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* City Filter */}
      <div>
        <label className="block font-semibold mb-1">City</label>
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
      </div>

      {/* Price Range */}
      <div>
        <label className="block font-semibold mb-1">Price Range</label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 border border-gray-300 p-2 rounded-lg"
            value={filterState.minPrice}
            onChange={(e) =>
              setFilterState((prev) => ({
                ...prev,
                minPrice: Number(e.target.value),
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
                maxPrice: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block font-semibold mb-1">Minimum Rating</label>
        <select
          className="w-full border border-gray-300 p-2 rounded-lg"
          value={filterState.selectedRating}
          onChange={(e) =>
            setFilterState((prev) => ({
              ...prev,
              selectedRating: Number(e.target.value),
            }))
          }
        >
          <option value={0}>All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} stars & up
            </option>
          ))}
        </select>
      </div>

      {/* Stars */}
      <div>
        <label className="block font-semibold mb-1">Star Rating</label>
        <select
          className="w-full border border-gray-300 p-2 rounded-lg"
          value={filterState.selectedStars}
          onChange={(e) =>
            setFilterState((prev) => ({
              ...prev,
              selectedStars: Number(e.target.value),
            }))
          }
        >
          <option value={0}>All Stars</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} stars
            </option>
          ))}
        </select>
      </div>

      {/* Payment Methods */}
      <div>
        <p className="font-semibold mb-1">Payment Methods</p>
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
      </div>

      {/* Languages Spoken */}
      <div>
        <p className="font-semibold mb-1">Languages Spoken</p>
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
      </div>

      {/* Cancellation */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="accent-primary"
          checked={filterState.cancellationFreeOnly}
          onChange={(e) =>
            setFilterState((prev) => ({
              ...prev,
              cancellationFreeOnly: e.target.checked,
            }))
          }
        />
        <label className="font-medium">Free Cancellation Only</label>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
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
