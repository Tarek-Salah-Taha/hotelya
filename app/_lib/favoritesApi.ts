import { SupportedLang, HotelCardData } from "@/app/_types/types";
import { normalizeLocalizedFields } from "@/app/_utils/normalizeLocalizedFields";
import supabase from "./supabase";
import getLocalizedFields from "../_helpers/getLocalizedFields";

type FavoriteWithHotel = {
  hotel: HotelCardData;
};

// Adds the specified hotel to the user's list of favorites.
export async function addHotelToFavorites(userId: string, hotelId: number) {
  const { error } = await supabase
    .from("favorites")
    .upsert([{ userId, hotelId }]);

  if (error) throw error;
}

// Removes the specified hotel from the user's list of favorites.
export async function removeHotelFromFavorites(
  userId: string,
  hotelId: number
) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .match({ userId, hotelId });

  if (error) throw error;
}

// Retrieves a list of hotel IDs that the user has marked as favorites.
export async function fetchFavoriteHotelIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select("hotelId")
    .eq("userId", userId);

  if (error) {
    console.error("Failed to fetch favorites", error);
    return [];
  }

  return data.map((item) => item.hotelId);
}

export async function fetchFavoriteHotels(
  userId: string,
  locale: SupportedLang,
  page: number,
  itemsPerPage: number
): Promise<{ hotels: HotelCardData[]; totalCount: number }> {
  const localizedFields = getLocalizedFields(locale, [
    "hotelName",
    "city",
    "country",
    "tags",
  ]);

  const selectFields = [
    `hotel:hotels (
      id,
      ${localizedFields.join(",")},
      stars,
      rating,
      exteriorImages,
      priceNew,
      priceOld
    )`,
  ];

  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data, error, count } = await supabase
    .from("favorites")
    .select(selectFields.join(","), { count: "exact" })
    .eq("userId", userId)
    .range(from, to);

  if (error || !data) {
    console.error("Failed to fetch favorites:", error?.message);
    return { hotels: [], totalCount: 0 };
  }

  const hotels = (data as unknown as FavoriteWithHotel[])
    .map((item) =>
      normalizeLocalizedFields<HotelCardData>(item.hotel, locale, [
        "hotelName",
        "city",
        "country",
        "tags",
      ])
    )
    .filter(Boolean);

  return { hotels, totalCount: count ?? 0 };
}
