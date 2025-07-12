import { SupportedLang } from "../_types/types";

export function normalizeLocalizedFields<T extends object>(
  item: Record<string, unknown>,
  locale: SupportedLang,
  localizedFields: string[]
): T {
  const result: Record<string, unknown> = {};

  for (const key in item) {
    // Copy all non-localized fields
    if (!key.endsWith(`_${locale}`)) {
      result[key] = item[key];
    }
  }

  for (const field of localizedFields) {
    const localizedKey = `${field}_${locale}`;
    if (localizedKey in item) {
      result[field] = item[localizedKey];
    } else {
      console.warn(`Missing localized field: ${localizedKey}`);
    }
  }

  return result as T;
}
