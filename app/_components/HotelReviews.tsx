"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { submitHotelReview, fetchHotelReviews } from "../_lib/reviewsApi";
import StarRating from "./StarRating";
import { HotelReviewsProps, SupportedLang } from "../_types/types";
import { useLocale, useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle";
import ReviewItem from "./ReviewItem";
import { useUser } from "../_hooks/useUser";

const DEFAULT_RATING = 10;

export default function HotelReviews({
  hotelId,
  initialReviews,
}: HotelReviewsProps) {
  const { user } = useUser();

  const [reviews, setReviews] = useState(initialReviews);
  const [form, setForm] = useState({
    author: "",
    comment: "",
    rating: DEFAULT_RATING,
  });
  const [loading, setLoading] = useState(false);

  const t = useTranslations("HotelPage");
  const locale = useLocale() as SupportedLang;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { author, comment, rating } = form;

    if (!author.trim() || !comment.trim()) {
      toast.error(t("Please fill in all fields"));
      return;
    }

    if (!user) {
      toast.error(t("Please log in to post a review"));
      return;
    }

    setLoading(true);
    try {
      await submitHotelReview(
        Number(hotelId),
        author.trim(),
        rating,
        comment.trim()
      );

      const updated = await fetchHotelReviews(Number(hotelId));
      setReviews(updated);

      setForm({ author: "", comment: "", rating: DEFAULT_RATING });
      toast.success(t("Review posted"));
    } catch (err) {
      console.error(err);
      toast.error(t("Error posting review"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div className="mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100 group">
      <SectionTitle title={t("Guest Reviews")} underline />

      {/* Review List */}
      <div className="space-y-6 mb-10">
        {reviews.length === 0 ? (
          <motion.p className="text-sm text-gray-500">
            {t("No reviews yet")}
          </motion.p>
        ) : (
          <AnimatePresence>
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} locale={locale} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add Review Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 border-t pt-6 lg:w-3/4"
      >
        <SectionTitle title={t("Leave a Review")} />

        <motion.input
          type="text"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder={t("Your Name")}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

        <motion.textarea
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          placeholder={t("Your Comment")}
          rows={3}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

        <StarRating
          rating={form.rating}
          setRating={(val) => setForm({ ...form, rating: val })}
        />

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
