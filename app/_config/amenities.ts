import {
  FaQuestionCircle,
  FaShuttleVan,
  FaSpa,
  FaUtensils,
  FaBed,
  FaWifi,
  FaConciergeBell,
  FaShieldAlt,
  FaAccessibleIcon,
  FaChild,
  FaLeaf,
  FaBriefcase,
} from "react-icons/fa";

// Categories with labels in multiple languages
export const availableAmenityCategories = [
  {
    icon: "FaShuttleVan",
    labels: [
      "Transportation & Access",
      "المواصلات والوصول",
      "Transports et accès",
      "Transport & Zugang",
      "Transporte y acceso",
      "Trasporti e accesso",
    ],
  },
  {
    icon: "FaSpa",
    labels: [
      "Leisure & Wellness",
      "الترفيه والعافية",
      "Loisirs et bien-être",
      "Freizeit & Wellness",
      "Ocio y bienestar",
      "Tempo libero e benessere",
    ],
  },
  {
    icon: "FaUtensils",
    labels: [
      "Food & Beverage",
      "المأكولات والمشروبات",
      "Restauration",
      "Essen & Trinken",
      "Comida y bebida",
      "Cibo e bevande",
    ],
  },
  {
    icon: "FaBed",
    labels: [
      "Room Comfort",
      "راحة الغرفة",
      "Confort des chambres",
      "Zimmerkomfort",
      "Confort de la habitación",
      "Comfort in camera",
    ],
  },
  {
    icon: "FaWifi",
    labels: [
      "Technology",
      "التكنولوجيا",
      "Technologie",
      "Tecnología",
      "Tecnologia",
    ],
  },
  {
    icon: "FaConciergeBell",
    labels: ["Services", "الخدمات", "Servicios", "Servizi"],
  },
  {
    icon: "FaShieldAlt",
    labels: [
      "Security & Safety",
      "الأمن والسلامة",
      "Sécurité et sûreté",
      "Sicherheit & Schutz",
      "Seguridad",
      "Sicurezza e Protezione",
    ],
  },
  {
    icon: "FaAccessibleIcon",
    labels: [
      "Accessibility",
      "تسهيلات الوصول",
      "Accessibilité",
      "Barrierefreiheit",
      "Accesibilidad",
      "Accessibilità",
    ],
  },
  {
    icon: "FaChild",
    labels: [
      "Family & Recreation",
      "العائلة والترفيه",
      "Famille et loisirs",
      "Familie & Freizeit",
      "Familia y ocio",
      "Famiglia e svago",
    ],
  },
  {
    icon: "FaLeaf",
    labels: [
      "Sustainability",
      "الاستدامة",
      "Durabilité",
      "Nachhaltigkeit",
      "Sostenibilidad",
      "Sostenibilità",
    ],
  },
  {
    icon: "FaBriefcase",
    labels: [
      "Business Travel",
      "رحلات عمل",
      "Voyages d'affaires",
      "Geschäftsreisen",
      "Viajes de negocios",
      "Viaggi d'affari",
    ],
  },
];

// Color styles
export const amenityColorMap: Record<
  string,
  { bg: string; text: string; hover: string; icon: string }
> = {
  FaShuttleVan: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    hover: "hover:bg-blue-100",
    icon: "text-blue-500",
  },
  FaSpa: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    hover: "hover:bg-pink-100",
    icon: "text-pink-500",
  },
  FaUtensils: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    hover: "hover:bg-orange-100",
    icon: "text-orange-500",
  },
  FaBed: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    hover: "hover:bg-yellow-100",
    icon: "text-yellow-500",
  },
  FaWifi: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    hover: "hover:bg-purple-100",
    icon: "text-purple-500",
  },
  FaConciergeBell: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    hover: "hover:bg-teal-100",
    icon: "text-teal-500",
  },
  FaShieldAlt: {
    bg: "bg-red-50",
    text: "text-red-700",
    hover: "hover:bg-red-100",
    icon: "text-red-500",
  },
  FaAccessibleIcon: {
    bg: "bg-green-50",
    text: "text-green-700",
    hover: "hover:bg-green-100",
    icon: "text-green-500",
  },
  FaChild: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    hover: "hover:bg-indigo-100",
    icon: "text-indigo-500",
  },
  FaLeaf: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    hover: "hover:bg-emerald-100",
    icon: "text-emerald-500",
  },
  FaBriefcase: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    hover: "hover:bg-gray-200",
    icon: "text-gray-600",
  },
  default: {
    bg: "bg-green-50",
    text: "text-green-700",
    hover: "hover:bg-green-100",
    icon: "text-green-500",
  },
};

// Icon map
export const amenityIconMap = {
  FaShuttleVan,
  FaSpa,
  FaUtensils,
  FaBed,
  FaWifi,
  FaConciergeBell,
  FaShieldAlt,
  FaAccessibleIcon,
  FaChild,
  FaLeaf,
  FaBriefcase,
  FaQuestionCircle,
};
