"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useUser } from "@/app/_hooks/useUser";
import { SupportedLang } from "@/app/_types/types";
import { useTranslations } from "next-intl";
import CardSkeletonLoader from "@/app/_components/CardSkeletonLoader";
import FavoriteHotelCard from "@/app/_components/FavoriteHotelCard";
import ConfirmActionToast from "@/app/_components/ConfirmActionToast";
import PaginationControls from "@/app/_components/PaginationControls";
import useFavorites from "@/app/_hooks/useFavorites";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import EmptyState from "@/app/_components/EmptyState";
import { useLocale } from "next-intl";

export default function FavoritesPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const locale = useLocale() as SupportedLang;

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const tFavorites = useTranslations("FavoritesPage");
  const tHotels = useTranslations("HotelsPage");
  const tNavigation = useTranslations("Navigation");

  const {
    favorites,
    totalPages,
    loading: favoritesLoading,
    removeFavorite,
  } = useFavorites(
    user?.id,
    locale as SupportedLang,
    page,
    itemsPerPage,
    tFavorites
  );

  const handleBookNow = (id: number) => {
    router.push(`/${locale}/hotels/${id}`);
  };

  const handleRemoveWithConfirmation = (hotelId: number) => {
    toast.custom(
      (toastObj) => (
        <ConfirmActionToast
          message={tFavorites("Are you sure you want to remove this hotel?")}
          onCancel={() => toast.dismiss(toastObj.id)}
          onConfirm={() => {
            removeFavorite(hotelId);
            toast.dismiss(toastObj.id);
          }}
          confirmLabel={tFavorites("Remove")}
          cancelLabel={tFavorites("Cancel")}
        />
      ),
      { duration: Infinity }
    );
  };

  if (userLoading || favoritesLoading) {
    return <CardSkeletonLoader />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <EmptyState
          icon={FaRegUserCircle}
          text={tFavorites("Please log in to view your favorite hotels")}
        />
        <button
          onClick={() => router.push(`/${locale}/auth/login`)}
          className="mt-6 px-6 py-2.5 bg-primary text-white font-medium rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition-all duration-300"
        >
          {tNavigation("signin")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1 className="text-3xl font-bold text-center mb-8 text-text">
        {tFavorites("myFavorites")}
      </motion.h1>

      {favorites.length === 0 ? (
        <EmptyState
          icon={AiOutlineHeart}
          text={tFavorites("You have no favorite hotels yet")}
        />
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {favorites.map((hotel) => (
              <FavoriteHotelCard
                key={hotel.id}
                hotel={hotel}
                locale={locale}
                tFavorites={tFavorites}
                onBookNow={handleBookNow}
                onRemove={handleRemoveWithConfirmation}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
          onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          t={tHotels}
        />
      )}
    </div>
  );
}
