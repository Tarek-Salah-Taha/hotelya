import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle";
import LanguagePill from "./LanguagePill";

function LanguagesSpoken({ languages }: { languages: string[] }) {
  const t = useTranslations("HotelPage");

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <SectionTitle title={t("Languages Spoken")} underline />
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => (
          <LanguagePill key={lang} lang={lang} />
        ))}
      </div>
    </div>
  );
}

export default LanguagesSpoken;
