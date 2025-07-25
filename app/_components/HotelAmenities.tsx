import {
  FaCheck,
  FaQuestionCircle,
  FaShuttleVan,
  FaSpa,
  FaUtensils,
  FaBed,
  FaWifi,
  FaConciergeBell,
  FaShieldAlt,
  FaAccessibleIcon,
  FaChild,
  FaLeaf,
  FaBriefcase,
} from "react-icons/fa";
import { HotelAmenitiesProps } from "../_types/types";

// Icon map per category
const iconMap: Record<string, React.ReactElement> = {
  "Transportation & Access": <FaShuttleVan className="text-blue-500" />,
  "Leisure & Wellness": <FaSpa className="text-pink-500" />,
  "Food & Beverage": <FaUtensils className="text-orange-500" />,
  "Room Comfort": <FaBed className="text-yellow-500" />,
  Technology: <FaWifi className="text-purple-500" />,
  Services: <FaConciergeBell className="text-teal-500" />,
  "Security & Safety": <FaShieldAlt className="text-red-500" />,
  Accessibility: <FaAccessibleIcon className="text-green-600" />,
  "Family & Recreation": <FaChild className="text-indigo-500" />,
  Sustainability: <FaLeaf className="text-emerald-600" />,
  "Business Travel": <FaBriefcase className="text-gray-600" />,
};

// Color group per category for feature badge
const badgeColorMap: Record<string, string> = {
  "Transportation & Access": "bg-blue-50 text-blue-700 hover:bg-blue-100",
  "Leisure & Wellness": "bg-pink-50 text-pink-700 hover:bg-pink-100",
  "Food & Beverage": "bg-orange-50 text-orange-700 hover:bg-orange-100",
  "Room Comfort": "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
  Technology: "bg-purple-50 text-purple-700 hover:bg-purple-100",
  Services: "bg-teal-50 text-teal-700 hover:bg-teal-100",
  "Security & Safety": "bg-red-50 text-red-700 hover:bg-red-100",
  Accessibility: "bg-green-50 text-green-700 hover:bg-green-100",
  "Family & Recreation": "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
  Sustainability: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  "Business Travel": "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  return (
    <div
      className="
      bg-white p-6 rounded-xl 
      border border-gray-100
      shadow-sm hover:shadow-md 
      transition-all duration-300
      group
    "
    >
      <div className="relative pb-2 mb-6 overflow-hidden">
        <h2
          className="
          text-2xl font-semibold 
          text-gray-800
          inline-block
          group-hover:translate-x-1 
          transition-transform duration-300
        "
        >
          Amenities
        </h2>
        <span
          className="
          absolute bottom-0 left-0 
          w-12 h-1 bg-primary rounded-full 
          scale-x-0 group-hover:scale-x-100 
          origin-left transition-transform duration-500
        "
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {amenities.map(({ type, features }) => {
          const badgeColor =
            badgeColorMap[type] ||
            "bg-green-50 text-green-700 hover:bg-green-100";

          return (
            <div key={type} className="space-y-3 group/amenity">
              <div className="flex items-center gap-3">
                {iconMap[type] || (
                  <FaQuestionCircle className="text-primary transition-transform group-hover/amenity:rotate-12" />
                )}
                <h3
                  className="
                  font-semibold text-gray-800 text-lg
                  transition-colors duration-200
                  group-hover/amenity:text-primary
                "
                >
                  {type}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {features.map((item, idx) => (
                  <span
                    key={idx}
                    className={`
                      flex items-center gap-1.5 
                      ${badgeColor}
                      px-3 py-1.5 rounded-full 
                      text-sm whitespace-nowrap
                      border border-transparent
                      hover:border-current
                      transition-all duration-200
                      cursor-default
                    `}
                    title={item}
                  >
                    <FaCheck
                      className="
                      text-current 
                      transition-transform
                      group-hover/amenity:scale-110
                    "
                      size={14}
                    />
                    <span className="transition-transform group-hover/amenity:translate-x-0.5">
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HotelAmenities;
