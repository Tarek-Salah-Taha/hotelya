"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Props = {
  city: string;
  price: string;
  img: string;
};

function DestinationCard({ city, price, img }: Props) {
  const t = useTranslations("HomePage");

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-64">
        <Image
          src={img}
          alt={city}
          fill
          priority={false}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
      </div>

      {/* City & Price */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-bold">{city}</h3>
        <p className="text-background">
          {t("starts from")} {price} {t("$")} {t("per night")}
        </p>
      </div>

      {/* Hover CTA */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/80">
        <Link
          href={`/hotels?city=${encodeURIComponent(city)}`}
          className="px-6 py-2 bg-white text-text font-medium rounded-full hover:bg-opacity-90 transition"
        >
          {t("explore hotels")}
        </Link>
      </div>
    </div>
  );
}

export default DestinationCard;
