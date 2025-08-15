import { motion } from "framer-motion";

export default function Stars({ stars }: { stars: number }) {
  return (
    <div className="text-yellow-400 flex items-center gap-1 py-1 px-3">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          animate={{ scale: i < stars ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {i < stars ? "★" : "☆"}
        </motion.span>
      ))}
    </div>
  );
}
