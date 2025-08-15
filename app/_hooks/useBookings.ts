"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchUserBookingsWithHotelInfo,
  cancelHotelBooking,
} from "@/app/_lib/bookingsApi";
import { Booking, SupportedLang } from "@/app/_types/types";
import { useTranslations } from "next-intl";

export function useBookings(userId: string | undefined, locale: SupportedLang) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const tBooking = useTranslations("BookingPage");

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchUserBookingsWithHotelInfo(userId, locale)
      .then((data) => setBookings(data))
      .catch(() => toast.error(tBooking("Failed to load bookings")))
      .finally(() => setIsLoading(false));
  }, [userId, locale, tBooking]);

  async function cancelBooking(bookingId: string) {
    try {
      await cancelHotelBooking(bookingId);
      toast.success(tBooking("Booking has been cancelled"));
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch {
      toast.error(tBooking("Failed to cancel booking"));
    }
  }

  return { bookings, isLoading, cancelBooking, setBookings };
}
