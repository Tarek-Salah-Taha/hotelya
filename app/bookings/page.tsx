"use client";

import { useState, useEffect } from "react";
import { useUser } from "../_hooks/useUser";
import toast from "react-hot-toast";
import Image from "next/image";
import { getBookingsByUser } from "../_lib/bookingsApi";

type Booking = {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  hotel?: {
    hotelName_en?: string;
    city_en?: string;
    country_en?: string;
    exteriorImages?: string;
  };
};

export default function BookingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user) return;

    getBookingsByUser(user.id)
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load bookings");
      });
  }, [user]);

  const today = new Date();

  const filteredBookings = bookings.filter((b) => {
    const isPast = new Date(b.checkOutDate) < today;
    return activeTab === "past" ? isPast : !isPast;
  });

  if (!user) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Please log in to view bookings
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-[color:var(--color-text)]">
        My Bookings
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-l-full border border-[color:var(--color-primary)] text-sm font-medium ${
            activeTab === "upcoming"
              ? "bg-[color:var(--color-primary)] text-white"
              : "bg-white text-[color:var(--color-primary)]"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-r-full border border-[color:var(--color-primary)] text-sm font-medium ${
            activeTab === "past"
              ? "bg-[color:var(--color-primary)] text-white"
              : "bg-white text-[color:var(--color-primary)]"
          }`}
        >
          Past
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No {activeTab} bookings found.
        </p>
      ) : (
        <div className="grid gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row"
            >
              <Image
                src={booking.hotel?.exteriorImages || "/placeholder.jpg"}
                width={400}
                height={400}
                alt={booking.hotel?.hotelName_en || "Hotel"}
                className="w-full md:w-48 h-48 object-cover"
              />
              <div className="p-4 flex-1">
                <h2 className="text-lg font-semibold text-[color:var(--color-text)]">
                  {booking.hotel?.hotelName_en}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  {booking.hotel?.city_en}, {booking.hotel?.country_en}
                </p>
                <p className="text-sm text-gray-500">
                  {booking.checkInDate.slice(0, 10)} →{" "}
                  {booking.checkOutDate.slice(0, 10)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
