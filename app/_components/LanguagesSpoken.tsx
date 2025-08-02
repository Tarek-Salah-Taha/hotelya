import { useTranslations } from "next-intl";

function LanguagesSpoken({ languages }: { languages: string[] }) {
  const t = useTranslations("HotelPage");

  // Generate a consistent color based on language name
  const getLanguageColor = (lang: string) => {
    const colors = [
      "bg-blue-50 text-blue-700 hover:bg-blue-100",
      "bg-green-50 text-green-700 hover:bg-green-100",
      "bg-purple-50 text-purple-700 hover:bg-purple-100",
      "bg-amber-50 text-amber-700 hover:bg-amber-100",
      "bg-teal-50 text-teal-700 hover:bg-teal-100",
      "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
      "bg-pink-50 text-pink-700 hover:bg-pink-100",
    ];

    // Create a simple hash based on all characters
    const hash = [...lang].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % colors.length;
    return colors[index];
  };

  return (
    <div
      className="
      bg-white p-6 rounded-xl 
      border border-gray-100
      shadow-sm hover:shadow-md 
      transition-all duration-300
      group"
    >
      <div className="relative pb-2 mb-6 overflow-hidden">
        <h2
          className="
          text-2xl font-semibold 
          text-gray-800
          inline-block
          group-hover:translate-x-1 
          rtl:group-hover:-translate-x-1
          transition-transform duration-300
        "
        >
          {t("Languages Spoken")}
        </h2>
        <div
          className="
          absolute bottom-0 w-12 h-1 bg-primary rounded-full 
          scale-x-0 group-hover:scale-x-100 
          origin-left transition-transform duration-500
          rtl:origin-right
        "
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {languages.map((lang, index) => (
          <span
            key={index}
            className={`
              ${getLanguageColor(lang)}
              px-4 py-2 rounded-lg
              border border-transparent
              hover:border-current
              transition-all duration-200
              cursor-default
              group/item
              flex items-center
              rtl:flex-row-reverse
            `}
          >
            <span
              className="
              text-sm font-medium
              transition-transform
              group-hover/item:translate-x-0.5
              rtl:group-hover/item:-translate-x-0.5
            "
            >
              {lang}
            </span>
            <span
              className="
              ml-1.5 opacity-0 
              group-hover/item:opacity-100
              transition-opacity duration-200
              rtl:ml-0 rtl:mr-1.5
            "
            >
              ✓
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default LanguagesSpoken;
