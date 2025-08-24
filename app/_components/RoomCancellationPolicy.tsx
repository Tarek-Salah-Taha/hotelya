import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

function RoomCancellationPolicy({ t }: { t: (key: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm"
    >
      <div className="flex items-center mb-3 space-x-2">
        <FaInfoCircle className="text-blue-500" />
        <h3 className="font-semibold text-lg text-gray-800">
          {t("General Cancellation Policy")}
        </h3>
      </div>
      <p className="text-md text-gray-700 leading-relaxed">
        <span className="font-medium text-green-600">
          {t("Free cancellation")}
        </span>
      </p>
    </motion.div>
  );
}

export default RoomCancellationPolicy;
