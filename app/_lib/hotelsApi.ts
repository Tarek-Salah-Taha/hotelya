import supabase from "./supabase";
import { Hotel, HotelCardData, SupportedLang } from "../_types/types";
import { normalizeLocalizedFields } from "./normalizeLocalizedFields";

export async function fetchBasicHotelInfo(
  page: number = 1,
  limit: number = 15,
  locale: SupportedLang = "en"
): Promise<HotelCardData[]> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Use 'as const' to prevent TS from expanding all possible combinations of the template
  const localizedFields = [
    `hotelName_${locale}`,
    `city_${locale}`,
    `country_${locale}`,
    `tags_${locale}`,
  ] as const;

  const selectFields = [
    "id",
    ...localizedFields,
    "exteriorImages",
    "priceNew",
    "priceOld",
    "stars",
    "rating",
  ].join(",");

  const { data, error } = await supabase
    .from("hotel_with_standard_room")
    .select(selectFields)
    .range(from, to);

  if (error) {
    throw new Error(error.message || "Failed to fetch hotels");
  }

  return (data as unknown as Hotel[]).map((hotel) =>
    normalizeLocalizedFields<HotelCardData>(hotel, locale, [
      "hotelName",
      "city",
      "country",
      "tags",
    ])
  );
}

export async function fetchHotelCount(): Promise<number> {
  const { count, error } = await supabase
    .from("hotel_with_standard_room")
    .select("*", { count: "exact", head: true });

  if (error) throw new Error(error.message || "Failed to count hotels");

  return count || 0;
}

export async function fetchHotelInfo(id: string): Promise<Hotel> {
  const { data, error } = await supabase
    .from("hotel_with_standard_room")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw new Error(error.message || "Failed to fetch hotels");
  }

  return data;
}

export async function fetchFilteredHotels(
  city: string,
  country: string = "",
  page: number = 1,
  limit: number = 15,
  locale: SupportedLang = "en"
) {
  const offset = (page - 1) * limit;

  const localizedFields = [
    `hotelName_${locale}`,
    `city_${locale}`,
    `country_${locale}`,
    `tags_${locale}`,
  ] as const;

  const selectFields = [
    "id",
    ...localizedFields,
    "exteriorImages",
    "priceNew",
    "priceOld",
    "stars",
    "rating",
  ].join(",");

  let query = supabase
    .from("hotel_with_standard_room")
    .select(selectFields)
    .range(offset, offset + limit - 1);

  if (city && country) {
    query = query
      .ilike(`city_${locale}`, `%${city}%`)
      .ilike(`country_${locale}`, `%${country}%`);
  } else if (city) {
    query = query.ilike(`city_${locale}`, `%${city}%`);
  }

  const { data, error } = await query;

  return {
    data:
      (data as unknown as Record<string, unknown>[])?.map((hotel) =>
        normalizeLocalizedFields<HotelCardData>(hotel, locale, [
          "hotelName",
          "city",
          "country",
          "tags",
        ])
      ) || [],
    error,
  };
}

export async function fetchFilteredHotelCount(
  city: string,
  country: string = "",
  locale: string = "en"
) {
  let query = supabase
    .from("hotel_with_standard_room")
    .select("id", { count: "exact", head: true });

  if (city && country) {
    query = query
      .ilike(`city_${locale}`, `%${city}%`)
      .ilike(`country_${locale}`, `%${country}%`);
  } else if (city) {
    query = query.ilike(`city_${locale}`, `%${city}%`);
  }

  const { count, error } = await query;
  return { count, error };
}

export async function getHotelsByIds(
  hotelIds: string[],
  locale: string = "en"
): Promise<HotelCardData[]> {
  if (hotelIds.length === 0) return [];

  const { data, error } = await supabase
    .from("hotel_with_standard_room")
    .select(
      `id,hotelName_${locale},city_${locale},country_${locale},stars,rating,tags_${locale},exteriorImages,priceNew,priceOld`
    )
    .in("id", hotelIds);

  if (error) {
    console.error("Error fetching favorite hotels:", error.message);
    return [];
  }

  return (data as unknown as HotelCardData[]) || [];
}
