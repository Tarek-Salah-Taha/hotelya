import { SupportedLang, HotelFilterData } from "../_types/types";
import supabase from "./supabase";
import { normalizeLocalizedFields } from "./normalizeLocalizedFields";

export async function fetchFilters({
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
    .select(selectFields);

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
