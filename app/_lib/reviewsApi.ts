import supabase from "./supabase";

// Fetches all reviews for the specified hotel, sorted by newest first.
export async function fetchHotelReviews(hotelId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("hotelId", hotelId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to fetch hotel reviews:", error.message);
    throw new Error("Could not load hotel reviews.");
  }

  return data;
}

// Submits a new review for the specified hotel with rating, comment, and author.
export async function submitHotelReview(
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

  if (error) {
    console.error("Failed to submit review:", error.message);
    throw new Error("Review submission failed.");
  }

  return data;
}
