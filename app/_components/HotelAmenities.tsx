import {
  FaCheck,
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
import { HotelAmenitiesProps } from "../_types/types";
import { useTranslations } from "next-intl";

// Define all amenity categories with their labels in different languages
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

const amenityColorMap: Record<
  string,
  {
    bg: string;
    text: string;
    hover: string;
    icon: string;
  }
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
  // Fallback for unknown categories
  default: {
    bg: "bg-green-50",
    text: "text-green-700",
    hover: "hover:bg-green-100",
    icon: "text-green-500",
  },
};

// Create the icon map
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

function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  const t = useTranslations("HotelPage");

  // Find matching amenity categories
  const matchedAmenities = amenities
    .map(({ type, features }) => {
      const match = availableAmenityCategories.find((category) =>
        category.labels.includes(type)
      );
      if (match) {
        return {
          iconKey: match.icon,
          type: type, // Use the actual localized label from Supabase
          features,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="relative pb-2 mb-6 overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 inline-block group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">
          {t("Amenities")}
        </h2>
        <div className="absolute bottom-0 w-12 h-1 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rtl:origin-right" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {matchedAmenities.map((amenity) => {
          const IconComponent =
            amenity &&
            amenityIconMap[amenity.iconKey as keyof typeof amenityIconMap];
          const colors = amenityColorMap[
            amenity?.iconKey as keyof typeof amenityIconMap
          ] || {
            bg: "bg-green-50",
            text: "text-green-700",
            hover: "hover:bg-green-100",
            icon: "text-green-500",
          };

          return (
            <div key={amenity?.type} className="space-y-3 group/amenity">
              <div className="flex items-center gap-3">
                <span className="transition-transform group-hover/amenity:rotate-12">
                  {IconComponent ? (
                    <IconComponent className={`text-lg ${colors.icon}`} />
                  ) : (
                    <FaQuestionCircle className="text-primary" />
                  )}
                </span>
                <h3
                  className={`font-semibold ${colors.text} text-lg transition-colors duration-200 group-hover/amenity:text-primary`}
                >
                  {amenity?.type}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {amenity?.features.map((item, idx) => (
                  <span
                    key={idx}
                    className={`flex items-center gap-1.5 ${colors.bg} ${colors.text} ${colors.hover} px-3 py-1.5 rounded-full text-sm whitespace-nowrap border border-transparent hover:border-current transition-all duration-200 cursor-default`}
                    title={item}
                  >
                    <FaCheck
                      className={`${colors.text} transition-transform group-hover/amenity:scale-110`}
                      size={14}
                    />
                    <span className="transition-transform group-hover/amenity:translate-x-0.5 rtl:group-hover/amenity:-translate-x-0.5">
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}

export default HotelAmenities;
