import supabase from "./supabase";
import { Room, SupportedLang } from "../_types/types";

// Fetches all rooms available for the specified hotel.
export async function fetchRoomsByHotelId(hotelId: number): Promise<Room[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("hotelId", hotelId);

  if (error) {
    console.error("Failed to fetch rooms:", error.message);
    throw new Error("Could not load rooms for the hotel.");
  }

  return data ?? [];
}

// Fetches detailed information for a single room by its ID.
export async function fetchRoomById(
  roomId: string,
  locale: SupportedLang = "en"
) {
  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
      id,
      hotelId,
      roomType,
      priceNew,
      hotel:hotelId (
        hotelName_${locale}, city_${locale}, country_${locale}
      )
    `
    )
    .eq("id", roomId)
    .single();

  if (error) {
    console.error("Failed to fetch room details:", error.message);
    throw new Error("Could not load room details.");
  }

  return data;
}
