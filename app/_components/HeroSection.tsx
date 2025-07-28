import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

function HeroSection() {
  const t = useTranslations("HomePage");

  return (
    <section className="bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-text leading-tight">
            {t("title")} <span className="text-primary">Hotelya</span>
          </h1>
          <p className="text-lg text-text opacity-90">{t("description")}</p>
          <Link
            href="/hotels"
            className="inline-block bg-primary hover:bg-dark text-white px-8 py-3 rounded-lg font-medium transition duration-300"
          >
            {t("bookButton")}
          </Link>
        </div>
        <div className="md:w-1/2">
          <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/hero.png"
              alt="Luxury hotel with pool"
              width={800}
              height={450}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent md:from-transparent md:via-transparent/70 md:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
