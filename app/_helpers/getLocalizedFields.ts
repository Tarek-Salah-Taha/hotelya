import { SupportedLang } from "../_types/types";

export default function getLocalizedFields(
  locale: SupportedLang,
  baseFields: string[]
) {
  return baseFields.map((f) => `${f}_${locale}`);
}
