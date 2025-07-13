"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SupportedLang } from "../_types/types";
import Image from "next/image";

const localeLabels: Record<SupportedLang, { label: string; icon: string }> = {
  en: { label: "English", icon: "https://flagcdn.com/w80/gb.png" },
  ar: { label: "العربية", icon: "https://flagcdn.com/w80/sa.png" },
  fr: { label: "Français", icon: "https://flagcdn.com/w80/fr.png" },
  de: { label: "Deutsch", icon: "https://flagcdn.com/w80/de.png" },
  es: { label: "Español", icon: "https://flagcdn.com/w80/es.png" },
  it: { label: "Italiano", icon: "https://flagcdn.com/w80/it.png" },
};

export default function UserPreferences() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] as SupportedLang;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (locale: SupportedLang) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setOpen(false);
  };

  // ⛔ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-white border border-primary-900 text-left px-4 py-2.5 rounded-lg shadow-md flex items-center justify-between hover:bg-primary-50 transition"
      >
        <div className="flex items-center gap-3">
          <Image
            width={24}
            height={24}
            src={localeLabels[currentLocale].icon}
            alt={localeLabels[currentLocale].label}
            className="w-6 h-6 object-cover rounded-full"
          />
          <span className="text-base font-medium text-primary-900">
            {localeLabels[currentLocale].label}
          </span>
        </div>
        <span
          className={`text-gray-500 text-sm transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
          {Object.entries(localeLabels).map(([locale, { label, icon }]) => (
            <li
              key={locale}
              onClick={() => handleLanguageChange(locale as SupportedLang)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-primary-100 cursor-pointer text-sm transition"
            >
              <Image
                src={icon}
                alt={label}
                width={24}
                height={24}
                className="w-6 h-6 object-cover rounded-full"
              />
              <span className="text-base text-primary-900">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
