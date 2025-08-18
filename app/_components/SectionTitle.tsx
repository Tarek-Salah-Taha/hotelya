"use client";

import { motion } from "framer-motion";

export default function SectionTitle({
  title,
  underline = false,
}: {
  title: string;
  underline?: boolean;
}) {
  return (
    <div className="relative pb-2 mb-6 overflow-hidden">
      <motion.h2
        className="text-2xl font-semibold text-gray-800 inline-block rtl:group-hover:-translate-x-1"
        whileHover={{ scale: 1.01 }}
      >
        {title}
      </motion.h2>
      {underline && (
        <div
          className="absolute bottom-0 w-12 h-1 bg-primary rounded-full 
          scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rtl:origin-right"
        />
      )}
    </div>
  );
}
