import { motion } from "framer-motion";

export default function LoginHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-8">
      <motion.h1 className="text-3xl font-bold text-gray-800 mb-2">
        {title}
      </motion.h1>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}
