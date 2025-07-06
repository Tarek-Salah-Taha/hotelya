import supabase from "./supabase";

import { HotelCardData, Hotel } from "../_types/types";

export async function fetchBasicHotelInfo(
  page: number = 1,
  limit: number = 15
): Promise<HotelCardData[]> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("hotel_with_standard_room")
    .select(
      "id,hotelName_en,city_en,country_en,stars,rating,tags_en,exteriorImages,priceNew,priceOld"
    )
    .range(from, to);

  if (error) {
    throw new Error(error.message || "Failed to fetch hotels");
  }

  return data;
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
  limit: number = 15
) {
  const offset = (page - 1) * limit;

  let query = supabase
    .from("hotel_with_standard_room")
    .select(
      "id,hotelName_en,city_en,country_en,stars,rating,tags_en,exteriorImages,priceNew,priceOld"
    )
    .range(offset, offset + limit - 1);

  if (city && country) {
    query = query
      .ilike("city_en", `%${city}%`)
      .ilike("country_en", `%${country}%`);
  } else if (city) {
    query = query.ilike("city_en", `%${city}%`);
  }

  const { data, error } = await query;
  return { data, error };
}

export async function fetchFilteredHotelCount(
  city: string,
  country: string = ""
) {
  let query = supabase
    .from("hotel_with_standard_room")
    .select("id", { count: "exact", head: true });

  if (city && country) {
    query = query
      .ilike("city_en", `%${city}%`)
      .ilike("country_en", `%${country}%`);
  } else if (city) {
    query = query.ilike("city_en", `%${city}%`);
  }

  const { count, error } = await query;
  return { count, error };
}

export async function getHotelsByIds(
  hotelIds: string[]
): Promise<HotelCardData[]> {
  if (hotelIds.length === 0) return [];

  const { data, error } = await supabase
    .from("hotel_with_standard_room")
    .select(
      "id,hotelName_en,city_en,country_en,stars,rating,tags_en,exteriorImages,priceNew,priceOld"
    )
    .in("id", hotelIds);

  if (error) {
    console.error("Error fetching favorite hotels:", error.message);
    return [];
  }

  return data || [];
}
