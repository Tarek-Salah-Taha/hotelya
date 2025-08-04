import { useTranslations } from "next-intl";

export default function SafetyPage() {
  const t = useTranslations("SafetyPage");

  const safetyTips = [
    {
      title: t("Research Your Destination"),
      content: t("Check travel advisories and local laws before your trip"),
      icon: "🌍",
    },
    {
      title: t("Secure Accommodations"),
      content: t("Choose reputable hotels with good security measures"),
      icon: "🏨",
    },
    {
      title: t("Emergency Preparedness"),
      content: t(
        "Save local emergency numbers and your country's embassy contacts"
      ),
      icon: "🆘",
    },
    {
      title: t("Digital Security"),
      content: t("Use VPNs on public WiFi"),
      icon: "🔒",
    },
    {
      title: t("Transportation Safety"),
      content: t("Use licensed taxis or reputable ride-sharing services"),
      icon: "🚖",
    },
    {
      title: t("Health Precautions"),
      content: t("Pack necessary medications"),
      icon: "💊",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("Travel Safety Tips")}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t("Your safety is our priority")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {safetyTips.map((tip, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {tip.title}
            </h3>
            <p className="text-gray-600">{tip.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Emergency Resources")}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">
              {t("Global Emergency Numbers")}
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                {t("Police: 112 (most countries)")}
              </li>
              <li className="text-gray-600">{t("Medical: 911 or 112")}</li>
              <li className="text-gray-600">{t("Fire: 911 or 112")}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">
              {t("Hotelya Support")}
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                {t("24/7 Safety Hotline:")} +1 (800) 555-SAFE
              </li>
              <li className="text-gray-600">
                {t("Emergency email:")} safety@hotelya.com
              </li>
              <li className="text-gray-600">{t("In-app emergency button")}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
