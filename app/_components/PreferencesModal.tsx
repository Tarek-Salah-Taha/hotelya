"use client";

import { useState, useEffect } from "react";
import { usePreferencesStore } from "../_store/preferencesStore";
import { getInitialUserPreferences } from "../_lib/Initial";
import { IoMdCloseCircle } from "react-icons/io";

export default function PreferencesModal({ onClose }: { onClose: () => void }) {
  const { preferences, setPreferences } = usePreferencesStore();

  const [country, setCountry] = useState(preferences.country || "");
  const [currency, setCurrency] = useState(preferences.currency || "");
  const [language, setLanguage] = useState(preferences.language || "");
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

  function handleApply() {
    setPreferences({ country, currency, language });
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
              <input
                className="w-full p-2 border rounded"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
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
