import supabase from "./supabase";

export async function getRooms(hotelId: string) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("hotelId", hotelId);

  if (error) throw error;

  return data ?? [];
}

export async function getRoomById(roomId: string) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (error) throw error;
  return data;
}
