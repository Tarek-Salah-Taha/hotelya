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
import { motion } from "framer-motion";
import { FaUser, FaChild } from "react-icons/fa";

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

  const { user, loading } = useUser();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setMonthsToShow(isMobile ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getNights = () => {
    if (!startDate || !endDate) return 0;
    return Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
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
      roomType: roomType || "",
      status: "Confirmed",
      priceNew: price,
      totalNights,
    });

    toast.success("Booking confirmed!");
    router.push(`/${locale}/bookings`);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl mx-auto mt-10 p-6 sm:p-10 bg-white rounded-3xl shadow-xl space-y-8 text-text"
    >
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">
          Book: {roomType}
        </h2>
        <p className="text-sm text-gray-500">
          {hotelName}, {city}, {country}
        </p>
      </div>

      {/* Date Picker */}
      <div className="overflow-hidden">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          Select Dates
        </h3>
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
          calendarClassName="!bg-white !p-4 !rounded-xl !shadow-md !text-sm"
        />
      </div>

      {/* Guest Selection */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Adults Select */}
        <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-1">
              <FaUser className="text-primary text-xs" />
              Adults
            </span>
          </label>
          <div className="relative">
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:border-primary focus:ring-2 focus:ring-success rounded-lg shadow-sm transition-all"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Adult" : "Adults"}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Children Select */}
        <motion.div whileHover={{ scale: 1.01 }} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-1">
              <FaChild className="text-primary text-xs" />
              Children
            </span>
          </label>
          <div className="relative">
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:border-primary focus:ring-2 focus:ring-success rounded-lg shadow-sm transition-all"
            >
              {[0, 1, 2, 3].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Child" : "Children"}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </motion.div>

      {/* Price Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-t border-gray-200 pt-6"
      >
        <h4 className="font-bold text-lg text-gray-800 mb-4">
          Booking Summary
        </h4>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price per night:</span>
            <span className="font-medium">${price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Nights:</span>
            <span className="font-medium">{totalNights}</span>
          </div>

          <div className="border-t border-gray-200 my-3"></div>

          <div className="flex justify-between items-center">
            <span className="text-gray-800 font-semibold">Total:</span>
            <motion.span
              className="text-xl font-bold text-primary"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ${totalPrice.toFixed(2)}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Cancellation Policy */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-t border-gray-200 pt-6"
      >
        <h4 className="font-bold text-lg text-gray-800 mb-3">
          Cancellation Policy
        </h4>

        <motion.div
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          whileHover={{ scale: 1.005 }}
        >
          <p className="text-sm text-gray-700 leading-relaxed">
            Free cancellation up to 48 hours before check-in. After that, a
            1-night fee will be charged. No-shows will be charged the full
            price.
          </p>
        </motion.div>
      </motion.div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleConfirmBooking}
        className="w-full sm:w-auto bg-primary text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-opacity-90 transition"
      >
        Confirm Booking
      </motion.button>
    </motion.div>
  );
}
