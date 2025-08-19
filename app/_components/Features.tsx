import { useTranslations } from "next-intl";
import { FeatureItem } from "../_types/types";
import FeatureCard from "./FeatureCard";

const features: FeatureItem[] = [
  {
    icon: "💰",
    titleKey: "best price guarantee",
    descriptionKey: "best price guarantee description",
  },
  {
    icon: "⚡",
    titleKey: "instant confirmation",
    descriptionKey: "instant confirmation description",
  },
  {
    icon: "📞",
    titleKey: "24/7 global support",
    descriptionKey: "24/7 global support description",
  },
];

function Features() {
  const t = useTranslations("HomePage");

  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            {t("why choose hotelya?")}
          </h2>
          <p className="text-lg text-text opacity-90 max-w-2xl mx-auto">
            {t("experience the best")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={t(feature.titleKey)}
              description={t(feature.descriptionKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
