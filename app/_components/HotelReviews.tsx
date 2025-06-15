"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { addHotelReview, getHotelReviews } from "../_lib/reviewsApi";

type Review = {
  id: string;
  hotelId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

type Props = {
  hotelId: string;
  initialReviews: Review[];
};

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

export default function HotelReviews({ hotelId, initialReviews }: Props) {
  const [reviews, setReviews] = useState(initialReviews);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author || !comment) return toast.error("Please fill in all fields");
    setLoading(true);
    try {
      await addHotelReview(hotelId, author, rating, comment);
      const updated = await getHotelReviews(hotelId);
      setReviews(updated);
      setAuthor("");
      setRating(5);
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
    <div className="mt-8 p-6 bg-white rounded-xl shadow text-text">
      <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>

      {/* Review List */}
      <div className="space-y-4 mb-6">
        {reviews.length === 0 && (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
              {getInitials(review.author).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.author}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(review.date)}
                </p>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                {Array.from({ length: review.rating }, (_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review */}
      <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
        <h3 className="font-semibold">Leave a Review</h3>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          rows={3}
          className="w-full p-2 border rounded"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-1 rounded"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} star{r > 1 && "s"}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
