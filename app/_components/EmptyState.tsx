import { motion } from "framer-motion";

export default function EmptyState({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center text-gray-500 mt-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="text-gray-400 mb-4" size={64} />
      <p className="text-lg">{text}</p>
    </motion.div>
  );
}
