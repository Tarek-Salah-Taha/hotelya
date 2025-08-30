import { memo } from "react";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaTrophy,
  FaGem,
  FaStar,
  FaRegStar,
  FaThumbsUp,
  FaAward,
} from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { useTranslations } from "next-intl";

type HotelCardBadgeProps = {
  rating: number;
  stars: number;
};

const HotelCardBadge = memo(function HotelCardBadge({
  rating,
  stars,
}: HotelCardBadgeProps) {
  const tiers = [
    {
      condition: rating >= 9.5 && stars === 5,
      label: "Legendary",
      icon: <FaCrown className="text-lg" />,
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      border: "border-yellow-300/60",
      shadow: "shadow-lg shadow-yellow-500/30",
      glow: "shadow-[0_0_25px_rgba(234,179,8,0.4)]",
      textColor: "text-amber-50",
    },
    {
      condition: rating >= 9 && rating < 9.5 && stars === 5,
      label: "Exemplary",
      icon: <FaTrophy className="text-lg" />,
      gradient: "from-amber-400 via-orange-500 to-red-500",
      border: "border-amber-300/60",
      shadow: "shadow-lg shadow-amber-500/30",
      glow: "shadow-[0_0_25px_rgba(245,158,11,0.4)]",
      textColor: "text-amber-50",
    },
    {
      condition: rating >= 9 && rating < 9.5 && stars === 4,
      label: "Elite Choice",
      icon: <IoDiamond className="text-lg" />,
      gradient: "from-violet-500 via-purple-600 to-indigo-600",
      border: "border-violet-300/60",
      shadow: "shadow-lg shadow-violet-500/30",
      glow: "shadow-[0_0_25px_rgba(139,92,246,0.4)]",
      textColor: "text-purple-50",
    },
    {
      condition: rating >= 8.5 && rating < 9 && stars === 5,
      label: "Outstanding",
      icon: <FaStar className="text-lg" />,
      gradient: "from-emerald-400 via-teal-500 to-cyan-500",
      border: "border-emerald-300/60",
      shadow: "shadow-lg shadow-emerald-500/30",
      glow: "shadow-[0_0_25px_rgba(16,185,129,0.4)]",
      textColor: "text-emerald-50",
    },
    {
      condition: rating >= 8.5 && rating < 9 && stars === 4,
      label: "Exceptional",
      icon: <FaRegStar className="text-lg" />,
      gradient: "from-blue-500 via-sky-500 to-cyan-500",
      border: "border-blue-300/60",
      shadow: "shadow-lg shadow-blue-500/30",
      glow: "shadow-[0_0_25px_rgba(59,130,246,0.4)]",
      textColor: "text-blue-50",
    },
    {
      condition: rating >= 8 && rating < 8.5 && stars >= 4,
      label: "Highly Rated",
      icon: <FaGem className="text-lg" />,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      border: "border-green-300/60",
      shadow: "shadow-md shadow-green-500/25",
      glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
      textColor: "text-green-50",
    },
    {
      condition: rating >= 7.5 && rating < 8,
      label: "Recommended",
      icon: <FaThumbsUp className="text-lg" />,
      gradient: "from-slate-500 via-gray-500 to-zinc-500",
      border: "border-slate-300/60",
      shadow: "shadow-md shadow-slate-500/20",
      glow: "shadow-[0_0_15px_rgba(100,116,139,0.3)]",
      textColor: "text-slate-50",
    },

    {
      condition: rating >= 9.5 && stars === 4,
      label: "Superior",
      icon: <FaAward className="text-lg" />,
      gradient: "from-teal-600 via-cyan-700 to-blue-700",
      border: "border-cyan-300/60",
      shadow: "shadow-lg shadow-cyan-500/30",
      glow: "shadow-[0_0_25px_rgba(8,145,178,0.4)]",
      textColor: "text-cyan-50",
    },
  ];

  const t = useTranslations("Badge");

  const tier = tiers.find((t) => t.condition);
  if (!tier) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="relative inline-block"
    >
      {/* Outer glow effect */}
      <div
        className={`absolute -inset-2 bg-gradient-to-r ${tier.gradient} rounded-lg blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
      />

      {/* Main badge */}
      <motion.div
        whileHover={{
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.3 },
        }}
        className={`
          relative bg-gradient-to-r ${tier.gradient} 
          ${tier.textColor} px-4 py-2 rounded-lg
          text-xs font-bold tracking-wide
          ${tier.shadow} ${tier.border} border
          flex items-center gap-2
          backdrop-blur-sm
          transition-all duration-300 ease-out
          ${tier.glow}
          overflow-hidden
          min-w-max
        `}
      >
        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%", y: 0 }}
          whileHover={{ x: "200%", y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Content */}
        <motion.span
          className="relative z-10 font-semibold tracking-wider drop-shadow-sm"
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {t(tier.label)}
        </motion.span>

        <motion.span
          className="relative z-10 drop-shadow-sm"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.4,
            type: "spring",
            stiffness: 200,
          }}
        >
          {tier.icon}
        </motion.span>

        {/* Subtle particles */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-lg opacity-70"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
});

export default HotelCardBadge;
