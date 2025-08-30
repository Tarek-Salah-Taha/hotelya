import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

type Props = {
  selected: number[];
  counts: Record<number, number>;
  onChange: (stars: number, checked: boolean) => void;
};

export default function StarCheckboxList({
  selected,
  counts,
  onChange,
}: Props) {
  const stars = [5, 4, 3, 2, 1]; // Show from 5 to 1 stars

  const renderStars = (starCount: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starIndex = index + 1;
      return starIndex <= starCount ? (
        <FaStar key={index} className="text-yellow-400" />
      ) : (
        <FaRegStar key={index} className="text-gray-300" />
      );
    });
  };

  return (
    <div className="space-y-2">
      {stars.map((starCount) => {
        const count = counts[starCount] || 0;
        const isSelected = selected.includes(starCount);

        return (
          <motion.label
            key={starCount}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer text-gray-700 p-2 rounded-lg hover:bg-gray-50"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              checked={isSelected}
              onChange={(e) => onChange(starCount, e.target.checked)}
            />
            <div className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-1">
                {renderStars(starCount)}
              </div>
              <span className="text-gray-500 text-sm">({count})</span>
            </div>
          </motion.label>
        );
      })}
    </div>
  );
}
