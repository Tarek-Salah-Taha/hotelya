"use client";

import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuHotel } from "react-icons/lu";
import { useUser } from "@/app/_hooks/useUser";
import UserDropdown from "./UserDropdown";

function Navigation() {
  const { user } = useUser();

  return (
    <nav className="text-base sm:text-lg">
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
        <li>
          <Link href="/" className="flex items-center gap-2">
            <FaRegHeart /> Favorites
          </Link>
        </li>
        <li>
          <Link href="/" className="flex items-center gap-2">
            <MdOutlineBookmarkBorder /> My Trips
          </Link>
        </li>
        <li>
          <Link href="/hotels" className="flex items-center gap-2">
            <LuHotel /> Hotels
          </Link>
        </li>
        <li>
          {user ? (
            <UserDropdown />
          ) : (
            <Link href="/auth/login" className="flex items-center gap-2">
              <CgProfile /> Sign in/Register
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
