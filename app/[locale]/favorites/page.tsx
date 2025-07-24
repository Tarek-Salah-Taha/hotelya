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
import getRatingLabel from "@/app/_lib/getRatingLabel";
import { FiArrowRight } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

export default function FavoritesPage() {
  const { user, loading } = useUser();
  const [favorites, setFavorites] = useState<HotelCardData[]>([]);
  const router = useRouter();

  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

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

  const handleRemoveWithConfirmation = (hotelId: number) => {
    toast.custom(
      (t) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${t.visible ? "animate-enter" : "animate-leave"} 
            max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col p-4 border border-red-100`}
        >
          <div className="text-sm font-medium text-gray-900 mb-2">
            Confirm Removal
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Are you sure you want to remove this hotel?
          </div>
          <div className="flex gap-2 justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleRemove(hotelId);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1.5 text-sm bg-red-500 text-white hover:bg-red-600 rounded-lg transition"
            >
              Remove
            </motion.button>
          </div>
        </motion.div>
      ),
      { duration: Infinity }
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

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
        className="text-3xl font-bold text-center mb-8 text-text"
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
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 overflow-hidden">
                      <div className="bg-primary px-3 py-1.5 text-white font-bold">
                        {hotel.rating}
                      </div>
                      <div className="px-3 py-1.5 text-sm font-medium text-gray-700">
                        {getRatingLabel(hotel.rating)}
                      </div>
                    </div>
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

                    <div className="text-yellow-400 flex items-center gap-1 py-1 px-3">
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

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.tags?.map((tagLabel) => {
                        const matchedTag = availableTags.find((tagDef) =>
                          tagDef.labels.includes(tagLabel)
                        );
                        const Icon = matchedTag
                          ? iconMap[matchedTag.icon]
                          : null;

                        return (
                          <div
                            key={tagLabel}
                            className="flex items-center gap-1 text-xs text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full"
                          >
                            {Icon && <Icon className="w-3 h-3 text-primary" />}
                            <span>{tagLabel}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center mb-2">
                    <span className="text-lg font-bold text-primary">
                      ${hotel.priceNew}
                    </span>
                    {hotel.priceOld && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${hotel.priceOld}
                      </span>
                    )}
                    <span className="ml-2 text-sm text-gray-500">/night</span>
                  </div>

                  <div className="flex sm:flex-row gap-5 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBookNow(hotel.id)}
                      className="flex-1 bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Book Now</span>
                      <motion.span
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <FiArrowRight />
                      </motion.span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRemoveWithConfirmation(hotel.id)}
                      className="flex-1 bg-white border border-red-300 text-red-500 font-medium py-2 px-4 rounded-lg hover:bg-accent transition flex items-center justify-center gap-1 hover:text-white"
                    >
                      <motion.span
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <FaRegTrashAlt />
                      </motion.span>
                      <span>Remove</span>
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
