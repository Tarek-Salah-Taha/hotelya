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
import {
  FaUser,
  FaChild,
  FaHotel,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaInfoCircle,
} from "react-icons/fa";

import { useTranslations } from "next-intl";

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

  const tRoomDescriptions = useTranslations("RoomDescriptions");
  const tRoomTypes = useTranslations("RoomTypes");

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
      toast.error(tRoomDescriptions("You must be logged in to book a room"));
      router.push(`/${locale}/auth/login`);
      return;
    }

    if (!startDate || !endDate) {
      toast.error(tRoomDescriptions("Please select dates"));
      return;
    }

    try {
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

      toast.success(tRoomDescriptions("Booking confirmed"));
      router.push(`/${locale}/bookings`);
    } catch (error) {
      console.error(error);
      toast.error(tRoomDescriptions("Failed to create booking"));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 sm:p-8 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {tRoomDescriptions("Complete Your Booking")}
          </h1>
          <div className="flex items-center mt-2 space-x-2 text-sm sm:text-base">
            <FaHotel className="text-white/80" />
            <span className="text-white/90">{hotelName}</span>
            <span className="text-white/70">•</span>
            <span className="text-white/80">
              {city} • {country}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Room Info */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              {tRoomDescriptions("Room Details")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  {tRoomDescriptions("Room Type")}
                </p>
                <p className="font-medium">
                  {tRoomTypes(roomType || "Unknown")}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  {tRoomDescriptions("Price Per Night")}
                </p>
                <p className="font-medium">
                  {price} {tRoomDescriptions("$")}
                </p>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <FaCalendarAlt className="text-primary mr-2" />
              <h3 className="font-semibold text-lg text-gray-800">
                {tRoomDescriptions("Select Dates")}
              </h3>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
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
                calendarClassName="!border-0 !p-4 !bg-white"
                dayClassName={() => "!rounded-md hover:!bg-primary/10"}
                weekDayClassName={() => "!text-gray-500 !font-normal"}
                monthClassName={() => "!text-gray-800"}
              />
            </div>
          </div>

          {/* Guest Selection */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Adults Select */}
            <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  <FaUser className="text-primary" />
                  {tRoomDescriptions("Adults")}
                </span>
              </label>
              <div className="relative">
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="block w-full pl-10 pr-3 py-3 text-base border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg shadow-sm transition-all bg-white appearance-none"
                >
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>
                      {num === 1
                        ? tRoomDescriptions("Adult")
                        : `${num} ${tRoomDescriptions("Adults")}`}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
              </div>
            </motion.div>

            {/* Children Select */}
            <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  <FaChild className="text-primary" />
                  {tRoomDescriptions("Children")}
                </span>
              </label>
              <div className="relative">
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="block w-full pl-10 pr-3 py-3 text-base border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg shadow-sm transition-all bg-white appearance-none"
                >
                  {[0, 1, 2, 3].map((num) => (
                    <option key={num} value={num}>
                      {num === 1
                        ? tRoomDescriptions("Child")
                        : `${num} ${tRoomDescriptions("Children")}`}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaChild className="text-gray-400" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Price Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 p-6 rounded-lg border border-gray-100"
          >
            <div className="flex items-center mb-4 space-x-2">
              <FaMoneyBillWave className="text-primary mr-2" />
              <h3 className="font-semibold text-lg text-gray-800">
                {tRoomDescriptions("Booking Summary")}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {tRoomDescriptions("Price Per Night")}
                </span>
                <span className="font-medium">
                  {price} {tRoomDescriptions("$")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {tRoomDescriptions("Nights")}
                </span>
                <span className="font-medium">{totalNights}</span>
              </div>

              <div className="border-t border-gray-200 my-2"></div>

              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-semibold">
                  {tRoomDescriptions("Subtotal")}
                </span>
                <span className="font-medium">
                  {totalPrice.toFixed(2)} {tRoomDescriptions("$")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {tRoomDescriptions("Taxes & Fees")}
                </span>
                <span className="font-medium">
                  {(totalPrice * 0.1).toFixed(2)} {tRoomDescriptions("$")}
                </span>
              </div>

              <div className="border-t border-gray-200 my-2"></div>

              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-bold text-lg">
                  {tRoomDescriptions("Total")}
                </span>
                <motion.span
                  className="text-xl font-bold text-primary"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {(totalPrice * 1.1).toFixed(2)} {tRoomDescriptions("$")}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Cancellation Policy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 p-6 rounded-lg border border-blue-100"
          >
            <div className="flex items-center mb-3 space-x-2">
              <FaInfoCircle className="text-blue-500 mr-2" />
              <h3 className="font-semibold text-lg text-gray-800">
                {tRoomDescriptions("General Cancellation Policy")}
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {tRoomDescriptions("Free cancellation")}
            </p>
          </motion.div>

          {/* Button */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirmBooking}
              disabled={!startDate || !endDate}
              className={`w-full py-4 px-6 rounded-xl shadow-md font-bold text-white transition ${
                !startDate || !endDate
                  ? "bg-gray-400 cursor-not-allowed"
                  : " bg-primary  hover:opacity-90"
              }`}
            >
              {tRoomDescriptions("Confirm Booking")}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
