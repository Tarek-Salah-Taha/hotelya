"use client";

import { useTranslations } from "next-intl";

export function useHotelFilters(searchParamsString: string) {
  const DEFAULT_MAX_PRICE = 1000;
  const params = new URLSearchParams(searchParamsString);
  const getArray = (key: string) =>
    params.get(key)?.split(",").map(decodeURIComponent) ?? [];

  const tFilters = useTranslations("FiltersPage");

  // Map localized sort values back to canonical keys
  const localizedToCanonical: Record<string, string> = {
    [tFilters("price-asc")]: "price-asc",
    [tFilters("price-desc")]: "price-desc",
    [tFilters("rating-asc")]: "rating-asc",
    [tFilters("rating-desc")]: "rating-desc",
    [tFilters("stars-asc")]: "stars-asc",
    [tFilters("stars-desc")]: "stars-desc",
    "": "",
  };

  const rawSort = params.get("sort") || "";
  const sort = localizedToCanonical[rawSort] || rawSort;

  return {
    continent: params.get("continent") || "",
    country: params.get("country") || "",
    city: params.get("city") || "",
    minPrice: Number(params.get("minPrice")) || 0,
    maxPrice: Number(params.get("maxPrice")) || DEFAULT_MAX_PRICE,
    ratingLabels: getArray("ratingLabels"),
    stars: getArray("stars").map(Number),
    paymentOptions: getArray("paymentOptions"),
    languagesSpoken: getArray("languagesSpoken"),
    sort,
  };
}
