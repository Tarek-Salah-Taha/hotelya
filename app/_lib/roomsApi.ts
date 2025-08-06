import supabase from "./supabase";
import { Room } from "../_types/types";

// Fetches all rooms available for the specified hotel.
export async function fetchRoomsByHotelId(hotelId: string): Promise<Room[]> {
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
export async function fetchRoomById(roomId: string) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (error) {
    console.error("Failed to fetch room details:", error.message);
    throw new Error("Could not load room details.");
  }

  return data;
}
