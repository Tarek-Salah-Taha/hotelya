"use client";

import { useState, useMemo, useEffect } from "react";
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
import BookingsHeader from "@/app/_components/BookingsHeader";
import PaginationControls from "@/app/_components/PaginationControls";
import EmptyState from "@/app/_components/EmptyState";
import { FaRegUserCircle } from "react-icons/fa";

export default function Page() {
  const { user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState<BookingTab>("upcoming");
  const [sortBy, setSortBy] = useState<BookingSort>("latest");
  const [statusFilter, setStatusFilter] = useState<BookingStatusFilter>("all");
  const [page, setPage] = useState(1);

  const locale = useLocale() as SupportedLang;
  const router = useRouter();

  const tBooking = useTranslations("BookingPage");
  const tRoom = useTranslations("RoomTypes");
  const tHotels = useTranslations("HotelsPage");
  const tNavigation = useTranslations("Navigation");

  const ITEMS_PER_PAGE = 5;

  const {
    bookings,
    isLoading: isLoadingBooking,
    cancelBooking,
  } = useBookings(user?.id, locale);

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

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [activeTab, statusFilter, sortBy]);

  const paginatedBookings = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredBookings.slice(start, end);
  }, [filteredBookings, page]);

  if (userLoading || isLoadingBooking) return <SkeletonLoader />;

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <EmptyState
          icon={FaRegUserCircle}
          text={tBooking("Please log in to view your bookings")}
        />
        <button
          onClick={() => router.push(`/${locale}/auth/login`)}
          className="mt-6 px-6 py-2.5 bg-primary text-white font-medium rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition-all duration-300"
        >
          {tNavigation("signin")}
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <BookingsHeader activeTab={activeTab} tBooking={tBooking} />

      <BookingsControls
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        tBooking={tBooking}
      />

      {!isLoadingBooking && filteredBookings.length === 0 ? (
        <NoBookingsMessage activeTab={activeTab} tBooking={tBooking} />
      ) : (
        <BookingList
          bookings={paginatedBookings}
          locale={locale}
          activeTab={activeTab}
          onCancel={handleCancelClick}
          onRebook={handleRebook}
          tBooking={tBooking}
          tRoom={tRoom}
        />
      )}

      {totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
          onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          t={tHotels}
        />
      )}
    </div>
  );
}
