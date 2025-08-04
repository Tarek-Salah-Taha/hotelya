import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPolicyPage");

  const policySections = [
    {
      title: t("Data We Collect"),
      content: [
        t("Contact information (name, email, phone)"),
        t("Payment details (processed securely via PCI-compliant services)"),
        t("Booking history and preferences"),
        t("Device and browser information"),
        t("Location data (with your permission)"),
      ],
      icon: "📋",
    },
    {
      title: t("How We Use Data"),
      content: [
        t("Process reservations and payments"),
        t("Personalize your experience"),
        t("Improve our services"),
        t("Send booking confirmations and updates"),
        t("Prevent fraud and ensure security"),
      ],
      icon: "🔍",
    },
    {
      title: t("Data Sharing"),
      content: [
        t("With hotels and service providers to fulfill bookings"),
        t("Payment processors to complete transactions"),
        t("Legal authorities when required by law"),
        t("Third-party analytics (anonymized where possible)"),
        t("Marketing partners (with your consent)"),
      ],
      icon: "🤝",
    },
    {
      title: t("Your Rights"),
      content: [
        t("Access your personal data"),
        t("Request correction of inaccurate data"),
        t("Delete your data (subject to legal requirements)"),
        t("Object to certain processing"),
        t("Withdraw consent for marketing"),
      ],
      icon: "🛡️",
    },
    {
      title: t("Security Measures"),
      content: [
        t("SSL encryption for all data transfers"),
        t("Regular security audits"),
        t("Limited employee access to sensitive data"),
        t("Secure payment processing"),
        t("Data minimization principles"),
      ],
      icon: "🔒",
    },
    {
      title: t("Cookies & Tracking"),
      content: [
        t("Essential cookies for website functionality"),
        t("Analytics cookies to improve our services"),
        t("Marketing cookies (opt-in required)"),
        t("Browser controls to manage preferences"),
        t("Do Not Track browser setting support"),
      ],
      icon: "🍪",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("Privacy Policy")}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t("Last updated: August 1, 2025")}
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-lg text-gray-700 mb-8">
          {t("We are committed to protecting your personal data")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {policySections.map((section, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{section.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {section.title}
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Exercising Your Rights")}
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {t("Data Requests")}
            </h3>
            <p className="text-gray-600 mb-4">
              {t(
                "Submit requests regarding your personal data through our online portal or by contacting our Data Protection Officer"
              )}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {t("Contact Information")}
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>{t("Email:")} privacy@hotelya.com</li>
              <li>{t("Phone:")} +1 (800) 555-PRIV</li>
              <li>
                {t(
                  "Mail: Data Protection Officer, 123 Privacy Lane, San Francisco, CA 94107"
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Additional Information")}
        </h2>
        <p>{t("We may update this policy periodically")}</p>
        <p className="mt-4">
          {t("For questions about this policy or our privacy practices")}
        </p>
      </div>
    </main>
  );
}
