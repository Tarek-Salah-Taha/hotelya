import supabase from "./supabase";

type Suggestion = string;

type HotelSuggestion = {
  [key: string]: string | null;
};

/**
 * Multilingual city-country suggestion fetcher.
 */
export async function fetchDestinationSuggestions(
  query: string
): Promise<Suggestion[]> {
  if (query.trim().length < 2) return [];

  const languages = ["en"];
  // const languages = ["en", "ar", "fr", "es", "de", "it"];

  const fields = languages.flatMap((lang) => [
    `city_${lang}`,
    `country_${lang}`,
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
    languages.forEach((lang) => {
      const city = hotel[`city_${lang}`];
      const country = hotel[`country_${lang}`];
      if (city && country) {
        suggestions.add(`${city}, ${country}`);
      }
    });
  });

  return Array.from(suggestions);
}
