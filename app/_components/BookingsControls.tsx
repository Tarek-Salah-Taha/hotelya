import { useTranslations } from "next-intl";
import {
  BookingTab,
  BookingStatusFilter,
  BookingSort,
} from "@/app/_types/types";

type BookingsControlsProps = {
  activeTab: BookingTab;
  setActiveTab: (tab: BookingTab) => void;
  statusFilter: BookingStatusFilter;
  setStatusFilter: (filter: BookingStatusFilter) => void;
  sortBy: BookingSort;
  setSortBy: (sort: BookingSort) => void;
  tBooking: ReturnType<typeof useTranslations>;
};

export default function BookingsControls({
  activeTab,
  setActiveTab,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  tBooking,
}: BookingsControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex bg-gray-100 p-1 rounded-lg">
        {["upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "upcoming" | "past")}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
          >
            {tab === "upcoming" ? tBooking("Upcoming") : tBooking("Past")}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{tBooking("Status")}:</span>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | "confirmed" | "cancelled")
          }
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">{tBooking("All")}</option>
          <option value="Confirmed">{tBooking("Confirmed")}</option>
          <option value="Cancelled">{tBooking("Cancelled")}</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{tBooking("Sort by")}:</span>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "latest" | "oldest" | "name")
          }
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary] focus:border-transparent"
        >
          <option value="latest">{tBooking("Latest")}</option>
          <option value="oldest">{tBooking("Oldest")}</option>
          <option value="name">{tBooking("Hotel Name")}</option>
        </select>
      </div>
    </div>
  );
}
