"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  addHotelToFavorites,
  removeHotelFromFavorites,
  fetchFavoriteHotelIds,
} from "../_lib/favoritesApi";
import { HotelCardItemProps, SupportedLang } from "../_types/types";
import { useUser } from "../_hooks/useUser";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";
import RatingBadge from "./RatingBadge";
import Stars from "./Stars";
import Tags from "./Tags";
import PriceDisplay from "./PriceDisplay";
import SkeletonLoader from "./SkeletonLoader";
import FavoriteButton from "./FavoriteButton";

export default function HotelCardItem({ hotel }: HotelCardItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  const { user } = useUser();
  const locale = useLocale() as SupportedLang;
  const tFavorites = useTranslations("FavoritesPage");

  // 🔹 Fetch favorite status
  useEffect(() => {
    let isMounted = true;

    const checkFavoriteStatus = async () => {
      if (!user?.id) {
        if (isMounted) {
          setIsFavorite(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        const favorites = await fetchFavoriteHotelIds(user.id);
        const isHotelFavorite = favorites.some(
          (favId: string | number) => String(favId) === String(hotel.id)
        );

        if (isMounted) {
          setIsFavorite(isHotelFavorite);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        if (isMounted) setIsLoading(false);
      }
    };

    checkFavoriteStatus();
    return () => {
      isMounted = false;
    };
  }, [user, hotel.id]);

  // 🔹 Toggle favorite handler
  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error(tFavorites("Please sign in to save/remove favorites"));
      return;
    }

    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    try {
      if (newStatus) {
        await addHotelToFavorites(user.id, hotel.id);
        toast.success(tFavorites("Added to favorites"));
      } else {
        await removeHotelFromFavorites(user.id, hotel.id);
        toast.success(tFavorites("Removed from favorites"));
      }
    } catch (err) {
      setIsFavorite(!newStatus); // rollback on error
      toast.error(tFavorites("Something went wrong"));
      console.error(err);
    }
  };

  if (isLoading) return <SkeletonLoader />;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
    >
      {/* Favorite button */}
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={handleFavoriteToggle}
        isRtl={locale === "ar"}
      />

      {/* Hotel Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={hotel.exteriorImages || "/placeholder.jpg"}
          alt={hotel.hotelName}
          className="object-cover transition-transform duration-500 hover:scale-105"
          fill
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className={`absolute top-3 ${locale === "ar" ? "right-3" : "left-3"}`}
        >
          <RatingBadge rating={hotel.rating} namespace="FavoritesPage" />
        </div>

        {/* Hover dark overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gray-900/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Hotel name & location */}
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

        <Stars stars={hotel.stars} />
        <Tags tags={hotel.tags} />

        {/* Bottom section */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Price */}
            <div className="flex-1">
              <PriceDisplay
                priceNew={hotel.priceNew}
                priceOld={hotel.priceOld}
                tFavorites={tFavorites}
              />
            </div>

            {/* Book Now Button */}
            <motion.button
              onClick={() => router.push(`/${locale}/hotels/${hotel.id}`)}
              className="w-full sm:w-auto bg-primary text-sm sm:text-base text-white font-medium px-4 py-2 sm:p-4 rounded-lg hover:bg-opacity-90 transition shadow-md flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{tFavorites("bookButton")}</span>
              {locale === "ar" ? <FiArrowLeft /> : <FiArrowRight />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
