"use client";

import { useState, useEffect } from "react";
import { usePreferencesStore } from "../_store/preferencesStore";
import PreferencesModal from "./PreferencesModal";
import Image from "next/image";
import { getInitialUserPreferences } from "../_lib/Initial";

export default function UserPreferences() {
  const { preferences, setPreferences } = usePreferencesStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchPreferences() {
      const prefs = await getInitialUserPreferences();
      setPreferences(prefs);
    }
    fetchPreferences();
  }, [setPreferences]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 cursor-pointer border border-primary-900 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base max-w-full sm:max-w-none"
      >
        <Image
          src={preferences.flag || "https://cdn.ipwhois.io/flags/us.svg"}
          alt={`${preferences.country || "Unknown"} flag`}
          width={20}
          height={14}
          className="object-contain"
        />
        <div className="flex items-center gap-2 sm:gap-2">
          <span>{preferences.currency}</span>
          <span>{preferences.language}</span>
        </div>
      </div>

      {isOpen && <PreferencesModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
