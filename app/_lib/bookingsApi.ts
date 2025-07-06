import supabase from "./supabase";

export async function createBooking(booking: {
  userId: string;
  hotelId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  numAdults: number;
  numChildren: number;
  totalPrice: number;
  status?: string;
}) {
  const { data, error } = await supabase.from("bookings").insert([
    {
      ...booking,
      status: booking.status || "confirmed",
    },
  ]);

  if (error) throw error;
  return data;
}

export async function getBookingsByUser(userId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "*, hotel:hotelId(hotelName_en, city_en, country_en, exteriorImages)"
    )
    .eq("userId", userId);

  if (error) throw error;
  return data;
}

export async function getBookedDateRanges(roomId: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("checkInDate, checkOutDate")
    .eq("roomId", roomId);

  if (error) throw error;
  return data;
}
