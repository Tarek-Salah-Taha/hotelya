import { motion } from "framer-motion";

const SkeletonLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
    <div className="w-full max-w-3xl space-y-8">
      {[1, 2, 3].map((_, i) => (
        <motion.div
          key={i}
          className="p-6 bg-white rounded-2xl shadow-xs border border-gray-100"
        >
          <div className="flex gap-4 mb-4">
            <motion.div
              className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden"
              animate={{
                background: [
                  "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)",
                  "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 80%, #f3f4f6 100%)",
                  "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)",
                ],
                backgroundSize: "200% 100%",
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <div className="flex-1 space-y-3">
              <motion.div
                className="h-4 rounded-full bg-gray-100 w-3/4"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="h-3 rounded-full bg-gray-50 w-5/6" />
              <div className="h-3 rounded-full bg-gray-50 w-2/3" />
            </div>
          </div>
          <div className="h-24 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100" />
        </motion.div>
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
