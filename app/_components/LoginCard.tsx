import { motion } from "framer-motion";

export default function LoginCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {children}
    </motion.div>
  );
}
