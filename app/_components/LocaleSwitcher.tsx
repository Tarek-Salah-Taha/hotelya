"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SupportedLang } from "../_types/types";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { HiChevronDown } from "react-icons/hi";

const localeLabels: Record<SupportedLang, { label: string; icon: string }> = {
  en: { label: "English", icon: "https://flagcdn.com/w80/gb.png" },
  ar: { label: "العربية", icon: "https://flagcdn.com/w80/sa.png" },
  fr: { label: "Français", icon: "https://flagcdn.com/w80/fr.png" },
  de: { label: "Deutsch", icon: "https://flagcdn.com/w80/de.png" },
  es: { label: "Español", icon: "https://flagcdn.com/w80/es.png" },
  it: { label: "Italiano", icon: "https://flagcdn.com/w80/it.png" },
};

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLocale = useLocale() as SupportedLang;

  const handleLanguageChange = (locale: SupportedLang) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setOpen(false);
  };

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
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-white border border-gray-200 text-left px-4 py-3 rounded-xl shadow-sm flex items-center justify-between hover:bg-gray-50 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <Image
            width={24}
            height={24}
            src={localeLabels[currentLocale].icon}
            alt={localeLabels[currentLocale].label}
            className="w-6 h-6 object-cover rounded-full"
          />
          <span className="text-base font-medium text-gray-800">
            {localeLabels[currentLocale].label}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-primary text-sm"
        >
          <HiChevronDown size={16} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {Object.entries(localeLabels).map(([locale, { label, icon }]) => (
              <motion.li
                key={locale}
                role="option"
                whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleLanguageChange(locale as SupportedLang)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  locale === currentLocale
                    ? "bg-indigo-50 text-primary"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Image
                  src={icon}
                  alt={label}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-cover rounded-full"
                />
                <span className="text-base font-medium">{label}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
