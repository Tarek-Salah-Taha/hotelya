"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../_hooks/useUser";
import { signOutUser } from "../_lib/usersApi";
import { useRouter } from "next/navigation";
import { SupportedLang } from "../_types/types";
import { useTranslations } from "next-intl";
import { useUserContext } from "../_context/UserContext";
import { useLocale } from "next-intl";
import getInitials from "../_helpers/getInitials";
import ConfirmActionToast from "./ConfirmActionToast";
import { TbLogout, TbLogout2 } from "react-icons/tb";

export default function UserDropdown() {
  const router = useRouter();
  const { user, loading } = useUser();
  const { setUser } = useUserContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const tNavigation = useTranslations("Navigation");
  const tUserDropdownPage = useTranslations("UserDropdownPage");

  const supportedLocales: SupportedLang[] = [
    "en",
    "ar",
    "fr",
    "de",
    "es",
    "it",
  ];
  const localeFromPath = useLocale() as SupportedLang;
  const locale: SupportedLang = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : "en";

  const initials = getInitials(
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`
  );

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setShowConfirm(false);
    try {
      const { error } = await signOutUser();
      if (error) {
        console.error("Logout failed:", error);
      } else {
        setUser(null);
        router.replace(`/${locale}`);
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!user) {
    return (
      <Link
        href={`/${locale}/auth/login`}
        className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
      >
        {tNavigation("sign in")}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-5">
      {/* Profile Icon/Initials */}
      <Link
        href="/profile"
        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-white hover:border-primary-light"
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
      </Link>

      {/* Logout Icon */}
      <button
        onClick={() => setShowConfirm(true)}
        className="w-10 h-10 rounded-full bg-gray-100 text-red-500 flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-white hover:border-red-300 hover:bg-red-50"
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        ) : locale === "ar" ? (
          <TbLogout2 className="h-5 w-5" />
        ) : (
          <TbLogout className="h-5 w-5" />
        )}
      </button>

      {showConfirm && (
        <div className="absolute top-14 right-0 z-50">
          <ConfirmActionToast
            message={tUserDropdownPage("Are you sure you want to log out?")}
            confirmLabel={tUserDropdownPage("Logout")}
            cancelLabel={tUserDropdownPage("Cancel")}
            onConfirm={handleLogout}
            onCancel={() => setShowConfirm(false)}
          />
        </div>
      )}
    </div>
  );
}
