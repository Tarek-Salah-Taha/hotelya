import React from "react";
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

// 1. Icon map per category
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

// 2. Color group per category for feature badge
const badgeColorMap: Record<string, string> = {
  "Transportation & Access": "bg-blue-50 text-blue-700",
  "Leisure & Wellness": "bg-pink-50 text-pink-700",
  "Food & Beverage": "bg-orange-50 text-orange-700",
  "Room Comfort": "bg-yellow-50 text-yellow-700",
  Technology: "bg-purple-50 text-purple-700",
  Services: "bg-teal-50 text-teal-700",
  "Security & Safety": "bg-red-50 text-red-700",
  Accessibility: "bg-green-50 text-green-700",
  "Family & Recreation": "bg-indigo-50 text-indigo-700",
  Sustainability: "bg-emerald-50 text-emerald-700",
  "Business Travel": "bg-gray-100 text-gray-700",
};

function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-text">
      <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm text-gray-700">
        {amenities.map(({ type, features }) => {
          const badgeColor =
            badgeColorMap[type] || "bg-green-50 text-green-700";
          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center gap-2">
                {iconMap[type] || <FaQuestionCircle className="text-primary" />}
                <h3 className="font-semibold text-text text-lg">{type}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {features.map((item, idx) => (
                  <span
                    key={idx}
                    className={`flex items-center gap-1 ${badgeColor} px-2.5 py-1 rounded-full text-sm whitespace-nowrap`}
                    title={item}
                  >
                    <FaCheck className="text-current" size={15} />
                    {item}
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
