// ✅ INTEGRATED & FINALIZED FILTERED HOTEL FETCHING SYSTEM

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
    throw new Error(error.message || "Failed to fetch hotel");
  }

  return data;
}

export async function fetchFilteredHotels(filters: {
  continent?: string | string[];
  country?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  ratingLabels?: string[];
  stars?: number[];
  paymentOptions?: string[];
  languagesSpoken?: string[];
  locale: SupportedLang;
  page?: number;
  limit?: number;
  sort?: string; // Add this line
}): Promise<{ data: HotelCardData[]; count: number }> {
  const {
    continent,
    country,
    city,
    minPrice,
    maxPrice,
    ratingLabels,
    stars,
    paymentOptions,
    languagesSpoken,
    locale,
    page = 1,
    limit = 15,
  } = filters;

  const offset = (page - 1) * limit;

  const localizedFields = [
    `hotelName_${locale}`,
    `city_${locale}`,
    `country_${locale}`,
    `tags_${locale}`,
    `paymentOptions_${locale}`,
    `languagesSpoken_${locale}`,
  ];

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
    .select(selectFields.join(","), { count: "exact" });

  // 🌍 Location filters
  if (Array.isArray(continent) && continent.length > 0) {
    query = query.in(`continent_${locale}`, continent);
  } else if (typeof continent === "string" && continent) {
    query = query.ilike(`continent_${locale}`, `%${continent}%`);
  }

  if (country) query = query.ilike(`country_${locale}`, `%${country}%`);
  if (city) query = query.ilike(`city_${locale}`, `%${city}%`);

  // 💰 Price filters
  if (minPrice !== undefined) query = query.gte("priceNew", minPrice);
  if (maxPrice !== undefined) query = query.lte("priceNew", maxPrice);

  // ⭐ Star filters
  if (stars?.length) {
    query = query.in("stars", stars);
  }

  // 📊 Rating Labels (client-side filtering based on logic)
  if (ratingLabels?.length) {
    const conditions = ratingLabels
      .map((label) => {
        switch (label) {
          case "Excellent":
            return "rating.gte.8.5";
          case "Very Good":
            return "and(rating.gte.7.5,rating.lt.8.5)";
          case "Good":
            return "and(rating.gte.6,rating.lt.7.5)";
          case "Average":
            return "rating.lt.6";
          default:
            return "";
        }
      })
      .filter(Boolean);

    if (conditions.length > 0) {
      query = query.or(conditions.join(","));
    }
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  // ✅ Normalize + manual filter
  let filtered = (data as unknown as HotelCardData[]).map((hotel) =>
    normalizeLocalizedFields<HotelCardData>(hotel, locale, [
      "hotelName",
      "city",
      "country",
      "tags",
      "paymentOptions",
      "languagesSpoken",
    ])
  );

  if (paymentOptions?.length) {
    filtered = filtered.filter((hotel) =>
      hotel.paymentOptions?.some((option) => paymentOptions.includes(option))
    );
  }

  if (languagesSpoken?.length) {
    filtered = filtered.filter((hotel) =>
      hotel.languagesSpoken?.some((lang) => languagesSpoken.includes(lang))
    );
  }

  // Add sorting before pagination
  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.priceNew - b.priceNew);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.priceNew - a.priceNew);
        break;
      case "rating-desc":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "stars-desc":
        filtered.sort((a, b) => (b.stars || 0) - (a.stars || 0));
        break;
      case "stars-asc":
        filtered.sort((a, b) => (a.stars || 0) - (b.stars || 0));
        break;
    }
  }

  const count = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);

  return {
    data: paginated,
    count,
  };
}

export async function fetchFilteredHotelCount(
  city: string,
  country: string = "",
  locale: SupportedLang = "en"
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
  locale: SupportedLang = "en"
): Promise<HotelCardData[]> {
  if (hotelIds.length === 0) return [];

  const localizedFields = [
    `hotelName_${locale}`,
    `city_${locale}`,
    `country_${locale}`,
    `tags_${locale}`,
  ] as const;

  const selectFields = [
    "id",
    ...localizedFields,
    "stars",
    "rating",
    "exteriorImages",
    "priceNew",
    "priceOld",
  ].join(",");

  const { data, error } = await supabase
    .from("hotel_with_standard_room")
    .select(selectFields)
    .in("id", hotelIds);

  if (error) {
    console.error("Error fetching hotels by IDs:", error.message);
    return [];
  }

  return (data as unknown as HotelCardData[]).map((hotel) =>
    normalizeLocalizedFields<HotelCardData>(hotel, locale, [
      "hotelName",
      "city",
      "country",
      "tags",
    ])
  );
}
