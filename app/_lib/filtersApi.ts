import supabase from "./supabase";
import { normalizeLocalizedFields } from "../_utils/normalizeLocalizedFields";
import { SupportedLang, HotelFilterData } from "../_types/types";
import getLocalizedFields from "../_helpers/getLocalizedFields";

export async function fetchHotelFiltersData({
  locale,
}: {
  locale: SupportedLang;
}): Promise<HotelFilterData[]> {
  const localizedFields = getLocalizedFields(locale, [
    "continent",
    "country",
    "city",
    "paymentOptions",
    "languagesSpoken",
    "amenities",
    "policies",
    "tags",
  ]);

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
