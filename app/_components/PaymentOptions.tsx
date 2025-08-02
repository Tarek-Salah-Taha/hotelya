import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaMoneyBillAlt,
  FaUniversity,
  FaMoneyCheckAlt,
  FaApple,
} from "react-icons/fa";
import { SiStripe, SiGooglepay } from "react-icons/si";
import { useTranslations } from "next-intl";

// Define all payment methods with their labels in different languages
export const availablePaymentMethods = [
  {
    icon: "FaCcVisa",
    labels: ["Visa", "فيزا"],
  },
  {
    icon: "FaCcMastercard",
    labels: ["MasterCard", "ماستركارد"],
  },
  {
    icon: "FaCcPaypal",
    labels: ["PayPal", "باي بال"],
  },
  {
    icon: "FaApple",
    labels: ["Apple Pay", "آبل باي"],
  },
  {
    icon: "FaMoneyBillAlt",
    labels: [
      "Cash",
      "نقداً",
      "كاش",
      "Bargeld",
      "Espèces",
      "Efectivo",
      "Contanti",
    ],
  },
  {
    icon: "SiGooglepay",
    labels: ["Google Pay", "جوجل باي"],
  },
  {
    icon: "FaUniversity",
    labels: [
      "Bank Transfer",
      "التحويل البنكي",
      "Virement bancaire",
      "Transferencia bancaria",
      "Banküberweisung",
      "Bonifico bancario",
    ],
  },
  {
    icon: "FaCcAmex",
    labels: ["American Express", "أمريكان إكسبريس"],
  },
  {
    icon: "SiStripe",
    labels: ["Stripe", "سترايب"],
  },
  {
    icon: "FaMoneyCheckAlt",
    labels: ["Western Union", "ويسترن يونيون"],
  },
];

// Create the icon map
export const paymentIconMap = {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaMoneyBillAlt,
  FaUniversity,
  FaMoneyCheckAlt,
  FaApple,
  SiStripe,
  SiGooglepay,
};

// Color mapping
const paymentColorMap: Record<string, string> = {
  FaCcVisa: "bg-blue-50 text-blue-800 hover:bg-blue-100",
  FaCcMastercard: "bg-red-50 text-red-800 hover:bg-red-100",
  FaCcPaypal: "bg-blue-50 text-blue-800 hover:bg-blue-100",
  FaApple: "bg-gray-50 text-gray-800 hover:bg-gray-100",
  FaMoneyBillAlt: "bg-green-50 text-green-800 hover:bg-green-100",
  SiGooglepay: "bg-gray-50 text-gray-800 hover:bg-gray-100",
  FaUniversity: "bg-indigo-50 text-indigo-800 hover:bg-indigo-100",
  FaCcAmex: "bg-blue-50 text-blue-800 hover:bg-blue-100",
  SiStripe: "bg-purple-50 text-purple-800 hover:bg-purple-100",
  FaMoneyCheckAlt: "bg-yellow-50 text-yellow-800 hover:bg-yellow-100",
};

function PaymentOptions({ payment }: { payment: string[] }) {
  const t = useTranslations("HotelPage");

  // Find matching payment methods
  const matchedPayments = payment
    .map((paymentLabel) => {
      const match = availablePaymentMethods.find((method) =>
        method.labels.includes(paymentLabel)
      );
      if (match) {
        return {
          iconKey: match.icon,
          label: paymentLabel, // <-- actual localized label from Supabase
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="relative pb-2 mb-6 overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 inline-block group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">
          {t("Payment Options")}
        </h2>
        <div className="absolute bottom-0 w-12 h-1 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rtl:origin-right" />
      </div>

      <div className="flex flex-wrap gap-3">
        {matchedPayments.map((method) => {
          const IconComponent =
            method &&
            paymentIconMap[method.iconKey as keyof typeof paymentIconMap];
          const colorClass =
            paymentColorMap[method?.iconKey as keyof typeof paymentIconMap] ||
            "bg-gray-50 text-gray-800 hover:bg-gray-100";

          return (
            <div
              key={method?.iconKey}
              className={`flex items-center gap-2 ${colorClass} px-4 py-2 rounded-lg border border-transparent hover:border-current transition-all duration-200 cursor-default group/item rtl:flex-row-reverse`}
            >
              <span className="transition-transform group-hover/item:scale-110">
                {IconComponent && <IconComponent className="text-lg" />}
              </span>
              <span className="text-sm font-medium transition-transform group-hover/item:translate-x-0.5 rtl:group-hover/item:-translate-x-0.5">
                {method?.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentOptions;
