"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useUser } from "@/app/_hooks/useUser";
import { useBookings } from "@/app/_hooks/useBookings";
import {
  SupportedLang,
  BookingTab,
  BookingSort,
  BookingStatusFilter,
} from "@/app/_types/types";
import NoBookingsMessage from "@/app/_components/NoBookingsMessage";
import SkeletonLoader from "@/app/_components/SkeletonLoader";
import BookingsControls from "@/app/_components/BookingsControls";
import ConfirmActionToast from "@/app/_components/ConfirmActionToast";
import BookingList from "@/app/_components/BookingList";
import { filterAndSortBookings } from "@/app/_utils/bookingsUtils";
import { useLocale } from "next-intl";
import { useMemo } from "react";

export default function Page() {
  const { user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState<BookingTab>("upcoming");
  const [sortBy, setSortBy] = useState<BookingSort>("latest");
  const [statusFilter, setStatusFilter] = useState<BookingStatusFilter>("all");

  const locale = useLocale() as SupportedLang;
  const router = useRouter();

  const tBooking = useTranslations("BookingPage");
  const tRoom = useTranslations("RoomTypes");

  const { bookings, isLoading, cancelBooking } = useBookings(user?.id, locale);

  const handleRebook = (hotelId: string) => {
    if (hotelId) router.push(`/${locale}/hotels/${hotelId}`);
  };

  const handleCancelClick = (bookingId: string) => {
    toast.custom(
      (tObj) => (
        <ConfirmActionToast
          message={tBooking("Are you sure you want to cancel this booking?")}
          confirmLabel={tBooking("Yes, Cancel")}
          cancelLabel={tBooking("No")}
          onConfirm={() => {
            cancelBooking(bookingId);
            toast.dismiss(tObj.id);
          }}
          onCancel={() => toast.dismiss(tObj.id)}
        />
      ),
      { duration: Infinity }
    );
  };

  const filteredBookings = useMemo(
    () =>
      filterAndSortBookings(bookings, activeTab, statusFilter, sortBy, locale),
    [bookings, activeTab, statusFilter, sortBy, locale]
  );

  if (userLoading)
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />;
  if (!user)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-center text-gray-500 text-lg">
          {tBooking("Please log in to view your bookings")}
        </p>
      </div>
    );
  if (isLoading) return <SkeletonLoader />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          {tBooking("bookings")}
        </h1>
        <p className="text-gray-600">
          {activeTab === "upcoming"
            ? tBooking("Upcoming stays")
            : tBooking("Past reservations")}
        </p>
      </div>

      <BookingsControls
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        tBooking={tBooking}
      />

      {!isLoading && filteredBookings.length === 0 ? (
        <NoBookingsMessage activeTab={activeTab} tBooking={tBooking} />
      ) : (
        <BookingList
          bookings={filteredBookings}
          locale={locale}
          activeTab={activeTab}
          onCancel={handleCancelClick}
          onRebook={handleRebook}
          tBooking={tBooking}
          tRoom={tRoom}
        />
      )}
    </div>
  );
}
