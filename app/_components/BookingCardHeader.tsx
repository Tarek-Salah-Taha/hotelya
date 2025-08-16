import { BookingLocalizedHotel } from "../_lib/transformHotel";
import { statusColors } from "../_helpers/statusColors";
import { useTranslations } from "next-intl";

type BookingCardHeaderProps = {
  hotel: BookingLocalizedHotel;
  status: string;
  tBooking: ReturnType<typeof useTranslations>;
};

export default function BookingCardHeader({
  hotel,
  status,
  tBooking,
}: BookingCardHeaderProps) {
  return (
    <div className="flex justify-between items-start gap-4 mb-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          {hotel.hotelName}
        </h2>
        <p className="text-gray-600">
          {hotel.city} • {hotel.country}
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
  );
}
