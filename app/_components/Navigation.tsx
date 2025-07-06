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

const NAV_ITEMS = [
  { href: "/favorites", label: "Favorites", icon: <FaRegHeart /> },
  {
    href: "/bookings",
    label: "My Bookings",
    icon: <MdOutlineBookmarkBorder />,
  },
  { href: "/hotels", label: "Hotels", icon: <LuHotel /> },
];

function Navigation() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="text-base sm:text-lg">
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors duration-200 ${
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

        <li>
          {user ? (
            <UserDropdown />
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href="/auth/login"
                className="flex items-center gap-2 px-3 py-1.5 rounded text-black hover:text-border hover:bg-primary/10 transition-colors duration-200"
              >
                <CgProfile /> Sign in/Register
              </Link>
            </motion.div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
