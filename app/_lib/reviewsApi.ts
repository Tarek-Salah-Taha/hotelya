import supabase from "./supabase";

export async function getHotelReviews(hotelId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("hotelId", hotelId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addHotelReview(
  hotelId: string,
  author: string,
  rating: number,
  comment: string,
  date: string = new Date().toISOString()
) {
  const { data, error } = await supabase.from("reviews").insert([
    {
      hotelId,
      author,
      rating,
      comment,
      date,
    },
  ]);

  if (error) throw error;
  return data;
}
