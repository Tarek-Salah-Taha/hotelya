import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoriteButton({
  isFavorite,
  onToggle,
  isRtl,
}: {
  isFavorite: boolean;
  onToggle: () => void;
  isRtl: boolean;
}) {
  return (
    <motion.button
      onClick={onToggle}
      className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} z-10`}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isFavorite ? "filled" : "outline"}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center backdrop-blur-sm bg-opacity-80"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-red-500 text-lg" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
