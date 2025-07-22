"use client";

import { useUser } from "@/app/_hooks/useUser";
import { createBooking } from "@/app/_lib/bookingsApi";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { use } from "react";
import { SupportedLang } from "@/app/_types/types";

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string; locale: SupportedLang }>;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { id, locale } = use(params);
  const roomId = Number(id);

  const hotelId = Number(searchParams.get("hotelId"));

  const roomType = searchParams.get("roomType");
  const price = Number(searchParams.get("price"));
  const hotelName = searchParams.get("hotelName") || "Unknown Hotel";
  const city = searchParams.get("city") || "Unknown City";
  const country = searchParams.get("country") || "Unknown Country";

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [monthsToShow, setMonthsToShow] = useState(2);

  const { user } = useUser();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setMonthsToShow(isMobile ? 1 : 2); // 1 month on mobile
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getNights = () => {
    if (!startDate || !endDate) return 0;
    const diff = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  };

  const totalNights = getNights();
  const totalPrice = totalNights * price;

  const handleConfirmBooking = async () => {
    if (!user) {
      toast.error("You must be logged in to book a room.");
      router.push(`/${locale}/auth/login`);
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select dates.");
      return;
    }

    await createBooking({
      userId: user.id,
      hotelId,
      roomId,
      checkInDate: startDate.toISOString(),
      checkOutDate: endDate.toISOString(),
      numAdults: adults,
      numChildren: children,
      totalPrice,
      createdAt: new Date().toLocaleDateString(),
      roomType: searchParams.get("roomType") || "",
      status: "Confirmed",
      priceNew: price,
      totalNights,
    });

    console.log("Booking payload:", {
      roomId, // should not be null
      checkInDate: startDate.toISOString(),
      checkOutDate: endDate.toISOString(),
    });

    toast.success("Booking confirmed!");
    router.push(`/${locale}/bookings`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-8 text-text">
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Book: {roomType}
        </h2>
        <p className="text-sm text-gray-500">
          {hotelName}, {city}, {country}
        </p>
      </div>

      {/* Date Picker */}
      <div className="w-full overflow-hidden">
        <h3 className="font-medium text-lg mb-2">Select Dates</h3>
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates as [Date, Date];
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          monthsShown={monthsToShow}
          minDate={new Date()}
          calendarClassName="bg-white p-4 rounded-xl shadow-md text-sm"
        />
      </div>

      {/* Guest Selection */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Adults</label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="border rounded px-3 py-2 text-sm"
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">Children</label>
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="border rounded px-3 py-2 text-sm"
          >
            {[0, 1, 2, 3].map((num) => (
              <option key={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Summary */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-lg">Booking Summary</h4>
        <p className="text-sm text-gray-600">Nights: {totalNights}</p>
        <p className="text-sm text-gray-600">Price per night: ${price}</p>
        <p className="text-base font-semibold text-text">
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>

      {/* Cancellation Policy */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-lg">Cancellation Policy</h4>
        <p className="text-sm text-gray-600">
          Free cancellation up to 48 hours before check-in. After that, a
          1-night fee will be charged. No-shows will be charged the full price.
        </p>
      </div>

      <button
        className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-opacity-90"
        onClick={handleConfirmBooking}
      >
        Confirm Booking
      </button>
    </div>
  );
}
