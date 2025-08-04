import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("TermsPage");

  const termsSections = [
    {
      title: t("Account Responsibility"),
      content: t(
        "You're responsible for maintaining confidentiality of your account credentials and all activities under your account"
      ),
      icon: "👤",
    },
    {
      title: t("Booking Policies"),
      content: t(
        "All reservations are subject to availability and hotel confirmation"
      ),
      icon: "🏨",
    },
    {
      title: t("Payment Terms"),
      content: t(
        "Full payment may be required at booking or check-in as specified"
      ),
      icon: "💳",
    },
    {
      title: t("Cancellations"),
      content: t(
        "Standard cancellations must be made within property-specific deadlines"
      ),
      icon: "❌",
    },
    {
      title: t("User Conduct"),
      content: t(
        "You agree not to use our services for unlawful purposes or to transmit harmful content"
      ),
      icon: "🚫",
    },
    {
      title: t("Intellectual Property"),
      content: t(
        "All website content, logos, and software are our property or licensed to us"
      ),
      icon: "©️",
    },
    {
      title: t("Limitation of Liability"),
      content: t("We're not liable for indirect damages from service use"),
      icon: "⚖️",
    },
    {
      title: t("Dispute Resolution"),
      content: t("Disputes will first attempt resolution through negotiation"),
      icon: "🤝",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("Terms & Conditions")}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t("Last updated: August 1, 2025")}
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-lg text-gray-700 mb-8">
          {t(
            "Please read these terms carefully before using the Hotelya platform"
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {termsSections.map((section, index) => (
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
                <p className="text-gray-600">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Important Legal Notices")}
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {t("Governing Law")}
            </h3>
            <p className="text-gray-600">
              {t(
                "These terms are governed by California law without regard to conflict of law principles"
              )}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {t("Changes to Terms")}
            </h3>
            <p className="text-gray-600">
              {t("We may modify these terms at any time")}
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Contact Information")}
        </h2>
        <p>
          {t(
            "For questions about these Terms & Conditions, please contact us at:"
          )}
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>{t("Email:")} legal@hotelya.com</li>
          <li>
            {t(
              "Mail: Hotelya Legal Department, 123 Compliance Way, San Francisco, CA 94107"
            )}
          </li>
          <li>
            {t(
              "Phone: +1 (800) 555-LEGAL (Business hours: Mon-Fri 9AM-5PM PST)"
            )}
          </li>
        </ul>
      </div>
    </main>
  );
}
