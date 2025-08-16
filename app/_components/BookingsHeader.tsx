import { BookingTab } from "@/app/_types/types";
import { useTranslations } from "next-intl";

type BookingsHeaderProps = {
  activeTab: BookingTab;
  tBooking: ReturnType<typeof useTranslations<"BookingPage">>;
};

export default function BookingsHeader({
  activeTab,
  tBooking,
}: BookingsHeaderProps) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        {tBooking("bookings")}
      </h1>
      <p className="text-gray-600">
        {activeTab === "upcoming"
          ? tBooking("Upcoming stays")
          : tBooking("Past reservations")}
      </p>
    </div>
  );
}
