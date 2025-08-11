import { HotelSuggestion, Suggestion, SupportedLang } from "../_types/types";
import supabase from "./supabase";

// Fetches unique city and country destination suggestions based on the user's search query and locale.
export async function fetchLocalizedDestinationSuggestions(
  query: string,
  locale: SupportedLang = "en"
): Promise<Suggestion[]> {
  if (query.trim().length < 2) return [];

  let cityField = `city_${locale}`;
  let countryField = `country_${locale}`;

  // Use normalized columns for Arabic
  if (locale === "ar") {
    cityField = "city_ar_normalized";
    countryField = "country_ar_normalized";
    query = query
      .replace(/[إأآ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/ة/g, "ه");
  }

  const { data, error } = await supabase
    .from("hotels")
    .select(`${cityField}, ${countryField}`)
    .or(`${cityField}.ilike.%${query}%,${countryField}.ilike.%${query}%`)
    .limit(15);

  if (error || !data) {
    console.error("Suggestion fetch error:", error);
    return [];
  }

  const suggestions = new Set<string>();

  (data as unknown as HotelSuggestion[]).forEach((hotel) => {
    const city = hotel[cityField as keyof HotelSuggestion];
    const country = hotel[countryField as keyof HotelSuggestion];
    if (city && country) {
      suggestions.add(`${city}, ${country}`);
    }
  });

  return Array.from(suggestions);
}
