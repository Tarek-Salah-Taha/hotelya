"use client";

import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import {
  FaBed,
  FaRulerCombined,
  FaBath,
  FaUser,
  FaChild,
} from "react-icons/fa";
import { LuBaby } from "react-icons/lu";
import supabase from "../_lib/supabase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RoomCardProps, SupportedLang } from "../_types/types";
import { motion, AnimatePresence } from "framer-motion";

function RoomCard({
  hotelId,
  roomId,
  roomType,
  image,
  priceNew,
  priceOld,
  specs,
  roomDescription,
}: RoomCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const router = useRouter();

  const pathname = usePathname();
  const locale: SupportedLang = (
    ["en", "fr", "es"].includes(pathname.split("/")[1])
      ? pathname.split("/")[1]
      : "en"
  ) as SupportedLang;

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select a date range");
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      roomId,
      checkInDate: startDate.toISOString(),
      checkOutDate: endDate.toISOString(),
    });

    if (error) {
      toast.error("Booking failed");
      console.error(error);
    } else {
      toast.success("Room booked!");
      setIsOpen(false);
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col md:flex-row border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4 md:space-y-0 md:space-x-6"
    >
      {/* Room Image */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-full md:w-1/3 overflow-hidden rounded-lg"
      >
        <Image
          src={image}
          alt={roomType}
          width={300}
          height={300}
          className="w-full h-52 md:h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </motion.div>

      {/* Room Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">{roomType}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
            {[
              {
                icon: <FaRulerCombined className="text-primary" />,
                text: `${specs.area} m²`,
              },
              {
                icon: <FaBed className="text-primary" />,
                text: `${specs.bed} Bed(s) (${specs.bedType})`,
              },
              {
                icon: <FaBath className="text-primary" />,
                text: `${specs.bathrooms} Bathroom(s)`,
              },
              {
                icon: <FaUser className="text-primary" />,
                text: `${specs.adults} Adult(s)`,
              },
              specs.children > 0 && {
                icon: <FaChild className="text-primary" />,
                text: `${specs.children} Children`,
              },
              specs.extraBed && {
                icon: <LuBaby className="text-primary" />,
                text: "Free crib available",
              },
            ]
              .filter(Boolean)
              .map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full"
                >
                  {item && "icon" in item && item.icon}
                  <span>{item && "text" in item ? item.text : ""}</span>
                </motion.div>
              ))}
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">{roomDescription}</p>
        </div>

        {/* Price & Button */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            {priceOld && (
              <p className="line-through text-gray-400">${priceOld}</p>
            )}
            <p className="text-2xl font-bold text-primary">${priceNew}</p>
            <p className="text-sm text-gray-500">per night</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-success text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 w-full sm:w-auto text-center"
            onClick={() =>
              router.push(
                `/${locale}/rooms/${roomId}?price=${priceNew}&roomType=${encodeURIComponent(
                  roomType
                )}&hotelId=${hotelId}&hotelName=${encodeURIComponent(
                  "Sea Breeze Hotel"
                )}&city=Cairo&country=Egypt`
              )
            }
          >
            Check Availability
          </motion.button>
        </div>
      </div>

      {/* Date Picker Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Select Date Range
              </h3>
              <div className="flex flex-col gap-4">
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
                  minDate={new Date()}
                  calendarClassName="bg-gray-50 p-4 rounded-lg text-gray-800"
                  dayClassName={(date) =>
                    date.getDate() === startDate?.getDate() ||
                    date.getDate() === endDate?.getDate()
                      ? "bg-primary text-white rounded-md"
                      : "rounded-md transition-colors hover:bg-sucess hover:text-gray-900"
                  }
                />
                <div className="flex justify-end gap-3 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm bg-primary hover:bg-success text-white rounded-lg transition-colors"
                    onClick={handleBooking}
                  >
                    Confirm Booking
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RoomCard;
