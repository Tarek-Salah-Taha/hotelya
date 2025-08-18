import supabase from "./supabase";

// Fetches all reviews for the specified hotel, sorted by newest first.
export async function fetchHotelReviews(hotelId: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("hotelId", hotelId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Failed to fetch hotel reviews:", error.message);
    throw new Error(error.message || "Could not load hotel reviews.");
  }

  return data ?? [];
}

// Submits a new review for the specified hotel with rating, comment, and author.
export async function submitHotelReview(
  hotelId: number,
  author: string,
  rating: number,
  comment: string,
  date: string = new Date().toISOString()
) {
  try {
    const reviewId = Date.now();

    const { data, error } = await supabase.from("reviews").insert([
      {
        id: reviewId,
        hotelId,
        author,
        rating,
        comment,
        date,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(error.message || "Failed to submit review");
    }

    return data;
  } catch (error) {
    if (error) {
      console.error("Failed to submit review:");
      throw new Error("Review submission failed.");
    }
  }
}
