import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

type Props = {
  selected: number[];
  onChange: (stars: number, checked: boolean) => void;
};

const starRatings = [5, 4, 3, 2, 1];

export default function StarCheckboxList({ selected, onChange }: Props) {
  return (
    <>
      {starRatings.map((stars) => (
        <motion.label
          key={stars}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 cursor-pointer text-gray-700"
        >
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            checked={selected.includes(stars)}
            onChange={(e) => onChange(stars, e.target.checked)}
          />
          <span className="flex items-center gap-1">
            {Array.from({ length: stars }, (_, i) => (
              <FaStar key={i} className="text-yellow-400 text-sm" />
            ))}
          </span>
        </motion.label>
      ))}
    </>
  );
}
