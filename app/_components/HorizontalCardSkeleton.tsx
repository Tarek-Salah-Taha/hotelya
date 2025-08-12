import { motion } from "framer-motion";

const HorizontalCardSkeleton = () => (
  <div className="flex items-center justify-center min-h-[60vh] px-4">
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((_, i) => (
        <motion.div
          key={i}
          className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          {/* Image placeholder */}
          <motion.div
            className="h-40 w-full rounded-lg bg-gray-100 mb-4 overflow-hidden"
            animate={{
              background: [
                "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)",
                "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 80%, #f3f4f6 100%)",
                "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)",
              ],
              backgroundSize: "200% 100%",
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Title */}
          <motion.div
            className="h-5 rounded-full bg-gray-100 w-3/4 mb-3"
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Description lines */}
          <div className="space-y-2">
            <div className="h-3 rounded-full bg-gray-50 w-full" />
            <div className="h-3 rounded-full bg-gray-50 w-5/6" />
            <div className="h-3 rounded-full bg-gray-50 w-2/3" />
          </div>

          {/* Footer/CTA placeholder */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div className="h-4 rounded-full bg-gray-50 w-1/3" />
            <div className="h-8 rounded-lg bg-gray-100 w-20" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default HorizontalCardSkeleton;
