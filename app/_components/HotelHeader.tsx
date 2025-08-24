import { IoLocationSharp } from "react-icons/io5";
import { LocalizedHotel } from "../_utils/transformHotel";
import Stars from "./Stars";
import RatingBadge from "./RatingBadge";

function HotelHeader({ hotel }: { hotel: LocalizedHotel }) {
  const { hotelName, stars, address, city, country, rating } = hotel;

  return (
    <div className="bg-background px-4 md:px-8 pt-6 pb-1 text-text">
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
        {/* Left Section */}

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {hotelName}
          </h1>

          <div className="group flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:text-yellow-500">
            <Stars stars={stars} />
          </div>

          <span className="flex items-center gap-1 text-lg text-gray-600">
            <IoLocationSharp className="text-xl text-primary" />
            <span>
              {address} • {city} • {country}
            </span>
          </span>
        </div>

        <RatingBadge rating={rating} namespace="FavoritesPage" />
      </div>
    </div>
  );
}

export default HotelHeader;
