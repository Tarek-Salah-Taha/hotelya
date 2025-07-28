import { useTranslations } from "next-intl";

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
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border hover:border-primary/30 group">
            <div className="text-3xl mb-4 text-primary">💰</div>
            <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
              {t("best price guarantee")}
            </h3>
            <p className="text-text opacity-80">
              {t("best price guarantee description")}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border hover:border-primary/30 group">
            <div className="text-3xl mb-4 text-primary">⚡</div>
            <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
              {t("instant confirmation")}
            </h3>
            <p className="text-text opacity-80">
              {t("instant confirmation description")}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border hover:border-primary/30 group">
            <div className="text-3xl mb-4 text-primary">📞</div>
            <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
              {t("24/7 global support")}
            </h3>
            <p className="text-text opacity-80">
              {t("24/7 global support description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
