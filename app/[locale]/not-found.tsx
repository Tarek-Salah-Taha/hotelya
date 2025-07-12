"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { SupportedLang } from "../_types/types";

export default function NotFound() {
  const supportedLocales: SupportedLang[] = [
    "en",
    "ar",
    "fr",
    "de",
    "es",
    "it",
  ];

  const pathname = usePathname();
  const localeFromPath = pathname.split("/")[1] as SupportedLang;
  const locale: SupportedLang = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : "en";

  console.log("Current language:", locale);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text text-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-primary">404</h1>
      <p className="text-xl mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl shadow hover:bg-secondary transition"
      >
        <FaArrowLeft className="text-white" />
        Go Back Home
      </Link>
    </div>
  );
}
