import supabase from "./supabase";

// Adds the specified hotel to the user's list of favorites.
export async function addHotelToFavorites(userId: string, hotelId: number) {
  const { error } = await supabase
    .from("favorites")
    .upsert([{ userId, hotelId }]);

  if (error) throw error;
}

// Removes the specified hotel from the user's list of favorites.
export async function removeHotelFromFavorites(
  userId: string,
  hotelId: number
) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .match({ userId, hotelId });

  if (error) throw error;
}

// Retrieves a list of hotel IDs that the user has marked as favorites.
export async function fetchFavoriteHotelIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select("hotelId")
    .eq("userId", userId);

  if (error) {
    console.error("Failed to fetch favorites", error);
    return [];
  }

  return data.map((item) => item.hotelId);
}
