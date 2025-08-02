import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { StarRatingProps } from "../_types/types";
import { useTranslations } from "next-intl";

export default function StarRating({ rating, setRating }: StarRatingProps) {
  const t = useTranslations("HotelPage");

  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">
        {t("Your Rating")}:
      </label>
      <div className="flex gap-1">
        {Array.from({ length: 10 }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= (hovered || rating);
          return (
            <FaStar
              key={starValue}
              size={20}
              className={`cursor-pointer transition-colors ${
                isFilled ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHovered(starValue)}
              onMouseLeave={() => setHovered(0)}
            />
          );
        })}
      </div>
      <span className="text-sm text-gray-600 ml-2">{rating}/10</span>
    </div>
  );
}
