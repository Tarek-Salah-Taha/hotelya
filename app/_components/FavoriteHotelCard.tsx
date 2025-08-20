"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IoLocationSharp } from "react-icons/io5";
import { HotelCardData } from "@/app/_types/types";
import Stars from "./Stars";
import Tags from "./Tags";
import PriceDisplay from "./PriceDisplay";
import CardActions from "./CardActions";
import RatingBadge from "./RatingBadge";

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
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-100"
    >
      {/* Hotel image + rating */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={hotel.exteriorImages || FALLBACK_IMAGE}
          alt={hotel.hotelName}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          placeholder="blur"
          blurDataURL={FALLBACK_IMAGE}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={IMAGE_QUALITY}
        />

        <div
          className={`absolute top-3 ${locale === "ar" ? "left-3" : "right-3"}`}
        >
          <RatingBadge rating={hotel.rating} namespace="FavoritesPage" />
        </div>
      </div>

      {/* Hotel details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {hotel.hotelName}
          </h2>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <IoLocationSharp className="text-lg text-primary" />
            <span>
              {hotel.city} • {hotel.country}
            </span>
          </div>

          <Stars stars={hotel.stars} />

          <Tags tags={hotel.tags} />
        </div>

        <PriceDisplay
          priceNew={hotel.priceNew}
          priceOld={hotel.priceOld}
          tFavorites={tFavorites}
        />

        <CardActions
          hotelId={hotel.id}
          locale={locale}
          tFavorites={tFavorites}
          onBookNow={onBookNow}
          onRemove={onRemove}
        />
      </div>
    </motion.div>
  );
}
