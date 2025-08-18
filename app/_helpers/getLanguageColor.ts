import { LANGUAGE_COLORS } from "../_config/languageColors";

export default function getLanguageColor(lang: string): string {
  const hash = [...lang].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return LANGUAGE_COLORS[hash % LANGUAGE_COLORS.length];
}
