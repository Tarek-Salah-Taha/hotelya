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
import "../custom-datepicker.css";

type RoomCardProps = {
  hotelId: number;
  roomId: number;
  roomType: string;
  image: string;
  priceNew: number;
  priceOld?: number;
  specs: {
    area: number;
    bed: number;
    bedType: string;
    bathrooms: number;
    adults: number;
    children: number;
    extraBed: boolean;
  };
  roomDescription: string;
};

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
    <div className="relative flex flex-col md:flex-row border rounded-xl p-4 bg-white shadow-sm space-y-4 md:space-y-0 md:space-x-6">
      {/* Room Image */}
      <div className="w-full md:w-1/3">
        <Image
          src={image}
          alt={roomType}
          width={300}
          height={300}
          className="rounded-lg w-full h-52 object-cover"
          loading="lazy"
        />
      </div>

      {/* Room Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-text">{roomType}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <FaRulerCombined className="text-primary" />
              {specs.area} m²
            </div>
            <div className="flex items-center gap-1">
              <FaBed className="text-primary" />
              {specs.bed} Bed(s) ({specs.bedType})
            </div>
            <div className="flex items-center gap-1">
              <FaBath className="text-primary" />
              {specs.bathrooms} Bathroom(s)
            </div>
            <div className="flex items-center gap-1">
              <FaUser className="text-primary" />
              {specs.adults} Adult(s)
            </div>
            {specs.children > 0 && (
              <div className="flex items-center gap-1">
                <FaChild className="text-primary" />
                {specs.children} Children
              </div>
            )}
            {specs.extraBed && (
              <div className="flex items-center gap-1">
                <LuBaby className="text-primary" />
                Free crib available upon request
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">{roomDescription}</p>
        </div>

        {/* Price & Button */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            {priceOld && (
              <p className="line-through text-sm text-gray-400">${priceOld}</p>
            )}
            <p className="text-xl font-bold text-primary">${priceNew}</p>
          </div>
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90"
            onClick={() =>
              router.push(
                `/rooms/${roomId}?price=${priceNew}&roomType=${encodeURIComponent(
                  roomType
                )}&hotelId=${hotelId}&hotelName=${encodeURIComponent(
                  "Sea Breeze Hotel"
                )}&city=Cairo&country=Egypt`
              )
            }
          >
            Check Availability
          </button>
        </div>
      </div>

      {/* Date Picker Modal */}
      {isOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-text">
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
                calendarClassName="bg-header p-4 rounded-xl text-text"
                dayClassName={() =>
                  "rounded-md transition-colors hover:bg-accent hover:text-text"
                }
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  className="px-4 py-2 text-sm bg-gray-200 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm bg-primary text-white rounded"
                  onClick={handleBooking}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomCard;
