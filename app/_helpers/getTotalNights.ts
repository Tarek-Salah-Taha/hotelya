export const getTotalNights = (checkInDate: string, checkOutDate: string) => {
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffInMs = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};
