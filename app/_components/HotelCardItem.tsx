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

export default function HotelCardItem({ hotel }: HotelCardItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const localizedTags = hotel[`tags_${locale}` as keyof typeof hotel] as
    | string[]
    | undefined;

  const matchingTags = availableTags.filter((tag) =>
    localizedTags?.includes(tag.label)
  );

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error("Please sign in to save/remove favorites");
      return;
    }

    console.log("User ID:", user.id);
    console.log("Hotel ID:", hotel.id);
    console.log("Current hotel:", hotel);

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

  return (
    <div className="relative bg-white p-4 rounded shadow flex flex-col">
      {/* Favorite icon */}
      <button
        onClick={handleFavoriteToggle}
        className="absolute top-6 right-6 z-10"
      >
        <div className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center">
          {isFavorite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-red-500 text-lg" />
          )}
        </div>
      </button>

      {/* Hotel image */}
      <Image
        src={hotel.exteriorImages || "/placeholder.jpg"}
        alt={hotel.hotelName}
        className="w-full h-48 object-cover mb-2 rounded"
        width={500}
        height={300}
        loading="lazy"
      />

      {/* Hotel name and location */}
      <h2 className="text-lg font-semibold">{hotel.hotelName}</h2>
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <IoLocationSharp className="text-lg text-primary" />
        <span>
          {hotel.city} • {hotel.country}
        </span>
      </div>

      {/* Stars and rating */}
      <div className="text-yellow-500 flex items-center gap-2 mt-1">
        <span>{"⭐".repeat(hotel.stars)}</span>
        <span className="bg-primary text-white text-sm font-semibold px-2 py-1 rounded">
          {hotel.rating}
        </span>
        <span className="text-sm text-gray-700">
          {getRatingLabel(hotel.rating)}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {matchingTags.map((tag) => {
          const Icon = iconMap[tag.icon];
          return (
            <div
              key={tag.label}
              className="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span>{tag.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom fixed section */}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between">
          {/* Price */}
          <div>
            <div className="flex items-end gap-2">
              <span className="text-xl font-semibold text-primary">
                ${hotel.priceNew}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${hotel.priceOld}
              </span>
              <span className="text-sm text-gray-500">/night</span>
            </div>
            <div className="text-xs text-gray-500">includes taxes & fees</div>
          </div>

          {/* Book Now Button */}
          <button
            onClick={() => router.push(`/${locale}/hotels/${hotel.id}`)}
            className="bg-primary text-white text-sm px-4 py-2 rounded hover:bg-opacity-90 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
