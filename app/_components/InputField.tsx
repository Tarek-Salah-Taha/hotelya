import { motion } from "framer-motion";

export default function InputField({
  label,
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...rest}
        className={`border border-gray-200 rounded-lg p-3 w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
          className ?? ""
        }`}
      />
    </motion.div>
  );
}
