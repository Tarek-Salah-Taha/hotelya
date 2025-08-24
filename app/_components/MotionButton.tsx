"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type MotionButtonProps = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "primary" | "danger";
  disabled?: boolean;
  className?: string;
};

export default function MotionButton({
  label,
  icon,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: MotionButtonProps) {
  const baseStyles =
    "flex-1 font-bold rounded-lg transition flex items-center justify-center gap-2 text-sm shadow-md focus:outline-none";

  const variants = {
    primary:
      "bg-primary text-white px-6 py-4 hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed",
    danger:
      "bg-white border border-red-300 text-red-500 px-6 py-4 hover:bg-red-500 hover:text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      <span>{label}</span>
      {icon}
    </motion.button>
  );
}
