import { motion } from "framer-motion";
import { FaMoneyBillWave } from "react-icons/fa";

type RoomPriceSummaryProps = {
  price: number;
  totalNights: number;
  totalPrice: number;
  taxes: number;
  grandTotal: number;
  t: (key: string) => string;
};

function RoomPriceSummary({
  price,
  totalNights,
  totalPrice,
  taxes,
  grandTotal,
  t,
}: RoomPriceSummaryProps) {
  return (
    <motion.div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
      <div className="flex items-center mb-4 space-x-2">
        <FaMoneyBillWave className="text-primary mr-2" />
        <h3 className="font-semibold text-lg text-gray-800">
          {t("Booking Summary")}
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t("Price Per Night")}</span>
          <span className="font-medium">
            {price.toFixed(2)} {t("$")}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t("Nights")}</span>
          <span className="font-medium">{totalNights}</span>
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-semibold">{t("Subtotal")}</span>
          <span className="font-medium">
            {totalPrice.toFixed(2)} {t("$")}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">{t("Taxes & Fees")}</span>
          <span className="font-medium">
            {taxes.toFixed(2)} {t("$")}
          </span>
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-bold text-lg">{t("Total")}</span>
          <motion.span
            className="text-xl font-bold text-primary"
            transition={{ type: "spring", stiffness: 300 }}
          >
            {grandTotal.toFixed(2)} {t("$")}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default RoomPriceSummary;
