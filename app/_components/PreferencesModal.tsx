"use client";

import { useState, useEffect } from "react";
import { usePreferencesStore } from "../_store/preferencesStore";
import { getInitialUserPreferences } from "../_lib/Initial";
import { IoMdCloseCircle } from "react-icons/io";
import { SupportedLang } from "../_types/types";
import { useRouter, usePathname } from "next/navigation";

export default function PreferencesModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const { preferences, setPreferences } = usePreferencesStore();

  const [country, setCountry] = useState(preferences.country || "");
  const [currency, setCurrency] = useState(preferences.currency || "");
  const [language, setLanguage] = useState<SupportedLang>(
    (preferences.language as SupportedLang) || "en"
  );
  const [loading, setLoading] = useState(false);

  // Detect preferences on mount
  useEffect(() => {
    async function loadDefaults() {
      setLoading(true);
      const { country, currency, language } = await getInitialUserPreferences();
      setCountry((prev) => prev || country);
      setCurrency((prev) => prev || currency);
      setLanguage((prev) => prev || language);
      setLoading(false);
    }

    loadDefaults();
  }, []);

  useEffect(() => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  function handleApply() {
    setPreferences({ country, currency, language });

    const newLocale = language;
    const path = pathname.split("/").slice(2).join("/") || ""; // remove old locale
    const newPath = `/${newLocale}/${path}`;

    router.push(newPath); // immediately update URL
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
          aria-label="Close modal"
        >
          <IoMdCloseCircle />
        </button>

        {loading ? (
          <p className="text-center">Detecting preferences...</p>
        ) : (
          <>
            <div>
              <label>Country</label>
              <input
                className="w-full p-2 border rounded"
                value={country}
                onChange={() => {}}
              />
            </div>
            <div>
              <label>Currency</label>
              <input
                className="w-full p-2 border rounded"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </div>
            <div>
              <label>Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLang)}
                className="w-full p-2 border rounded"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="es">Español</option>
                <option value="it">Italiano</option>
              </select>
            </div>
            <button
              onClick={handleApply}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Apply
            </button>
          </>
        )}
      </div>
    </div>
  );
}
