import { motion } from "framer-motion";
import { IoMdSearch } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

type FilterButtonsProps = {
  onApply: () => void;
  onReset: () => void;
  applyLabel: string;
  resetLabel: string;
};

export default function FilterButtons({
  onApply,
  onReset,
  applyLabel,
  resetLabel,
}: FilterButtonsProps) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onApply}
        className="w-full bg-primary text-white px-2 py-3 rounded-lg font-semibold hover:bg-success transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1"
      >
        <IoMdSearch className="text-base" /> {applyLabel}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onReset}
        className="w-full border gap-1 border-gray-300 text-gray-700 px-2 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center justify-center"
      >
        <VscDebugRestart className="text-base" /> {resetLabel}
      </motion.button>
    </div>
  );
}
