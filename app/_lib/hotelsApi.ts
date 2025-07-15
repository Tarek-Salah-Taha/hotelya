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
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Error counting hotels:", error);
    throw new Error(error.message || "Failed to count hotels");
  }

  return count ?? 0;
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

export async function fetchFilteredHotels(filters: {
  continent?: string;
  country?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  stars?: number;
  paymentOptions?: string[];
  languagesSpoken?: string[];
  cancellationFreeOnly?: boolean;
  locale: SupportedLang;
  page?: number;
  limit?: number;
}): Promise<{ data: HotelCardData[]; count: number }> {
  const {
    continent,
    country,
    city,
    minPrice,
    maxPrice,
    rating,
    stars,
    paymentOptions,
    languagesSpoken,
    cancellationFreeOnly,
    locale,
    page = 1,
    limit = 15,
  } = filters;

  const offset = (page - 1) * limit;

  // localized display fields
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
  ];

  let query = supabase
    .from("hotel_with_standard_room")
    .select(selectFields.join(","), { count: "exact" })
    .range(offset, offset + limit - 1);

  // ✅ Localized filters
  if (continent) query = query.ilike(`continent_${locale}`, `%${continent}%`);
  if (country) query = query.ilike(`country_${locale}`, `%${country}%`);
  if (city) query = query.ilike(`city_${locale}`, `%${city}%`);

  // ✅ Numeric filters
  if (rating) query = query.gte("rating", rating);
  if (stars) query = query.eq("stars", stars);
  if (minPrice !== undefined) query = query.gte("priceNew", minPrice);
  if (maxPrice !== undefined) query = query.lte("priceNew", maxPrice);

  // ✅ Localized array filters
  if (paymentOptions?.length) {
    paymentOptions.forEach((option) => {
      query = query.contains(`paymentOptions_${locale}`, [option]);
    });
  }

  if (languagesSpoken?.length) {
    languagesSpoken.forEach((lang) => {
      query = query.contains(`languagesSpoken_${locale}`, [lang]);
    });
  }

  if (cancellationFreeOnly) {
    query = query.eq("cancellationFree", true);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return {
    data:
      (data as unknown as HotelCardData[]).map((hotel) =>
        normalizeLocalizedFields<HotelCardData>(hotel, locale, [
          "hotelName",
          "city",
          "country",
          "tags",
        ])
      ) || [],
    count: count || 0,
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
