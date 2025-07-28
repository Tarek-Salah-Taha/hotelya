import Image from "next/image";
import { useTranslations } from "next-intl";

function Destinations() {
  const t = useTranslations("HomePage");

  const destinations = [
    { city: t("paris"), price: "120", img: "/paris.jpg" },
    { city: t("tokyo"), price: "95", img: "/tokyo.jpg" },
    { city: t("new york"), price: "180", img: "/newyork.jpg" },
    { city: t("cairo"), price: "75", img: "/cairo.jpg" },
  ];

  return (
    <section className="p-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">
            {t("popular destinations")}
          </h2>
          <p className="text-lg text-text opacity-90">
            {t("discover the world most amazing places to stay")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map(({ city, price, img }) => (
            <div
              key={city}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={img}
                  alt={city}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold">{city}</h3>
                <p className="text-background">
                  {t("starts from")} {price} {t("$")} {t("per night")}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/80">
                <button className="px-6 py-2 bg-white text-text font-medium rounded-full hover:bg-opacity-90 transition">
                  {t("explore hotels")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Destinations;
