"use client";

export function useHotelFilters(searchParamsString: string) {
  const DEFAULT_MAX_PRICE = 1000;
  const params = new URLSearchParams(searchParamsString);
  const getArray = (key: string) =>
    params.get(key)?.split(",").map(decodeURIComponent) ?? [];

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
    sort: params.get("sort") || "",
  };
}
