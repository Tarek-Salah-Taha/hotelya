import { useTranslations } from "next-intl";

export default function CookiesPage() {
  const t = useTranslations("CookiesPage");

  const cookieTypes = [
    {
      name: t("Essential Cookies"),
      purpose: t("Required for website functionality like login and checkout"),
      examples: t("Session cookies, authentication tokens"),
      duration: t("Session or up to 24 hours"),
      control: t("Cannot be disabled"),
      controlType: "required",
    },
    {
      name: t("Performance Cookies"),
      purpose: t("Collect anonymous data about website usage"),
      examples: t("Google Analytics, Hotjar"),
      duration: t("30 days to 2 years"),
      control: t("Optional"),
      controlType: "optional",
    },
    {
      name: t("Functional Cookies"),
      purpose: t("Remember preferences and settings"),
      examples: t("Language selection, currency preference"),
      duration: t("30 days to 1 year"),
      control: t("Optional"),
      controlType: "optional",
    },
    {
      name: t("Marketing Cookies"),
      purpose: t("Track visitors for personalized advertising"),
      examples: t("Facebook Pixel, Google Ads"),
      duration: t("30 days to 1 year"),
      control: t("Optional (disabled by default)"),
      controlType: "marketing",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header remains the same */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("Cookie Policy")}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t("Last updated: August 1, 2025")}
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-lg text-gray-700 mb-8">
          {t(
            "Our website uses cookies and similar technologies to improve user experience"
          )}
        </p>
      </div>

      {/* Mobile-friendly cookie cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("Types of Cookies We Use")}
        </h2>
        <div className="space-y-4">
          {cookieTypes.map((cookie, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">
                  {cookie.name}
                </h3>
                <span
                  className={`px-2.5 py-1 text-xs rounded-full ${
                    cookie.controlType === "required"
                      ? "bg-red-100 text-red-800"
                      : cookie.controlType === "marketing"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {cookie.control}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">
                    {t("Purpose:")}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    {cookie.purpose}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">
                    {t("Examples:")}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    {cookie.examples}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">
                    {t("Duration:")}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    {cookie.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of the content remains the same */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t("Managing Cookies")}
          </h2>
          <p className="text-gray-700 mb-4">
            {t(
              "You can control non-essential cookies through our preference center or directly in your browser settings"
            )}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t("Browser Controls")}
          </h2>
          <p className="text-gray-700 mb-2">
            {t("Most browsers allow you to:")}
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>{t("View and delete existing cookies")}</li>
            <li>{t("Block cookies from specific sites")}</li>
            <li>{t("Set preferences for all websites")}</li>
          </ul>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Additional Information")}
        </h2>
        <p>
          {t("We may update this policy as technology and regulations evolve")}
        </p>
        <p className="mt-4">
          {t("For questions about our cookie usage, please contact us at")}{" "}
          <strong>privacy@hotelya.com</strong>.
        </p>
      </div>
    </main>
  );
}
