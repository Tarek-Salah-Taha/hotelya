import { Booking } from "../_types/types";
import { SupportedLang } from "../_types/types";
import { getTotalNights } from "../_helpers/getTotalNights";
import { formatDate } from "../_helpers/formatDate";
import { useTranslations } from "next-intl";
import DetailItem from "./DetailItem";

type BookingCardDetailsProps = {
  booking: Booking;
  locale: SupportedLang;
  tBooking: ReturnType<typeof useTranslations>;
  tRoom: ReturnType<typeof useTranslations>;
};

export default function BookingCardDetails({
  booking,
  locale,
  tBooking,
  tRoom,
}: BookingCardDetailsProps) {
  const totalNights = getTotalNights(booking.checkInDate, booking.checkOutDate);
  const pricePerNight = booking.priceNew || booking.totalPrice / totalNights;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
      <DetailItem
        label={tBooking("Booking Date")}
        value={formatDate(booking.createdAt, locale)}
      />
      <DetailItem
        label={tBooking("Check-in")}
        value={formatDate(booking.checkInDate, locale)}
      />
      <DetailItem
        label={tBooking("Check-out")}
        value={formatDate(booking.checkOutDate, locale)}
      />
      <DetailItem
        label={tBooking("Duration")}
        value={
          totalNights === 1
            ? tBooking("One night")
            : `${totalNights} ${tBooking("nights")}`
        }
      />
      <DetailItem
        label={tBooking("Room Type")}
        value={tRoom(booking.roomType) || "Standard"}
      />
      <DetailItem
        label={tBooking("Price/Night")}
        value={`${pricePerNight.toFixed(2)} ${tBooking("$")}`}
      />
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
  );
}
