import { motion } from "framer-motion";

export default function ProfileStatus({
  label,
  valid,
}: {
  label: string;
  valid: boolean;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
      whileHover={{ x: 3 }}
    >
      <span
        className={`text-lg ${valid ? "text-green-500" : "text-yellow-500"}`}
      >
        {valid ? "✓" : "!"}
      </span>
      <span className="text-sm text-gray-600">{label}</span>
    </motion.div>
  );
}
