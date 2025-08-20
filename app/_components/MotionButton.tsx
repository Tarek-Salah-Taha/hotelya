"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type MotionButtonProps = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "primary" | "danger";
  disabled?: boolean;
};

export default function MotionButton({
  label,
  icon,
  onClick,
  variant = "primary",
}: MotionButtonProps) {
  const baseStyles =
    "flex-1 font-medium rounded-lg transition flex items-center justify-center gap-2 text-sm shadow-md";

  const variants = {
    primary: "bg-primary text-white p-4 hover:bg-opacity-90",
    danger:
      "bg-white border border-red-300 text-red-500 p-4 hover:bg-accent hover:text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
      disabled={false}
    >
      <span>{label}</span>
      {icon}
    </motion.button>
  );
}
