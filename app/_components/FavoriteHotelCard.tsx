"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HotelCardData } from "@/app/_types/types";
import Stars from "./Stars";
import Tags from "./Tags";
import PriceDisplay from "./PriceDisplay";
import CardActions from "./CardActions";
import RatingBadge from "./RatingBadge";
import HotelLocation from "./HotelLocation";

type FavoriteHotelCardProps = {
  hotel: HotelCardData;
  locale: string;
  tFavorites: (key: string) => string;
  onBookNow: (id: number) => void;
  onRemove: (id: number) => void;
};

const FALLBACK_IMAGE = "/placeholder.jpg";
const IMAGE_QUALITY = 85;

export default function FavoriteHotelCard({
  hotel,
  locale,
  tFavorites,
  onBookNow,
  onRemove,
}: FavoriteHotelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
      }}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 group backdrop-blur-sm bg-opacity-95"
    >
      {/* Hotel image + rating */}
      <div className="relative h-60 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <Image
          src={hotel.exteriorImages || FALLBACK_IMAGE}
          alt={hotel.hotelName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          placeholder="blur"
          blurDataURL={FALLBACK_IMAGE}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={IMAGE_QUALITY}
        />

        {/* Rating badge restored to original position */}
        <div
          className={`absolute top-3 ${
            locale === "ar" ? "left-3" : "right-3"
          } z-20`}
        >
          <RatingBadge rating={hotel.rating} namespace="FavoritesPage" />
        </div>
      </div>

      {/* Hotel details */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div className="mb-4">
          <HotelLocation
            hotelName={hotel.hotelName}
            city={hotel.city}
            country={hotel.country}
          />

          <div className="mt-3">
            <Stars stars={hotel.stars} />
          </div>

          <div className="mt-4">
            <Tags tags={hotel.tags} />
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <PriceDisplay
            priceNew={hotel.priceNew}
            priceOld={hotel.priceOld}
            tFavorites={tFavorites}
          />

          <div className="mt-5">
            <CardActions
              hotelId={hotel.id}
              locale={locale}
              tFavorites={tFavorites}
              onBookNow={onBookNow}
              onRemove={onRemove}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
