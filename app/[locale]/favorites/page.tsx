"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useUser } from "@/app/_hooks/useUser";
import { HotelCardData, SupportedLang } from "@/app/_types/types";
import { fetchFavorites, removeFavorite } from "@/app/_lib/favoritesApi";
import { getHotelsByIds } from "@/app/_lib/hotelsApi";
import { usePathname } from "next/navigation";
import { IoLocationSharp } from "react-icons/io5";
import { availableTags, iconMap } from "@/app/_constants/availableTags";

export default function FavoritesPage() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<HotelCardData[]>([]);
  const router = useRouter();

  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  console.log("favorites data:", favorites);
  console.log("Locale:", locale);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      try {
        const favoriteIds = await fetchFavorites(user.id);
        const hotels = await getHotelsByIds(
          favoriteIds,
          locale as SupportedLang
        );

        setFavorites(hotels);
      } catch (err) {
        toast.error("Failed to load favorites.");
        console.error(err);
      }
    };

    loadFavorites();
  }, [user, locale]);

  const handleRemove = async (hotelId: number) => {
    if (!user) return;
    try {
      await removeFavorite(user.id, hotelId);
      setFavorites((prev) => prev.filter((hotel) => hotel.id !== hotelId));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove");
    }
  };

  const handleBookNow = (id: number) => {
    router.push(`/${locale}/hotels/${id}`);
  };

  if (!user)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-10 text-gray-600"
      >
        Please log in to view your favorite hotels.
      </motion.div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-center mb-8 text-[color:var(--color-text)]"
      >
        My Favorite Hotels
      </motion.h1>

      {favorites.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500"
        >
          You have no favorite hotels yet.
        </motion.p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {favorites.map((hotel) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-100"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={hotel.exteriorImages}
                    alt={hotel.hotelName}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium">
                      {hotel.rating}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2 flex">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

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
                    <div className="flex items-center mb-3">
                      <span className="text-lg font-bold text-[color:var(--color-primary)]">
                        ${hotel.priceNew}
                      </span>
                      {hotel.priceOld && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${hotel.priceOld}
                        </span>
                      )}
                      <span className="ml-2 text-sm text-gray-500">/night</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {availableTags
                        .filter((tagDef) => hotel.tags?.includes(tagDef.label))
                        .map((tagDef) => {
                          const Icon = iconMap[tagDef.icon];
                          return (
                            <div
                              key={tagDef.label}
                              className="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full"
                            >
                              <Icon className="w-3 h-3 text-primary" />
                              <span>{tagDef.label}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBookNow(hotel.id)}
                      className="flex-1 bg-[color:var(--color-primary)] text-white font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition shadow-md"
                    >
                      Book Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRemove(hotel.id)}
                      className="flex-1 bg-white border border-red-300 text-red-500 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
