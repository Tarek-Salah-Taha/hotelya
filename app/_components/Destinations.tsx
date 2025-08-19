import { useTranslations } from "next-intl";
import DestinationCard from "./DestinationCard";

type Destination = {
  city: string;
  price: string;
  img: string;
};

function Destinations() {
  const t = useTranslations("HomePage");

  const destinations: Destination[] = [
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
            <DestinationCard key={city} city={city} price={price} img={img} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Destinations;
