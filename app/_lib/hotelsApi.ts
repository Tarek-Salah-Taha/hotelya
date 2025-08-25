import supabase from "./supabase";
import { Hotel, HotelCardData, SupportedLang } from "../_types/types";
import { normalizeLocalizedFields } from "../_utils/normalizeLocalizedFields";
import getLocalizedFields from "../_helpers/getLocalizedFields";
import { fetchHotelFiltersData } from "./filtersApi";
import { fetchHotelReviews } from "./reviewsApi";
import { fetchRoomsByHotelId } from "./roomsApi";
import { transformHotelFields } from "../_utils/transformHotel";

// Fetches a paginated list of hotels with localized fields based on the selected language.
export async function fetchPaginatedHotelsWithLocalization(
  page: number = 1,
  limit: number = 15,
  locale: SupportedLang = "en"
): Promise<HotelCardData[]> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const localizedFields = getLocalizedFields(locale, [
    "hotelName",
    "city",
    "country",
    "tags",
  ]);

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
    .from("hotels")
    .select(selectFields)
    .range(from, to);

  if (error) throw new Error(error.message || "Failed to fetch hotels");

  return (data as unknown as Hotel[]).map((hotel) =>
    normalizeLocalizedFields<HotelCardData>(hotel, locale, [
      "hotelName",
      "city",
      "country",
      "tags",
    ])
  );
}

// Returns the total number of hotels from the database.
export async function fetchTotalHotelCount(): Promise<number> {
  const { count, error } = await supabase
    .from("hotels")
    .select("id", { count: "exact", head: true });

  if (error) throw new Error(error.message || "Failed to count hotels");
  return count ?? 0;
}

export async function fetchHotelsPageData({
  page,
  limit,
  locale,
}: {
  page: number;
  limit: number;
  locale: SupportedLang;
}) {
  const [hotels, filters, totalCount] = await Promise.all([
    fetchPaginatedHotelsWithLocalization(page, limit, locale),
    fetchHotelFiltersData({ locale }),
    fetchTotalHotelCount(),
  ]);

  return {
    hotels,
    filters,
    totalPages: Math.ceil(totalCount / limit),
  };
}

// Fetches full hotel details by its unique ID.
export async function fetchHotelById(id: number): Promise<Hotel> {
  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Failed to fetch hotel");
  }

  return data;
}

export async function fetchHotelPageData(id: number, locale: SupportedLang) {
  const [rawHotel, reviews, rooms] = await Promise.all([
    fetchHotelById(id),
    fetchHotelReviews(id),
    fetchRoomsByHotelId(id),
  ]);

  const hotel = transformHotelFields(rawHotel, locale);

  return { hotel, rooms, reviews };
}

// Fetches and returns a filtered, localized, and paginated list of hotels with total count.
export async function fetchFilteredHotels(filters: {
  continent?: string;
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
  sort?: string;
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

  const localizedFields = getLocalizedFields(locale, [
    "hotelName",
    "city",
    "country",
    "tags",
    "paymentOptions",
    "languagesSpoken",
  ]);

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
    .from("hotels")
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

  if (error) {
    console.error("Error fetching filtered hotels", error.details, filters);
    throw new Error("Unable to load hotels");
  }

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
      case "rating-asc":
        filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
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

// Returns the number of hotels matching the given city in the selected locale.
export async function fetchHotelCountByCity(
  city: string,
  locale: SupportedLang = "en"
) {
  let query = supabase
    .from("hotels")
    .select("id", { count: "exact", head: true });

  query = query.ilike(`city_${locale}`, `%${city}%`);

  const { count, error } = await query;
  return { count, error };
}

// Fetches multiple hotels by their IDs with localized fields for the given locale.
export async function fetchHotelsByIds(
  hotelIds: string[],
  locale: SupportedLang = "en"
): Promise<HotelCardData[]> {
  if (hotelIds.length === 0) return [];

  const localizedFields = getLocalizedFields(locale, [
    "hotelName",
    "city",
    "country",
    "tags",
  ]);

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
    .from("hotels")
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
