"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/app/_hooks/useUser";
import { logoutUser } from "../_lib/usersApi";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const router = useRouter();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    router.push("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-12 h-12 rounded-full bg-primary text-white border-2 border-black flex items-center justify-center font-bold text-lg"
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
            className="block px-4 py-2 text-text hover:bg-gray-100"
          >
            My Account
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
