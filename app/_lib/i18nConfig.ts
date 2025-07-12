export const SUPPORTED_LANGUAGES = ["en", "ar", "fr", "de", "es", "it"];
export const DEFAULT_LANGUAGE = "en";

export function getValidLanguage(lang: string) {
  return SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
}
