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

export type PaymentIconKey =
  | "FaCcVisa"
  | "FaCcMastercard"
  | "FaCcPaypal"
  | "FaApple"
  | "FaMoneyBillAlt"
  | "SiGooglepay"
  | "FaUniversity"
  | "FaCcAmex"
  | "SiStripe"
  | "FaMoneyCheckAlt";

export type PaymentMethod = {
  icon: PaymentIconKey;
  labels: string[];
  colorClass: string;
};

export const paymentMethods: PaymentMethod[] = [
  {
    icon: "FaCcVisa",
    labels: ["Visa", "فيزا"],
    colorClass: "bg-blue-50 text-blue-800 hover:bg-blue-100",
  },
  {
    icon: "FaCcMastercard",
    labels: ["MasterCard", "ماستركارد"],
    colorClass: "bg-red-50 text-red-800 hover:bg-red-100",
  },
  {
    icon: "FaCcPaypal",
    labels: ["PayPal", "باي بال"],
    colorClass: "bg-blue-50 text-blue-800 hover:bg-blue-100",
  },
  {
    icon: "FaApple",
    labels: ["Apple Pay", "آبل باي"],
    colorClass: "bg-gray-50 text-gray-800 hover:bg-gray-100",
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
    colorClass: "bg-green-50 text-green-800 hover:bg-green-100",
  },
  {
    icon: "SiGooglepay",
    labels: ["Google Pay", "جوجل باي"],
    colorClass: "bg-gray-50 text-gray-800 hover:bg-gray-100",
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
    colorClass: "bg-indigo-50 text-indigo-800 hover:bg-indigo-100",
  },
  {
    icon: "FaCcAmex",
    labels: ["American Express", "أمريكان إكسبريس"],
    colorClass: "bg-blue-50 text-blue-800 hover:bg-blue-100",
  },
  {
    icon: "SiStripe",
    labels: ["Stripe", "سترايب"],
    colorClass: "bg-purple-50 text-purple-800 hover:bg-purple-100",
  },
  {
    icon: "FaMoneyCheckAlt",
    labels: ["Western Union", "ويسترن يونيون"],
    colorClass: "bg-yellow-50 text-yellow-800 hover:bg-yellow-100",
  },
];

// 🔍 Fast label lookup
export const paymentLookup = new Map<string, PaymentMethod>();
paymentMethods.forEach((method) =>
  method.labels.forEach((label) => paymentLookup.set(label, method))
);

// 🖼️ Icon mapping
export const paymentIconMap: Record<
  PaymentIconKey,
  React.ComponentType<{ className?: string }>
> = {
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
