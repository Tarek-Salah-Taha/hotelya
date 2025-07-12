"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { useUser } from "@/app/_hooks/useUser";
import { HotelCardData } from "@/app/_types/types";
import { fetchFavorites, removeFavorite } from "@/app/_lib/favoritesApi";
import { getHotelsByIds } from "@/app/_lib/hotelsApi";
import { usePathname } from "next/navigation";

export default function FavoritesPage() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<HotelCardData[]>([]);
  const router = useRouter();

  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      try {
        const favoriteIds = await fetchFavorites(user.id);
        const hotels = await getHotelsByIds(favoriteIds, locale);
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

  console.log(user, favorites);

  if (!user)
    return (
      <div className="text-center mt-10 text-gray-600">
        Please log in to view your favorite hotels.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-[color:var(--color-text)]">
        My Favorite Hotels
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no favorite hotels yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <Image
                src={hotel.exteriorImages}
                alt={
                  hotel[`hotelName_${locale}` as keyof HotelCardData] as string
                }
                width={400}
                height={400}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[color:var(--color-text)]">
                    {
                      hotel[
                        `hotelName_${locale}` as keyof HotelCardData
                      ] as string
                    }
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    {hotel[`city_${locale}` as keyof HotelCardData] as string} •{" "}
                    {
                      hotel[
                        `country_${locale}` as keyof HotelCardData
                      ] as string
                    }
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    ${hotel.priceNew}/night
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={() => handleBookNow(hotel.id)}
                    className="bg-[color:var(--color-primary)] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => handleRemove(hotel.id)}
                    className="bg-red-100 text-red-500 text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
