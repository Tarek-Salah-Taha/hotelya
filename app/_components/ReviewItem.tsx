import { motion } from "framer-motion";
import getInitials from "../_helpers/getInitials";
import { formatDate } from "../_helpers/formatDate";
import { Review, SupportedLang } from "../_types/types";

export default function ReviewItem({
  review,
  locale,
}: {
  review: Review;
  locale: SupportedLang;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.01 }}
      className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg hover:shadow-sm transition-shadow rtl:flex-row-reverse"
    >
      <motion.div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
        {getInitials(review.author)}
      </motion.div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1 rtl:flex-row-reverse">
          <p className="font-medium">{review.author}</p>
          <motion.span className="text-xs text-gray-400">
            {formatDate(review.date, locale)}
          </motion.span>
        </div>
        <motion.span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full mb-1">
          {review.rating} / 10
        </motion.span>
        <motion.p className="text-sm text-gray-700">{review.comment}</motion.p>
      </div>
    </motion.div>
  );
}
