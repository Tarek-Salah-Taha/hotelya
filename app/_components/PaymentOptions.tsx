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
  // Filter and deduplicate input array
  const unique = [...new Set(payment)];

  return (
    <div className="mt-2 p-6 bg-white rounded-xl shadow text-text">
      <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
      <div className="flex flex-wrap gap-3">
        {unique.map((method) => (
          <span
            key={method}
            className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            {paymentIconMap[method] || null}
            {method}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PaymentOptions;
