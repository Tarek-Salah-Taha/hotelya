"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Image from "next/image";
import { getBookingsByUser, cancelBooking } from "../_lib/bookingsApi";
import { usePathname, useRouter } from "next/navigation";
import { Booking, SupportedLang } from "../_types/types";
import { useUser } from "../_hooks/useUser";
import SkeletonLoader from "./SkeletonLoader";
import { useTranslations } from "next-intl";

const statusColors: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-600",
  Cancelled: "bg-red-100 text-red-600",
};

const getDateLocale = (locale: SupportedLang) => {
  switch (locale) {
    case "fr":
      return "fr-FR";
    case "de":
      return "de-DE";
    case "es":
      return "es-ES";
    case "it":
      return "it-IT";
    case "ar":
      return "ar-EG";
    default:
      return "en-US";
  }
};

const formatDate = (dateString: string, locale: SupportedLang) => {
  return new Date(dateString).toLocaleString(getDateLocale(locale), {
    month: "short",
    day: "numeric",
    year: "numeric",
    numberingSystem: "latn", // 👈 Force 0-9 digits
  });
};

export default function Page() {
  const { user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "name">("latest");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "confirmed" | "cancelled"
  >("all");

  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const router = useRouter();

  const tBooking = useTranslations("BookingPage");

  const tRoom = useTranslations("RoomTypes");

  console.log(bookings);

  const handleCancelBooking = async function (bookingId: string) {
    try {
      await cancelBooking(bookingId);
      toast.success(tBooking("Booking has been cancelled"));
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch {
      toast.error(tBooking("Failed to cancel booking"));
    }
  };

  function handleRebook(hotelId: string) {
    if (!hotelId) return;
    router.push(`/${locale}/hotels/${hotelId}`);
  }

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getBookingsByUser(user.id, locale as SupportedLang)
      .then((data) => setBookings(data))
      .catch(() => toast.error(tBooking("Failed to load bookings")))
      .finally(() => setIsLoading(false));
  }, [user, locale, tBooking]);

  const today = new Date();

  const getTotalNights = (checkInDate: string, checkOutDate: string) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffInMs = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  };

  let filteredBookings = bookings.filter((b) => {
    const isPast = new Date(b.checkOutDate) < today;
    const matchesTab = activeTab === "past" ? isPast : !isPast;
    const matchesStatus =
      statusFilter === "all"
        ? true
        : b.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesTab && matchesStatus;
  });

  filteredBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return (a.hotel?.hotelName_en || "").localeCompare(
      b.hotel?.hotelName_en || ""
    );
  });

  const handleCancelClick = (bookingId: string) => {
    toast.custom(
      (tObj) => (
        <div
          className={`${tObj.visible ? "animate-enter" : "animate-leave"} 
      max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col p-4`}
        >
          <div className="text-sm font-medium text-gray-900 mb-2">
            {tBooking("Confirm Cancellation")}
          </div>
          <div className="text-sm text-gray-500 mb-4">
            {tBooking("Are you sure you want to cancel this booking?")}
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(tObj.id)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              {tBooking("No")}
            </button>
            <button
              onClick={() => {
                handleCancelBooking(bookingId);
                toast.dismiss(tObj.id);
              }}
              className="px-3 py-1.5 text-sm bg-red-500 text-white hover:bg-red-600 rounded"
            >
              {tBooking("Yes, Cancel")}
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (userLoading) {
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />; // Or any loading UI
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-center text-gray-500 text-lg">
          {tBooking("Please log in to view your bookings")}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <SkeletonLoader />;
  }

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

      {/* Tabs and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {["upcoming", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "upcoming" | "past")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
            >
              {tab === "upcoming" ? tBooking("Upcoming") : tBooking("Past")}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{tBooking("Status")}:</span>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as "all" | "confirmed" | "cancelled"
              )
            }
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary] focus:border-transparent"
          >
            <option value="all">{tBooking("All")}</option>
            <option value="Confirmed">{tBooking("Confirmed")}</option>
            <option value="Cancelled">{tBooking("Cancelled")}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{tBooking("Sort by")}:</span>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "latest" | "oldest" | "name")
            }
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary] focus:border-transparent"
          >
            <option value="latest">{tBooking("Latest")}</option>
            <option value="oldest">{tBooking("Oldest")}</option>
            <option value="name">{tBooking("Hotel Name")}</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {filteredBookings.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {tBooking("No Bookings Found")}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {activeTab === "upcoming"
              ? tBooking("You don't have any upcoming reservations")
              : tBooking(
                  "Your past bookings will appear here once you've completed a stay"
                )}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredBookings.map((booking) => {
            const hotel = booking.hotel;
            const hotelName =
              (hotel?.[
                `hotelName_${locale}` as keyof typeof hotel
              ] as string) || "Hotel";
            const city =
              (hotel?.[`city_${locale}` as keyof typeof hotel] as string) || "";
            const country =
              (hotel?.[`country_${locale}` as keyof typeof hotel] as string) ||
              "";
            const status = booking.status || "Confirmed";
            const totalNights = getTotalNights(
              booking.checkInDate,
              booking.checkOutDate
            );
            const pricePerNight =
              booking.priceNew || booking.totalPrice / totalNights;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={booking.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
                  <div className="relative h-60 sm:h-72 md:h-auto md:min-h-[200px] md:max-w-[300px] md:w-full">
                    <Image
                      src={hotel?.exteriorImages || "/placeholder.jpg"}
                      fill
                      alt={hotelName}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                      priority={false}
                    />
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          {hotelName}
                        </h2>
                        <p className="text-gray-600">
                          {city} • {country}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                          statusColors[status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tBooking(status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {tBooking("Booking Date")}
                        </h3>
                        <p className="text-gray-900">
                          {formatDate(
                            booking.createdAt,
                            locale as SupportedLang
                          )}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {tBooking("Check-in")}
                        </h3>
                        <p className="text-gray-900">
                          {formatDate(
                            booking.checkInDate,
                            locale as SupportedLang
                          )}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {tBooking("Check-out")}
                        </h3>
                        <p className="text-gray-900">
                          {formatDate(
                            booking.checkOutDate,
                            locale as SupportedLang
                          )}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {tBooking("Duration")}
                        </h3>
                        <p className="text-gray-900">
                          {totalNights === 1
                            ? tBooking("One night")
                            : `${totalNights} ${tBooking("nights")}`}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {tBooking("Room Type")}
                        </h3>
                        <p className="text-gray-900 capitalize">
                          {tRoom(booking.roomType) || "Standard"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {tBooking("Price/Night")}
                        </h3>
                        <p className="text-gray-900">
                          {pricePerNight.toFixed(2)} {tBooking("$")}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          {tBooking("Guests")}
                        </h3>
                        <p className="text-gray-900">
                          {booking.numAdults === 1
                            ? tBooking("One adult")
                            : `${booking.numAdults} ${tBooking("adults")}`}
                          {booking.numChildren > 0 && (
                            <span>
                              {" "}
                              •{" "}
                              {booking.numChildren === 1
                                ? tBooking("One child")
                                : `${booking.numChildren} ${tBooking(
                                    "children"
                                  )}`}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            {tBooking("Total Price")}
                          </h3>
                          <p className="text-xl font-semibold text-primary">
                            {booking.totalPrice.toFixed(2)} {tBooking("$")}
                          </p>
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto">
                          {activeTab === "upcoming" &&
                            status === "Confirmed" && (
                              <button
                                onClick={() => handleCancelClick(booking.id)}
                                className="flex-1 bg-white border border-red-300 text-red-500 font-medium px-4 py-3 rounded-lg hover:bg-accent transition flex items-center justify-center gap-1 hover:text-white"
                              >
                                {tBooking("Cancel Booking")}
                              </button>
                            )}
                          {activeTab === "past" && (
                            <button
                              onClick={() => handleRebook(booking.hotelId)}
                              className="flex flex-1 items-center justify-center gap-2 px-4 py-3 bg-primary text-white border border-transparent rounded-xl text-base font-semibold transition-all duration-200 hover:bg-white hover:text-primary hover:border-primary active:bg-white active:text-primary active:border-primary hover:shadow-lg"
                            >
                              {tBooking("Rebook")}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
