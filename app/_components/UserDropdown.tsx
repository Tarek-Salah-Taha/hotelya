"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../_hooks/useUser";
import { signOutUser } from "../_lib/usersApi";
import { usePathname, useRouter } from "next/navigation";
import { SupportedLang } from "../_types/types";
import { useTranslations } from "next-intl";
import { useUserContext } from "../_context/UserContext";

export default function UserDropdown() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setUser } = useUserContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setOpen(false);
    setUser(null);

    try {
      await signOutUser();
      router.replace(`/${locale}`);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading && user) {
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!user) {
    return (
      <Link
        href={`/${locale}/auth/login`}
        className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
      >
        {t("sign in")}
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-white hover:border-primary-light"
        aria-label="User menu"
        disabled={isLoggingOut}
      >
        {user.avatarUrl ? (
          <Image
            key={user.avatarUrl}
            src={user.avatarUrl}
            alt="User avatar"
            width={48}
            height={48}
            className="rounded-full object-cover"
            priority
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
            onClick={() => setOpen(false)}
          >
            {t("my account")}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium text-sm flex items-center gap-2"
            disabled={isLoggingOut}
          >
            {t("logout")}
            {isLoggingOut && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
