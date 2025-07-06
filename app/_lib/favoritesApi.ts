import supabase from "./supabase";

// Add a favorite
export async function addFavorite(userId: string, hotelId: number) {
  const { error } = await supabase
    .from("favorites")
    .upsert([{ userId, hotelId }]);

  if (error) throw error;
}

// Remove a favorite
export async function removeFavorite(userId: string, hotelId: number) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .match({ userId, hotelId });

  if (error) throw error;
}

// Get all favorite hotelIds for a user
export async function fetchFavorites(userId: string): Promise<string[]> {
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
