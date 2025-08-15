"use client";

import { Booking, SupportedLang, BookingTab } from "@/app/_types/types";
import BookingCard from "./BookingCard";
import { useTranslations } from "next-intl";

type BookingListProps = {
  bookings: Booking[];
  locale: SupportedLang;
  activeTab: BookingTab;
  onCancel: (id: string) => void;
  onRebook: (id: string) => void;
  tBooking: ReturnType<typeof useTranslations>;
  tRoom: ReturnType<typeof useTranslations>;
};

export default function BookingList({
  bookings,
  locale,
  activeTab,
  onCancel,
  onRebook,
  tBooking,
  tRoom,
}: BookingListProps) {
  return (
    <div className="grid gap-6">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          locale={locale}
          activeTab={activeTab}
          onCancel={onCancel}
          onRebook={onRebook}
          tBooking={tBooking}
          tRoom={tRoom}
        />
      ))}
    </div>
  );
}
