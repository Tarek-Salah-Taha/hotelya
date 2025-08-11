import { SupportedLang } from "../_types/types";

export function normalizeText(input: string, locale: SupportedLang) {
  let text = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (locale === "ar") {
    text = text
      .replace(/[إأآا]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/ة/g, "ه");
  }

  return text.replace(/\s+/g, " ").trim();
}
