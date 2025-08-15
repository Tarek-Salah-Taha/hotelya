import Link from "next/link";
import Image from "next/image";
import { SupportedLang } from "../_types/types";
import { useLocale } from "next-intl";

function Logo() {
  const supportedLocales: SupportedLang[] = [
    "en",
    "ar",
    "fr",
    "de",
    "es",
    "it",
  ];

  const localeFromPath = useLocale() as SupportedLang;
  const locale: SupportedLang = supportedLocales.includes(localeFromPath)
    ? localeFromPath
    : "en";

  return (
    <Link
      href={`/${locale}`}
      className="relative w-[120px] h-[60px] min-w-[120px] min-h-[60px] inline-block"
    >
      <Image
        src="/logo.png"
        alt="Hotelya logo"
        fill
        className="object-contain"
        quality={100}
        priority
      />
    </Link>
  );
}

export default Logo;
