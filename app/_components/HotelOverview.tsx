import { useTranslations } from "next-intl";

function HotelOverview({ description }: { description: string }) {
  const t = useTranslations("HotelPage");

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="relative pb-2 mb-4 overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 inline-block group-hover:translate-x-1 transition-transform duration-300 rtl:group-hover:-translate-x-1">
          {t("Overview")}
        </h2>
        <div
          className="absolute bottom-0 w-12 h-1 bg-primary rounded-full 
          scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500
          rtl:origin-right"
        />
      </div>

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
