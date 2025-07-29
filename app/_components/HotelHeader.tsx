import { IoLocationSharp } from "react-icons/io5";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import getRatingLabel from "../_lib/getRatingLabel";
import { LocalizedHotel } from "../_lib/transformHotel";
import { useTranslations } from "next-intl";

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return stars;
}

function HotelHeader({ hotel }: { hotel: LocalizedHotel }) {
  const { hotelName, stars, address, city, country, rating } = hotel;

  const t = useTranslations("FavoritesPage");

  return (
    <div className="bg-background px-4 md:px-8 pt-6 pb-1 text-text">
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
        {/* Left Section */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {hotelName}
          </h1>

          <div className="flex items-center gap-1">{renderStars(stars)}</div>

          <div className="flex items-center gap-1 text-lg text-gray-600">
            <IoLocationSharp className="text-xl text-primary" />
            <span>
              {address}, {city}, {country}
            </span>
          </div>
        </div>

        {/* Rating Box */}
        <div className="flex items-center bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="bg-primary px-3 py-1.5 text-white font-bold">
            {rating}
          </div>
          <div className="px-3 py-1.5 text-sm font-medium text-gray-700">
            {getRatingLabel(rating, t)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelHeader;
