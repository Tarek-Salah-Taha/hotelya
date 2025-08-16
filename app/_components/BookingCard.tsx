import { motion } from "framer-motion";
import Image from "next/image";
import { Booking, SupportedLang, BookingTab } from "../_types/types";
import { useTranslations } from "next-intl";
import {
  BookingLocalizedHotel,
  transformBookingHotelFields,
} from "../_lib/transformHotel";
import BookingCardHeader from "./BookingCardHeader";
import BookingCardDetails from "./BookingCardDetails";
import BookingCardFooter from "./BookingCardFooter";

type BookingCardProps = {
  booking: Booking;
  locale: SupportedLang;
  activeTab: BookingTab;
  onCancel: (bookingId: string) => void;
  onRebook: (hotelId: string) => void;
  tBooking: ReturnType<typeof useTranslations>;
  tRoom: ReturnType<typeof useTranslations>;
};

export default function BookingCard({
  booking,
  locale,
  activeTab,
  onCancel,
  onRebook,
  tBooking,
  tRoom,
}: BookingCardProps) {
  const hotel: BookingLocalizedHotel = transformBookingHotelFields(
    booking.hotel,
    locale
  );

  const hotelName = hotel.hotelName;

  return (
    <motion.div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
        <div className="relative h-60 sm:h-72 md:h-auto md:min-h-[200px] md:max-w-[300px] md:w-full">
          <Image
            src={hotel?.exteriorImages || "/placeholder.jpg"}
            fill
            alt={hotelName}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            blurDataURL="/placeholder.jpg"
            placeholder="blur"
          />
        </div>

        <div className="p-5 sm:p-6 flex flex-col">
          <BookingCardHeader
            hotel={hotel}
            status={booking.status || "Confirmed"}
            tBooking={tBooking}
          />

          <BookingCardDetails
            booking={booking}
            locale={locale}
            tBooking={tBooking}
            tRoom={tRoom}
          />

          <BookingCardFooter
            booking={booking}
            activeTab={activeTab}
            onCancel={onCancel}
            onRebook={onRebook}
            tBooking={tBooking}
          />
        </div>
      </div>
    </motion.div>
  );
}
