import getLanguageColor from "../_helpers/getLanguageColor";

export default function LanguagePill({ lang }: { lang: string }) {
  return (
    <span
      key={lang}
      className={`
        ${getLanguageColor(
          lang
        )} px-4 py-2 rounded-lg  border border-transparent
        hover:border-current transition-all duration-200
        cursor-default group/item flex items-center rtl:flex-row-reverse`}
    >
      <span className="text-sm font-medium transition-transform group-hover/item:translate-x-0.5 rtl:group-hover/item:-translate-x-0.5 ">
        {lang}
      </span>
      <span className="ml-1.5 opacity-0 group-hover/item:opacity-100    transition-opacity duration-200 rtl:ml-0 rtl:mr-1.5 ">
        ✓
      </span>
    </span>
  );
}
