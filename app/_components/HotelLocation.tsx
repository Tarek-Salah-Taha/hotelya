import { FiMapPin } from "react-icons/fi";

type HotelLocationProps = {
  hotelName: string;
  city: string;
  country: string;
};

function HotelLocation({ hotelName, city, country }: HotelLocationProps) {
  return (
    <div className="mb-2">
      <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
        {hotelName}
      </h2>
      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
        <FiMapPin className="text-lg text-primary shrink-0" />
        <span className="truncate">
          {city} • {country}
        </span>
      </div>
    </div>
  );
}

export default HotelLocation;
