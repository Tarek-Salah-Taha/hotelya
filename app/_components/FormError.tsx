import { motion } from "framer-motion";

export default function FormError({ message }: { message: string }) {
  return (
    <motion.p className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
      {message}
    </motion.p>
  );
}
