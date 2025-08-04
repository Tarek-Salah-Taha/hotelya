import { useTranslations } from "next-intl";

export default function CareersPage() {
  const t = useTranslations("CareersPage");

  const perks = [
    {
      icon: "🏝️",
      title: t("Flexible PTO"),
      description: t("Take time when you need it"),
    },
    {
      icon: "🏠",
      title: t("Remote Options"),
      description: t("Work from anywhere"),
    },
    {
      icon: "💪",
      title: t("Health Benefits"),
      description: t("Medical, dental & vision"),
    },
    {
      icon: "📈",
      title: t("Career Growth"),
      description: t("Learning & development"),
    },
    {
      icon: "🍕",
      title: t("Team Events"),
      description: t("Regular company retreats"),
    },
    {
      icon: "💻",
      title: t("Tech Stipend"),
      description: t("For your home office"),
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">
          {t("Join the")} <span className="text-primary">Hotelya</span>
        </h1>
        <p className="text-xl text-text max-w-3xl mx-auto">
          {t("We're building the future of travel")}
        </p>
      </div>

      {/* Culture Section */}
      <div className="bg-light/10 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-dark mb-6 text-center">
          {t("Our Culture")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">
              {t("Mission-Driven")}
            </h3>
            <p className="text-text">
              {t(
                "We're passionate about making travel accessible and enjoyable for everyone"
              )}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">{t("Collaborative")}</h3>
            <p className="text-text">
              {t(
                "We believe the best solutions come from diverse perspectives working together"
              )}
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-2">
              {t("Growth-Oriented")}
            </h3>
            <p className="text-text">
              {t(
                "We invest in our team's development and celebrate continuous learning"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Perks Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-dark mb-8 text-center">
          {t("Perks & Benefits")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {perks.map((perk, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{perk.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{perk.title}</h3>
              <p className="text-text">{perk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
