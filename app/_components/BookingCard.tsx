import { motion } from "framer-motion";
import Image from "next/image";
import { Booking, SupportedLang } from "../_types/types";
import { useTranslations } from "next-intl";
import { getTotalNights } from "../_helpers/getTotalNights";
import { statusColors } from "../_helpers/statusColors";
import { formatDate } from "../_helpers/formatDate";

type BookingCardProps = {
  booking: Booking;
  locale: SupportedLang;
  activeTab: "upcoming" | "past";
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
  const hotel = booking.hotel;
  const hotelName =
    (hotel?.[`hotelName_${locale}` as keyof typeof hotel] as string) || "Hotel";
  const city =
    (hotel?.[`city_${locale}` as keyof typeof hotel] as string) || "";
  const country =
    (hotel?.[`country_${locale}` as keyof typeof hotel] as string) || "";
  const status = booking.status || "Confirmed";
  const totalNights = getTotalNights(booking.checkInDate, booking.checkOutDate);
  const pricePerNight = booking.priceNew || booking.totalPrice / totalNights;

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
                {formatDate(booking.createdAt, locale)}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                {tBooking("Check-in")}
              </h3>
              <p className="text-gray-900">
                {formatDate(booking.checkInDate, locale)}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                {tBooking("Check-out")}
              </h3>
              <p className="text-gray-900">
                {formatDate(booking.checkOutDate, locale)}
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
                      : `${booking.numChildren} ${tBooking("children")}`}
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
                {activeTab === "upcoming" && status === "Confirmed" && (
                  <button
                    onClick={() => onCancel(booking.id)}
                    className="flex-1 bg-white border border-red-300 text-red-500 font-medium px-4 py-3 rounded-lg hover:bg-accent transition flex items-center justify-center gap-1 hover:text-white"
                  >
                    {tBooking("Cancel Booking")}
                  </button>
                )}
                {activeTab === "past" && (
                  <button
                    onClick={() => onRebook(booking.hotelId)}
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
}
