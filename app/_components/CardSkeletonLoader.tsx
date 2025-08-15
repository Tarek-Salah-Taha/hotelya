import { motion } from "framer-motion";

const CardSkeletonLoader = () => (
  <div className="min-h-[60vh] px-4 py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="p-4 bg-white rounded-xl shadow-xs border border-gray-100"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            repeatType: "reverse",
          }}
        >
          <motion.div
            className="h-40 w-full rounded-lg bg-gray-100 mb-4"
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
          <div className="space-y-3">
            <motion.div
              className="h-4 rounded-full bg-gray-100 w-3/4"
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
            <motion.div
              className="h-3 rounded-full bg-gray-100 w-5/6"
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
                delay: 0.2,
                ease: "linear",
              }}
            />
            <motion.div
              className="h-3 rounded-full bg-gray-100 w-2/3"
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
                delay: 0.4,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default CardSkeletonLoader;
