"use client";

import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Stars({ stars }: { stars: number }) {
  return (
    <div className="text-yellow-400 flex items-center gap-1 py-1 px-3">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          animate={{ scale: i < stars ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {i < stars ? (
            <FaStar key={i} className="text-yellow-400" />
          ) : (
            <FaRegStar key={i} className="text-yellow-400" />
          )}
        </motion.span>
      ))}
    </div>
  );
}
