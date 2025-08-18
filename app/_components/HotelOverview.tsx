import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle";

function HotelOverview({ description }: { description: string }) {
  const t = useTranslations("HotelPage");

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
      <SectionTitle title={t("Overview")} underline />

      <p className="text-lg text-gray-600 leading-relaxed">
        {description || (
          <span className="text-gray-400 italic">
            {t("No description available for this hotel")}
          </span>
        )}
      </p>
    </div>
  );
}

export default HotelOverview;
