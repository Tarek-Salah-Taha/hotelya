"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuHotel } from "react-icons/lu";
import { useUser } from "../_hooks/useUser";
import UserDropdown from "./UserDropdown";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function Navigation() {
  const { user, loading } = useUser();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const t = useTranslations("Navigation");

  const NAV_ITEMS = [
    {
      href: "/favorites",
      label: t("favorites"),
      icon: <FaRegHeart className="text-lg" />,
    },
    {
      href: "/bookings",
      label: t("bookings"),
      icon: <MdOutlineBookmarkBorder className="text-lg" />,
    },
    {
      href: "/hotels",
      label: t("hotels"),
      icon: <LuHotel className="text-lg" />,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <nav className="text-base font-medium">
      <ul className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-start lg:items-center">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const fullHref = `/${locale}${href}`;
          const isActive = pathname.startsWith(fullHref); // Changed to startsWith for nested routes

          return (
            <li key={href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href={fullHref}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-background font-semibold bg-primary/10"
                      : "text-black hover:text-border hover:bg-primary/10"
                  }`}
                >
                  {icon} {label}
                </Link>
              </motion.div>
            </li>
          );
        })}

        <li className="mt-2 lg:mt-0">
          {user ? (
            <UserDropdown />
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={`/${locale}/auth/login`}
                className="flex items-center gap-2 px-3 py-1.5 rounded text-black hover:text-border hover:bg-primary/10 transition-colors duration-200"
              >
                <CgProfile className="text-lg text-gray-500" />
                <span>Sign in</span>
              </Link>
            </motion.div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
