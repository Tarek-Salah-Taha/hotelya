"use client";

import { useState } from "react";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { iconMap, availableTags } from "@/app/_constants/availableTags";
import getRatingLabel from "@/app/_lib/getRatingLabel";
import { HotelCardData } from "@/app/_types/types";

type HotelCardItemProps = {
  hotel: HotelCardData;
};

export default function HotelCardItem({ hotel }: HotelCardItemProps) {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);

  const matchingTags = availableTags.filter((tag) =>
    hotel.tags_en?.includes(tag.label)
  );

  return (
    <div className="relative bg-white p-4 rounded shadow flex flex-col">
      {/* Favorite icon */}
      <button
        onClick={() => setIsFavorite((prev) => !prev)}
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
        alt={hotel.hotelName_en}
        className="w-full h-48 object-cover mb-2 rounded"
        width={500}
        height={300}
      />

      {/* Hotel name and location */}
      <h2 className="text-lg font-semibold">{hotel.hotelName_en}</h2>
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <IoLocationSharp className="text-lg text-primary" />
        <span>
          {hotel.city_en}, {hotel.country_en}
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
            onClick={() => router.push(`/hotels/${hotel.id}`)}
            className="bg-primary text-white text-sm px-4 py-2 rounded hover:bg-opacity-90 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
