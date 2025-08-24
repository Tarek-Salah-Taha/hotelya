import { motion } from "framer-motion";
import { FaChild, FaUser } from "react-icons/fa";

type GuestSelectorsProps = {
  adults: number;
  setAdults: (value: number) => void;
  childrenCount: number;
  setChildren: (value: number) => void;
  t: (key: string) => string;
};

function GuestSelectors({
  adults,
  setAdults,
  childrenCount: children,
  setChildren,
  t,
}: GuestSelectorsProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="space-y-4 flex flex-col gap-3"
    >
      {/* Adults */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <span className="flex items-center gap-2">
            <FaUser className="text-primary" />
            {t("Adults")}
          </span>
        </label>
        <div className="relative">
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="block w-full pl-10 pr-3 py-3 text-base border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg shadow-sm transition-all bg-white appearance-none"
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num === 1 ? t("Adult") : `${num} ${t("Adults")}`}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaUser className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Children */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <span className="flex items-center gap-2">
            <FaChild className="text-primary" />
            {t("Children")}
          </span>
        </label>
        <div className="relative">
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="block w-full pl-10 pr-3 py-3 text-base border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 rounded-lg shadow-sm transition-all bg-white appearance-none"
          >
            {[0, 1, 2, 3].map((num) => (
              <option key={num} value={num}>
                {num === 1 ? t("Child") : `${num} ${t("Children")}`}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaChild className="text-gray-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default GuestSelectors;
