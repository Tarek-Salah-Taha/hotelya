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

const paymentIconMap: Record<string, React.ReactElement> = {
  Visa: <FaCcVisa className="text-blue-600" />,
  MasterCard: <FaCcMastercard className="text-red-600" />,
  PayPal: <FaCcPaypal className="text-blue-500" />,
  "Apple Pay": <FaApple className="text-gray-800" />,
  Cash: <FaMoneyBillAlt className="text-green-600" />,
  "Google Pay": <SiGooglepay className="text-gray-700" />,
  "Bank Transfer": <FaUniversity className="text-indigo-600" />,
  "American Express": <FaCcAmex className="text-blue-700" />,
  Stripe: <SiStripe className="text-purple-600" />,
  "Western Union": <FaMoneyCheckAlt className="text-yellow-600" />,
};

function PaymentOptions({ payment }: { payment: string[] }) {
  const unique = [...new Set(payment)];
  const colorMap: Record<string, string> = {
    Visa: "bg-blue-50 text-blue-800 hover:bg-blue-100",
    MasterCard: "bg-red-50 text-red-800 hover:bg-red-100",
    PayPal: "bg-blue-50 text-blue-800 hover:bg-blue-100",
    "Apple Pay": "bg-gray-50 text-gray-800 hover:bg-gray-100",
    Cash: "bg-green-50 text-green-800 hover:bg-green-100",
    "Google Pay": "bg-gray-50 text-gray-800 hover:bg-gray-100",
    "Bank Transfer": "bg-indigo-50 text-indigo-800 hover:bg-indigo-100",
    "American Express": "bg-blue-50 text-blue-800 hover:bg-blue-100",
    Stripe: "bg-purple-50 text-purple-800 hover:bg-purple-100",
    "Western Union": "bg-yellow-50 text-yellow-800 hover:bg-yellow-100",
  };

  return (
    <div
      className="
      bg-white p-6 rounded-xl 
      border border-gray-100
      shadow-sm hover:shadow-md 
      transition-all duration-300
      group
    "
    >
      <div className="relative pb-2 mb-6 overflow-hidden">
        <h2
          className="
          text-2xl font-semibold 
          text-gray-800
          inline-block
          group-hover:translate-x-1 
          transition-transform duration-300
        "
        >
          Payment Options
        </h2>
        <span
          className="
          absolute bottom-0 left-0 
          w-12 h-1 bg-primary rounded-full 
          scale-x-0 group-hover:scale-x-100 
          origin-left transition-transform duration-500
        "
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {unique.map((method) => {
          const colorClass =
            colorMap[method] || "bg-gray-50 text-gray-800 hover:bg-gray-100";

          return (
            <div
              key={method}
              className={`
                flex items-center gap-2 
                ${colorClass}
                px-4 py-2 rounded-lg
                border border-transparent
                hover:border-current
                transition-all duration-200
                cursor-default
                group/item
              `}
            >
              <span
                className="
                transition-transform
                group-hover/item:scale-110
              "
              >
                {paymentIconMap[method] || null}
              </span>
              <span
                className="
                text-sm font-medium
                transition-transform
                group-hover/item:translate-x-0.5
              "
              >
                {method}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentOptions;
