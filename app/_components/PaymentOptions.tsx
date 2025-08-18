import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle";
import {
  paymentLookup,
  paymentIconMap,
  PaymentMethod,
} from "../_config/paymentConfig";
import { PaymentOptionProps } from "../_types/types";
import PaymentPill from "./PaymentPill";

function PaymentOptions({ payment }: PaymentOptionProps) {
  const t = useTranslations("HotelPage");

  // 🔎 Find matching payment methods using lookup
  const matchedPayments = payment
    .map((label) => {
      const method = paymentLookup.get(label);
      return method ? { ...method, label } : null;
    })
    .filter(Boolean) as (PaymentMethod & { label: string })[];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <SectionTitle title={t("Payment Options")} underline />

      <div className="flex flex-wrap gap-3">
        {matchedPayments.map(({ icon, colorClass, label }) => {
          const IconComponent = paymentIconMap[icon];
          return (
            <PaymentPill
              key={`${icon}-${label}`}
              icon={IconComponent}
              colorClass={colorClass}
              label={label}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PaymentOptions;
