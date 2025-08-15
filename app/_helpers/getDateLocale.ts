import { SupportedLang } from "../_types/types";

export const getDateLocale = (locale: SupportedLang) => {
  switch (locale) {
    case "fr":
      return "fr-FR";
    case "de":
      return "de-DE";
    case "es":
      return "es-ES";
    case "it":
      return "it-IT";
    case "ar":
      return "ar-EG";
    default:
      return "en-US";
  }
};
