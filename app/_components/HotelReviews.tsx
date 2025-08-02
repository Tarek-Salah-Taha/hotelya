"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { addHotelReview, getHotelReviews } from "../_lib/reviewsApi";
import StarRating from "./StarRating";
import { HotelReviewsProps } from "../_types/types";
import { useTranslations } from "next-intl";

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const reviewVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  exit: { opacity: 0, x: -20 },
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.4 },
  },
};

export default function HotelReviews({
  hotelId,
  initialReviews,
}: HotelReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const t = useTranslations("HotelPage");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author || !comment) return toast.error("Please fill in all fields");
    if (rating < 1 || rating > 10) {
      toast.error("Rating must be between 1 and 10");
      return;
    }

    setLoading(true);
    try {
      await addHotelReview(hotelId, author, rating, comment);
      const updated = await getHotelReviews(hotelId);
      setReviews(updated);
      setAuthor("");
      setRating(10);
      setComment("");
      toast.success("Review posted!");
    } catch (err) {
      toast.error("Error posting review");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100 group"
    >
      <div className="relative pb-2 mb-6 overflow-hidden">
        <motion.h2
          className="text-2xl font-semibold text-gray-800 inline-block"
          whileHover={{ scale: 1.01 }}
        >
          {t("Guest Reviews")}
        </motion.h2>
        <div
          className="
            absolute bottom-0 w-12 h-1 bg-primary rounded-full 
            scale-x-0 group-hover:scale-x-100 
            origin-left transition-transform duration-500
            
          "
        />
      </div>

      {/* Review List */}
      <div className="space-y-6 mb-10">
        {reviews.length === 0 ? (
          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No reviews yet.
          </motion.p>
        ) : (
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={reviewVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.01 }}
                className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg hover:shadow-sm transition-shadow rtl:flex-row-reverse"
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm"
                  whileHover={{ rotate: 10 }}
                >
                  {getInitials(review.author).toUpperCase()}
                </motion.div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1 rtl:flex-row-reverse">
                    <p className="font-medium">{review.author}</p>
                    <motion.span
                      className="text-xs text-gray-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      {formatDate(review.date)}
                    </motion.span>
                  </div>
                  <motion.span
                    className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full mb-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    {review.rating} / 10
                  </motion.span>
                  <motion.p
                    className="text-sm text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {review.comment}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add Review Form */}
      <motion.form
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 border-t pt-6 lg:w-3/4"
      >
        <div className="relative pb-2 mb-4 overflow-hidden">
          <motion.h3
            className="text-lg font-semibold text-gray-800 inline-block"
            whileHover={{ scale: 1.01 }}
          >
            {t("Leave a Review")}
          </motion.h3>
          <div
            className="
              absolute bottom-0 w-8 h-0.5 bg-primary rounded-full 
              scale-x-0 group-hover:scale-x-100 
              origin-left transition-transform duration-500
              
            "
          />
        </div>

        <motion.input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder={t("Your Name")}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          whileFocus={{ scale: 1.01 }}
        />

        <motion.textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t("Your Comment")}
          rows={3}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          whileFocus={{ scale: 1.01 }}
        />

        <StarRating rating={rating} setRating={setRating} />

        <motion.button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? t("Submitting") : t("Submit Review")}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
