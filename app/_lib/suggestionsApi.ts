import { HotelSuggestion, Suggestion } from "../_types/types";
import supabase from "./supabase";

export async function fetchDestinationSuggestions(
  query: string
): Promise<Suggestion[]> {
  if (query.trim().length < 2) return [];

  const languages = ["en"];
  // const languages = ["en", "ar", "fr", "es", "de", "it"];

  const fields = languages.flatMap((locale) => [
    `city_${locale}`,
    `country_${locale}`,
  ]);

  const orFilter = fields.map((field) => `${field}.ilike.%${query}%`).join(",");

  const { data, error } = await supabase
    .from("hotels")
    .select(fields.join(","))
    .or(orFilter)
    .limit(15);

  if (error || !data) {
    console.error("Suggestion fetch error:", error);
    return [];
  }

  const suggestions: Set<string> = new Set();

  (data as unknown as HotelSuggestion[]).forEach((hotel) => {
    languages.forEach((locale) => {
      const city = hotel[`city_${locale}`];
      const country = hotel[`country_${locale}`];
      if (city && country) {
        suggestions.add(`${city}, ${country}`);
      }
    });
  });

  return Array.from(suggestions);
}
