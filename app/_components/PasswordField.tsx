import { motion } from "framer-motion";
import { SupportedLang } from "../_types/types";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  onTogglePassword,
  locale,
  required,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  locale: SupportedLang;
  required?: boolean;
}) {
  return (
    <motion.div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10 transition-all"
        required={required}
      />
      <motion.span
        onClick={onTogglePassword}
        className={`absolute ${
          locale === "ar" ? "left" : "right"
        }-3 top-[42px] text-gray-400 hover:text-gray-600 cursor-pointer transition-colors`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </motion.span>
    </motion.div>
  );
}
