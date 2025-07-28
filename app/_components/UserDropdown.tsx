"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../_hooks/useUser";
import { logoutUser } from "../_lib/usersApi";
import { usePathname, useRouter } from "next/navigation";
import { SupportedLang } from "../_types/types";
import { useTranslations } from "next-intl";

export default function UserDropdown() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("Navigation");

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

  const initials = `${user?.firstName?.[0] || ""}${
    user?.lastName?.[0] || ""
  }`.toUpperCase();

  const toggleDropdown = () => setOpen(!open);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push(`/${locale}`);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />; // Or any loading UI
  }

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-white hover:border-primary-light"
      >
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt="avatar"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </button>

      {open && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-33 max-w-[80vw] bg-white border rounded-lg shadow-lg z-50">
          <Link
            href="/profile"
            className="block px-4 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium text-sm"
          >
            {t("my account")}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium text-sm"
          >
            {t("logout")}
          </button>
        </div>
      )}
    </div>
  );
}
