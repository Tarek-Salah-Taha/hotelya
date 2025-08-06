import { HotelSuggestion, Suggestion, SupportedLang } from "../_types/types";
import supabase from "./supabase";

// Fetches unique city and country destination suggestions based on the user's search query and locale.
export async function fetchLocalizedDestinationSuggestions(
  query: string,
  locale: SupportedLang = "en"
): Promise<Suggestion[]> {
  if (query.trim().length < 2) return [];

  const cityField = `city_${locale}`;
  const countryField = `country_${locale}`;

  const { data, error } = await supabase
    .from("hotels")
    .select(`${cityField}, ${countryField}`)
    .or(`${cityField}.ilike.%${query}%,${countryField}.ilike.%${query}%`)
    .limit(15);

  if (error || !data) {
    console.error("Suggestion fetch error:", error);
    return [];
  }

  const suggestions: Set<string> = new Set();

  (data as unknown as HotelSuggestion[]).forEach((hotel) => {
    const city = hotel[cityField];
    const country = hotel[countryField];
    if (city && country) {
      suggestions.add(`${city}, ${country}`);
    }
  });

  return Array.from(suggestions);
}
