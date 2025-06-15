import { create } from "zustand";
import { persist } from "zustand/middleware";

type Preferences = {
  country: string;
  currency: string;
  language: string;
  flag?: string;
};

type Store = {
  preferences: Preferences;
  setPreferences: (prefs: Preferences) => void;
};

export const usePreferencesStore = create<Store>()(
  persist(
    (set) => ({
      preferences: {
        country: "USA",
        currency: "USD",
        language: "EN",
        flag: "https://cdn.ipwhois.io/flags/us.svg",
      },
      setPreferences: (prefs) => set({ preferences: prefs }),
    }),
    {
      name: "user-preferences-storage",
    }
  )
);
