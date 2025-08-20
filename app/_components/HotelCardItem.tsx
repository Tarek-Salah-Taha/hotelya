"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";

import { HotelCardItemProps, SupportedLang } from "../_types/types";
import SkeletonLoader from "./SkeletonLoader";
import FavoriteButton from "./FavoriteButton";
import RatingBadge from "./RatingBadge";
import Stars from "./Stars";
import Tags from "./Tags";
import PriceDisplay from "./PriceDisplay";
import MotionButton from "./MotionButton";
import HotelLocation from "./HotelLocation";
import { useFavoriteHotel } from "../_hooks/useFavoriteHotel";

export default function HotelCardItem({ hotel }: HotelCardItemProps) {
  const router = useRouter();
  const locale = useLocale() as SupportedLang;
  const tFavorites = useTranslations("FavoritesPage");

  const { isFavorite, isLoading, toggleFavorite } = useFavoriteHotel(hotel.id);

  if (isLoading) return <SkeletonLoader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group"
    >
      {/* Favorite button */}
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={toggleFavorite}
        isRtl={locale === "ar"}
      />

      {/* Hotel Image */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={hotel.exteriorImages || "/placeholder.jpg"}
          alt={hotel.hotelName}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          fill
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div
          className={`absolute top-4 ${locale === "ar" ? "right-4" : "left-4"}`}
        >
          <RatingBadge rating={hotel.rating} namespace="FavoritesPage" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <HotelLocation
            hotelName={hotel.hotelName}
            city={hotel.city}
            country={hotel.country}
          />
        </div>

        <div className="mb-4">
          <Stars stars={hotel.stars} />
        </div>

        <div className="mb-5">
          <Tags tags={hotel.tags} />
        </div>

        <div className="mt-auto pt-5 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <PriceDisplay
                priceNew={hotel.priceNew}
                priceOld={hotel.priceOld}
                tFavorites={tFavorites}
              />
            </div>

            <MotionButton
              label={tFavorites("bookButton")}
              icon={locale === "ar" ? <FiArrowLeft /> : <FiArrowRight />}
              onClick={() => router.push(`/${locale}/hotels/${hotel.id}`)}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
