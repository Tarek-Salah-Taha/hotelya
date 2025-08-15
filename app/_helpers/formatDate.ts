import { SupportedLang } from "../_types/types";
import { getDateLocale } from "./getDateLocale";

export const formatDate = (dateString: string, locale: SupportedLang) => {
  return new Date(dateString).toLocaleString(getDateLocale(locale), {
    month: "short",
    day: "numeric",
    year: "numeric",
    numberingSystem: "latn",
  });
};
