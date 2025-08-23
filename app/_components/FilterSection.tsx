import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { ReactNode } from "react";

type FilterSectionProps = {
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export default function FilterSection({
  title,
  icon,
  isOpen,
  onToggle,
  children,
}: FilterSectionProps) {
  return (
    <div className="border-b border-gray-100 pb-2">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className="flex justify-between items-center w-full font-semibold mb-2 text-base p-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-gray-700">
          {icon} {title}
        </span>
        {isOpen ? (
          <IoChevronUp className="text-gray-500" />
        ) : (
          <IoChevronDown className="text-gray-500" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            className="pl-8 space-y-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
