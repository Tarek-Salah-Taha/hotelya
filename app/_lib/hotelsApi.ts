import supabase from "./supabase";

import { HotelCardData, Hotel } from "@/app/_types/types";

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
    .single();
  if (error) {
    throw new Error(error.message || "Failed to fetch hotels");
  }

  return data;
}
