import { SupportedLang } from "../_types/types";
import supabase from "./supabase";

// Creates a new hotel booking with the given details and default status if not provided.
export async function createHotelBooking(booking: {
  userId: string;
  hotelId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  numAdults: number;
  numChildren: number;
  totalPrice: number;
  status?: string;
  createdAt: string;
  roomType: string;
  priceNew: number;
  totalNights: number;
}) {
  const { data, error } = await supabase.from("bookings").insert([
    {
      ...booking,
      status: booking.status || "Confirmed",
    },
  ]);

  if (error) throw error;
  return data;
}

// Fetches all bookings for a user along with localized hotel details.
export async function fetchUserBookingsWithHotelInfo(
  userId: string,
  locale: SupportedLang = "en"
) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `*, hotel:hotelId(hotelName_${locale}, city_${locale}, country_${locale}, exteriorImages)`
    )
    .eq("userId", userId);

  if (error) throw error;
  return data;
}

// Retrieves all booked check-in and check-out date ranges for the given room.
export async function fetchBookedDateRangesByRoom(roomId: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("checkInDate, checkOutDate")
    .eq("roomId", roomId);

  if (error) throw error;
  return data;
}

// Updates the status of a booking to "Cancelled" by its ID.
export async function cancelHotelBooking(bookingId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "Cancelled" })
    .eq("id", bookingId);

  if (error) throw error;
  return data;
}
