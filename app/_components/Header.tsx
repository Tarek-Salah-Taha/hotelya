"use client";

import Logo from "./Logo";
import Navigation from "./Navigation";
import UserPreferences from "./UserPreferences";
import { useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { UserProfile } from "../_types/types";

type HeaderProps = {
  initialUser: UserProfile | null;
};

function Header({ initialUser }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-b-text px-6 sm:px-8 py-4 bg-primary shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center gap-4">
        <Logo />
        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-white text-2xl"
          >
            {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Navigation initialUser={initialUser} />
          <UserPreferences />
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 px-4 space-y-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Navigation initialUser={initialUser} />
            <UserPreferences />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
