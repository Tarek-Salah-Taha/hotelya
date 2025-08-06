import { SupportedLang, HotelFilterData } from "../_types/types";
import supabase from "./supabase";
import { normalizeLocalizedFields } from "./normalizeLocalizedFields";

// Fetches hotel data with localized fields used to generate filter options.
export async function fetchHotelFiltersData({
  locale,
}: {
  locale: SupportedLang;
}): Promise<HotelFilterData[]> {
  const localizedFields = [
    `continent_${locale}`,
    `country_${locale}`,
    `city_${locale}`,
    `paymentOptions_${locale}`,
    `languagesSpoken_${locale}`,
    `amenities_${locale}`,
    `policies_${locale}`,
    `tags_${locale}`,
  ] as const;

  const selectFields = [
    "id",
    ...localizedFields,
    "priceNew",
    "rating",
    "stars",
  ].join(",");

  const { data, error } = await supabase
    .from("hotel_with_standard_room")
    .select(selectFields)
    .range(0, 1200);

  if (error) throw new Error(error.message || "Failed to fetch filters");

  return (data as unknown as HotelFilterData[]).map((hotel) =>
    normalizeLocalizedFields<HotelFilterData>(hotel, locale, [
      "continent",
      "country",
      "city",
      "paymentOptions",
      "languagesSpoken",
      "amenities",
      "policies",
      "tags",
    ])
  );
}
