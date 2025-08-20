import { useEffect, useState, useCallback } from "react";
import {
  fetchFavoriteHotels,
  removeHotelFromFavorites,
} from "@/app/_lib/favoritesApi";
import { SupportedLang, HotelCardData } from "@/app/_types/types";
import toast from "react-hot-toast";

export default function useFavorites(
  userId: string | undefined,
  locale: SupportedLang,
  page: number,
  itemsPerPage: number,
  tFavorites?: (key: string) => string
) {
  const [favorites, setFavorites] = useState<HotelCardData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { hotels, totalCount } = await fetchFavoriteHotels(
        userId,
        locale,
        page,
        itemsPerPage
      );
      setFavorites(hotels);
      setTotalPages(Math.max(1, Math.ceil(totalCount / itemsPerPage)));
    } catch (err) {
      console.error(err);
      if (tFavorites) toast.error(tFavorites("Failed to load favorites"));
    } finally {
      setLoading(false);
    }
  }, [userId, locale, page, itemsPerPage, tFavorites]);

  const removeFavorite = useCallback(
    async (hotelId: number) => {
      if (!userId) return;
      try {
        await removeHotelFromFavorites(userId, hotelId);
        setFavorites((prev) => prev.filter((hotel) => hotel.id !== hotelId));
        if (tFavorites) toast.success(tFavorites("Removed from favorites"));
      } catch {
        if (tFavorites) toast.error(tFavorites("Failed to remove"));
      }
    },
    [userId, tFavorites]
  );

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    totalPages,
    loading,
    removeFavorite,
    reload: loadFavorites,
  };
}
