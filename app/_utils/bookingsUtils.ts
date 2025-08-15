import {
  Booking,
  BookingTab,
  BookingStatusFilter,
  BookingSort,
  SupportedLang,
} from "@/app/_types/types";

export function filterAndSortBookings(
  bookings: Booking[],
  activeTab: BookingTab,
  statusFilter: BookingStatusFilter,
  sortBy: BookingSort,
  locale: SupportedLang
) {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const normalizedStatus = statusFilter.toLowerCase();

  const nameKey = `hotelName_${locale}` as keyof Booking["hotel"];

  const filtered = bookings.filter((b) => {
    const isPast = new Date(b.checkOutDate) < startOfToday;
    const matchesTab = activeTab === "past" ? isPast : !isPast;
    const matchesStatus =
      normalizedStatus === "all"
        ? true
        : b.status?.toLowerCase() === normalizedStatus;

    return matchesTab && matchesStatus;
  });

  return filtered.sort((a, b) => {
    if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "name") {
      return (a.hotel?.[nameKey] || "").localeCompare(
        b.hotel?.[nameKey] || "",
        locale
      );
    }
    return 0;
  });
}
