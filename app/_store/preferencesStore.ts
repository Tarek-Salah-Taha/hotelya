import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Store } from "../_types/types";

export const usePreferencesStore = create<Store>()(
  persist(
    (set) => ({
      preferences: {
        country: "USA",
        currency: "USD",
        language: "en",
        flag: "https://cdn.ipwhois.io/flags/us.svg",
      },
      setPreferences: (prefs) => set({ preferences: prefs }),
    }),
    {
      name: "user-preferences-storage",
    }
  )
);
