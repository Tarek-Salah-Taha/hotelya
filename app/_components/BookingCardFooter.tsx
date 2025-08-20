import { Booking, BookingTab } from "../_types/types";
import { useTranslations } from "next-intl";
import MotionButton from "./MotionButton";

type BookingCardFooterProps = {
  booking: Booking;
  activeTab: BookingTab;
  onCancel: (bookingId: string) => void;
  onRebook: (hotelId: string) => void;
  tBooking: ReturnType<typeof useTranslations>;
};

export default function BookingCardFooter({
  booking,
  activeTab,
  onCancel,
  onRebook,
  tBooking,
}: BookingCardFooterProps) {
  return (
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
          {activeTab === "upcoming" && booking.status === "Confirmed" && (
            <MotionButton
              label={tBooking("Cancel Booking")}
              onClick={() => onCancel(booking.id)}
              variant="danger"
            />
          )}
          {activeTab === "past" && (
            <MotionButton
              label={tBooking("Rebook")}
              onClick={() => onRebook(booking.hotelId)}
              variant="primary"
            />
          )}
        </div>
      </div>
    </div>
  );
}
