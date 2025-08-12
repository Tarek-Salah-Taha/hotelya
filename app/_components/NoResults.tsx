"use client";

import { FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function NoResults({
  message,
  buttonText,
  destination,
}: {
  message: string;
  buttonText: string;
  destination: string;
}) {
  const t = useTranslations("NoResultsPage");
  const router = useRouter();

  const [isResetHovered, setIsResetHovered] = useState(false);

  const handleResetFilters = () => {
    router.push(destination);
  };

  return (
    <motion.div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center relative overflow-hidden">
      {/* Image instead of icon/message */}
      <div className="mb-4">
        <Image
          src="/no-results.png"
          alt="No results found"
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="mx-auto"
        />
      </div>

      {/* Message */}
      <motion.h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        {t(message)}
      </motion.h3>

      {/* Buttons */}
      <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(59, 246, 165, 0.4)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleResetFilters}
          onHoverStart={() => setIsResetHovered(true)}
          onHoverEnd={() => setIsResetHovered(false)}
          className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
        >
          <motion.div
            animate={{ rotate: isResetHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaRedo size={16} />
          </motion.div>
          {t(buttonText)}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
