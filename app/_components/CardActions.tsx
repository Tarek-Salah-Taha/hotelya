import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CardActions({
  hotelId,
  locale,
  tFavorites,
  onBookNow,
  onRemove,
}: {
  hotelId: number;
  locale: string;
  tFavorites: (key: string) => string;
  onBookNow: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="flex sm:flex-row gap-5 mt-4">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onBookNow(hotelId)}
        className="flex-1 bg-primary text-white font-medium p-4 rounded-lg hover:bg-opacity-90 transition shadow-md flex items-center justify-center gap-2 text-sm"
      >
        <span>{tFavorites("bookButton")}</span>
        {locale === "ar" ? <FiArrowLeft /> : <FiArrowRight />}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onRemove(hotelId)}
        className="flex-1 bg-white border border-red-300 text-red-500 font-medium py-2 px-4 rounded-lg hover:bg-accent transition flex items-center justify-center gap-2 hover:text-white text-sm"
      >
        <span>{tFavorites("Remove")}</span>
        <FaRegTrashAlt />
      </motion.button>
    </div>
  );
}
