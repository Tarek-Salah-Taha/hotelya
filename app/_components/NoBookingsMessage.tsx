import { useTranslations } from "next-intl";
import { BookingTab } from "@/app/_types/types";

type NoBookingsMessageProps = {
  activeTab: BookingTab;
  tBooking: ReturnType<typeof useTranslations>;
};

export default function NoBookingsMessage({
  activeTab,
  tBooking,
}: NoBookingsMessageProps) {
  const message =
    activeTab === "upcoming"
      ? tBooking("You don't have any upcoming reservations")
      : tBooking(
          "Your past bookings will appear here once you've completed a stay"
        );

  return (
    <div className="bg-gray-50 rounded-xl p-12 text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {tBooking("No bookings found")}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">{message}</p>
    </div>
  );
}
