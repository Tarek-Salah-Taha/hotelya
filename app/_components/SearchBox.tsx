"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { fetchLocalizedDestinationSuggestions } from "../_lib/suggestionsApi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { SupportedLang } from "../_types/types";
import debounce from "lodash/debounce";
import { useLocale } from "next-intl";

function SearchBox() {
  const [destination, setDestination] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [touched, setTouched] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const localeFromPath = useLocale() as SupportedLang;
  const supportedLangs: SupportedLang[] = ["en", "ar", "fr", "es", "de", "it"];

  const locale: SupportedLang = supportedLangs.includes(
    localeFromPath as SupportedLang
  )
    ? (localeFromPath as SupportedLang)
    : "en";

  const router = useRouter();
  const t = useTranslations("HomePage");

  const handleSearchClick = () => {
    setTouched(true);

    if (
      destination.trim().length < 2 ||
      typeof destination.trim() !== "string"
    ) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } else {
      const cityOnly = destination.split(",")[0].trim();
      router.push(
        `${locale}/search-results?destination=${encodeURIComponent(cityOnly)}`
      );
    }
  };

  const loadSuggestions = useCallback(
    async (value: string) => {
      if (value.length >= 2) {
        const results = await fetchLocalizedDestinationSuggestions(
          value,
          locale
        );
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    },
    [locale]
  );

  const debouncedLoadSuggestions = useMemo(
    () => debounce(loadSuggestions, 300),
    [loadSuggestions]
  );

  useEffect(() => {
    debouncedLoadSuggestions(destination);

    // Cleanup function to cancel any pending debounced calls
    return () => {
      debouncedLoadSuggestions.cancel();
    };
  }, [destination, debouncedLoadSuggestions]);

  const handleSelectSuggestion = (suggestion: string) => {
    setDestination(suggestion);
    const cityOnly = suggestion.split(",")[0].trim();
    router.push(
      `${locale}/search-results?destination=${encodeURIComponent(cityOnly)}`
    );
  };

  return (
    <div className="w-full flex justify-center px-4">
      <motion.div className="bg-white shadow-xl rounded-xl p-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 max-w-3xl w-full relative ">
        {/* Destination Input */}
        <div className="flex flex-col w-full min-w-[240px] relative">
          <label className="text-sm font-medium text-text mb-2">
            {t("destination")}
          </label>
          <div className="relative w-full">
            <FaMapMarkerAlt
              className={`absolute ${
                locale === "ar" ? "right-3" : "left-3"
              }  top-1/2 transform -translate-y-1/2 text-light`}
            />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className={`border-2 p-3 ${
                locale === "ar" ? "pr-10" : "pl-10"
              } rounded-lg w-full text-base h-[52px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                touched && destination.trim().length < 2
                  ? "border-red-500"
                  : "border-border"
              }`}
              placeholder={t("where are you going")}
            />

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {suggestions.length > 0 && isFocused && (
                <motion.ul className="absolute z-10 mt-1 w-full bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((sug, index) => (
                    <motion.li
                      key={index}
                      onClick={() => handleSelectSuggestion(sug)}
                      whileHover={{
                        scale: 1.01,
                      }}
                      className="cursor-pointer px-4 py-3 hover:bg-background flex items-center gap-2 transition-colors"
                    >
                      <FaMapMarkerAlt className="text-primary" />
                      <span className="text-text">{sug}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-end w-full min-w-[200px] relative">
          <motion.button
            onClick={handleSearchClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-white px-6 rounded-lg w-full text-base font-semibold h-[52px] hover:bg-dark shadow-md transition-all"
          >
            {t("search hotels")}
          </motion.button>

          <AnimatePresence>
            {showTooltip && destination.trim().length < 2 && (
              <motion.div className="absolute top-full mt-2 text-sm text-red-600 bg-red-100 border border-red-300 p-2 rounded-lg shadow-md z-10 w-full">
                {t("Please enter a valid destination (at least 2 letters)")}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default SearchBox;
