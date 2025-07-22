import { SupportedLang } from "../_types/types";
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

export async function getBookingsByUser(
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

export async function getBookedDateRanges(roomId: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("checkInDate, checkOutDate")
    .eq("roomId", roomId);

  if (error) throw error;
  return data;
}

export async function cancelBooking(bookingId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "Cancelled" })
    .eq("id", bookingId);

  if (error) throw error;
  return data;
}
