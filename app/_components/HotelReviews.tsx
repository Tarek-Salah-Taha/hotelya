"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { addHotelReview, getHotelReviews } from "../_lib/reviewsApi";
import StarRating from "./StarRating";
import { HotelReviewsProps } from "../_types/types";

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

export default function HotelReviews({
  hotelId,
  initialReviews,
}: HotelReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(10);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="mt-10 p-6 bg-white rounded-xl shadow-sm border text-text">
      <h2 className="text-2xl font-semibold mb-6">Guest Reviews</h2>

      {/* Review List */}
      <div className="space-y-6 mb-10">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                {getInitials(review.author).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium">{review.author}</p>
                  <span className="text-xs text-gray-400">
                    {formatDate(review.date)}
                  </span>
                </div>
                <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full mb-1">
                  {review.rating} / 10
                </span>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Review Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-t pt-6 lg:w-3/4"
      >
        <h3 className="text-lg font-semibold">Leave a Review</h3>

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          rows={3}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        />

        <StarRating rating={rating} setRating={setRating} />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
