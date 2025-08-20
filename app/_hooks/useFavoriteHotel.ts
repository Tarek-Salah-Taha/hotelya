"use client";

import { useState, useEffect } from "react";
import {
  addHotelToFavorites,
  removeHotelFromFavorites,
  fetchFavoriteHotelIds,
} from "../_lib/favoritesApi";
import { useUser } from "../_hooks/useUser";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export function useFavoriteHotel(hotelId: number) {
  const { user } = useUser();
  const tFavorites = useTranslations("FavoritesPage");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const checkFavoriteStatus = async () => {
      if (!user?.id) {
        if (active) {
          setIsFavorite(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        const favorites = await fetchFavoriteHotelIds(user.id);
        const isHotelFavorite = favorites.some(
          (favId: string | number) => String(favId) === String(hotelId)
        );

        if (active) {
          setIsFavorite(isHotelFavorite);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        if (active) setIsLoading(false);
      }
    };

    checkFavoriteStatus();
    return () => {
      active = false;
    };
  }, [user, hotelId]);

  const toggleFavorite = async () => {
    if (!user) {
      toast.error(tFavorites("Please sign in to save/remove favorites"));
      return;
    }

    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    try {
      if (newStatus) {
        await addHotelToFavorites(user.id, hotelId);
        toast.success(tFavorites("Added to favorites"));
      } else {
        await removeHotelFromFavorites(user.id, hotelId);
        toast.success(tFavorites("Removed from favorites"));
      }
    } catch (err) {
      setIsFavorite(!newStatus);
      toast.error(tFavorites("Something went wrong"));
      console.error(err);
    }
  };

  return { isFavorite, isLoading, toggleFavorite };
}
