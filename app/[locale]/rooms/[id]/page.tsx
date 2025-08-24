"use client";

import { useUser } from "@/app/_hooks/useUser";
import { createHotelBooking } from "@/app/_lib/bookingsApi";
import { fetchRoomById } from "@/app/_lib/roomsApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { use } from "react";
import { RoomData, SupportedLang } from "@/app/_types/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { registerLocale } from "react-datepicker";
import RoomHeader from "@/app/_components/RoomHeader";

import { enUS as en } from "date-fns/locale/en-US";
import { fr } from "date-fns/locale/fr";
import { de } from "date-fns/locale/de";
import { es } from "date-fns/locale/es";
import { it } from "date-fns/locale/it";
import { arSA as ar } from "date-fns/locale/ar-SA";
import RoomInfo from "@/app/_components/RoomInfo";
import DateRangePicker from "@/app/_components/DateRangePicker";
import GuestSelectors from "@/app/_components/GuestSelectors";
import RoomPriceSummary from "@/app/_components/RoomPriceSummary";
import MotionButton from "@/app/_components/MotionButton";
import RoomCancellationPolicy from "@/app/_components/RoomCancellationPolicy";

registerLocale("en", en);
registerLocale("es", es);
registerLocale("fr", fr);
registerLocale("de", de);
registerLocale("it", it);
registerLocale("ar", ar);

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string; locale: SupportedLang }>;
}) {
  const router = useRouter();
  const { id, locale } = use(params);

  const roomId = Number(id);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [monthsToShow, setMonthsToShow] = useState(2);

  const [roomData, setRoomData] = useState<RoomData | null>(null);

  const { user } = useUser();

  const tRoomDescriptions = useTranslations("RoomDescriptions");
  const tRoomTypes = useTranslations("RoomTypes");

  // Check if hotel is an array and access the first item if it is
  const hotelData = Array.isArray(roomData?.hotel)
    ? roomData?.hotel[0]
    : roomData?.hotel;

  const hotelName = hotelData?.[`hotelName_${locale}`] || "";
  const city = hotelData?.[`city_${locale}`] || "";
  const country = hotelData?.[`country_${locale}`] || "";

  const roomType = roomData?.roomType || "";
  const price = roomData?.priceNew || 0;
  const hotelId = roomData?.hotelId || 0;

  useEffect(() => {
    async function loadRoomData() {
      try {
        const data = await fetchRoomById(id, locale); // use actual id from params
        setRoomData(data);
      } catch (error) {
        console.error("Failed to fetch room details:", error);
        toast.error("Failed to load room details");
      }
    }

    loadRoomData();
  }, [id, locale]);

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
  const taxes = totalPrice * 0.1;
  const grandTotal = totalPrice + taxes;

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
      await createHotelBooking({
        userId: user.id,
        hotelId,
        roomId,
        checkInDate: startDate.toISOString(),
        checkOutDate: endDate.toISOString(),
        numAdults: adults,
        numChildren: children,
        totalPrice: grandTotal,
        createdAt: new Date().toISOString(),
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header Section */}

        <RoomHeader
          title={tRoomDescriptions("Complete Your Booking")}
          hotelName={hotelName}
          city={city}
          country={country}
        />

        <div className="p-6 sm:p-8 space-y-8">
          {/* Room Info */}
          <RoomInfo
            t={tRoomDescriptions}
            tRoomTypes={tRoomTypes}
            roomType={roomType}
            price={price}
          />

          {/* Date Picker */}
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setDates={(s, e) => {
              setStartDate(s);
              setEndDate(e);
            }}
            monthsToShow={monthsToShow}
            locale={locale}
            t={tRoomDescriptions}
          />

          {/* Guest Selection */}
          <GuestSelectors
            adults={adults}
            setAdults={setAdults}
            childrenCount={children}
            setChildren={setChildren}
            t={tRoomDescriptions}
          />

          {/* Price Summary */}
          <RoomPriceSummary
            price={price}
            totalNights={totalNights}
            totalPrice={totalPrice}
            taxes={taxes}
            grandTotal={grandTotal}
            t={tRoomDescriptions}
          />

          {/* Cancellation Policy */}
          <RoomCancellationPolicy t={tRoomDescriptions} />

          {/* Button */}
          <div className="pt-4">
            <MotionButton
              label={tRoomDescriptions("Confirm Booking")}
              onClick={handleConfirmBooking}
              disabled={!startDate || !endDate}
              variant="primary"
              className="w-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
