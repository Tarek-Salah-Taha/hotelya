import { FaHotel } from "react-icons/fa";
function RoomHeader({
  title,
  hotelName,
  city,
  country,
}: {
  title: string;
  hotelName: string;
  city: string;
  country: string;
}) {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-6 sm:p-8 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
      <div className="flex items-center mt-2 space-x-2 text-sm sm:text-base">
        <FaHotel className="text-white/80" />
        <span className="text-white/90">{hotelName}</span>
        <span className="text-white/70">•</span>
        <span className="text-white/80">
          {city} • {country}
        </span>
      </div>
    </div>
  );
}

export default RoomHeader;
