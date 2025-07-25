"use client";

import { useState } from "react";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { addFavorite, removeFavorite } from "../_lib/favoritesApi";
import { iconMap, availableTags } from "../_constants/availableTags";
import getRatingLabel from "../_lib/getRatingLabel";
import { HotelCardItemProps } from "../_types/types";
import { useUser } from "../_hooks/useUser";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function HotelCardItem({ hotel }: HotelCardItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { user, loading } = useUser();

  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error("Please sign in to save/remove favorites");
      return;
    }

    setIsFavorite((prev) => !prev);

    try {
      if (!isFavorite) {
        await addFavorite(user.id, hotel.id);
        toast.success("Added to favorites");
      } else {
        await removeFavorite(user.id, hotel.id);
        toast.success("Removed from favorites");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />; // Or any loading UI
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
    >
      {/* Favorite icon */}
      <motion.button
        onClick={handleFavoriteToggle}
        className="absolute top-4 right-4 z-10"
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center backdrop-blur-sm bg-opacity-80"
          animate={{
            scale: isHovered || isFavorite ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-red-500 text-lg" />
          )}
        </motion.div>
      </motion.button>

      {/* Hotel image with hover effect */}
      <div className="relative overflow-hidden">
        <Image
          src={hotel.exteriorImages || "/placeholder.jpg"}
          alt={hotel.hotelName}
          className="w-full h-48 object-cover rounded-t-xl"
          width={500}
          height={300}
          loading="lazy"
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Hotel name and location */}
        <div className="mb-2">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
            {hotel.hotelName}
          </h2>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <IoLocationSharp className="text-lg text-primary" />
            <span>
              {hotel.city} • {hotel.country}
            </span>
          </div>
        </div>

        {/* Stars and rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-yellow-400 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                animate={{
                  scale: i < hotel.stars ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {i < hotel.stars ? "★" : "☆"}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 overflow-hidden">
            <div className="bg-primary px-3 py-1.5 text-white font-bold">
              {hotel.rating}
            </div>
            <div className="px-3 py-1.5 text-sm font-medium text-gray-700">
              {getRatingLabel(hotel.rating)}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel?.tags?.map((tagLabel) => {
            const matchedTag = availableTags.find((tag) =>
              tag.labels.includes(tagLabel)
            );

            const Icon = matchedTag ? iconMap[matchedTag.icon] : null;

            return (
              <motion.div
                key={tagLabel}
                className="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full"
                whileHover={{ y: -2 }}
              >
                {Icon && <Icon className="w-3 h-3 text-primary" />}
                <span>{tagLabel}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {/* Price */}
            <div>
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-primary">
                  ${hotel.priceNew}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${hotel.priceOld}
                </span>
                <span className="text-sm text-gray-500">/night</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                includes taxes & fees
              </div>
            </div>

            {/* Book Now Button */}
            <motion.button
              onClick={() => router.push(`/${locale}/hotels/${hotel.id}`)}
              className=" bg-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-opacity-90 transition shadow-md flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Book Now</span>
              <motion.span transition={{ type: "spring", stiffness: 500 }}>
                <FiArrowRight />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
