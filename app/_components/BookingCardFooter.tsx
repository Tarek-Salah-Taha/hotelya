import { Booking, BookingTab } from "../_types/types";
import { useTranslations } from "next-intl";

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
  );
}
