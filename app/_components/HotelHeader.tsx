import { IoLocationSharp } from "react-icons/io5";
import getRatingLabel from "../_lib/getRatingLabel";
import { LocalizedHotel } from "../_lib/transformHotel";

function HotelHeader({ hotel }: { hotel: LocalizedHotel }) {
  const { hotelName, stars, address, city, country, rating } = hotel;

  return (
    <div className="bg-background px-4 md:px-8 pt-6 pb-1 text-text">
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
        {/* Left Section */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">{hotelName}</h1>
          <p className="text-lg text-gray-600">{"⭐".repeat(stars)}</p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <IoLocationSharp className="text-xl text-primary" />
            <span>
              {address}, {city}, {country}
            </span>
          </div>
        </div>

        {/* Rating Box */}
        <div className="bg-white shadow p-3 rounded-xl">
          <p className="text-primary font-semibold">
            {rating} {getRatingLabel(rating)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HotelHeader;
