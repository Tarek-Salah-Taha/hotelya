import { useTranslations } from "next-intl";

export default function AccessibilityPage() {
  const t = useTranslations("AccessibilityPage");

  const accessibilityFeatures = [
    {
      title: t("Keyboard Navigation"),
      description: t(
        "All functionality available via keyboard, with visible focus indicators"
      ),
      icon: "⌨️",
    },
    {
      title: t("Screen Reader Compatible"),
      description: t(
        "Proper ARIA labels and semantic HTML for screen reader users"
      ),
      icon: "📖",
    },
    {
      title: t("Text Alternatives"),
      description: t(
        "Descriptive alt text for images and transcripts for multimedia"
      ),
      icon: "🖼️",
    },
    {
      title: t("Color Contrast"),
      description: t("Minimum contrast"),
      icon: "🎨",
    },
    {
      title: t("Resizable Text"),
      description: t(
        "Text can be zoomed to 200% without loss of functionality"
      ),
      icon: "🔍",
    },
    {
      title: t("Consistent Navigation"),
      description: t("Predictable structure and labeling across all pages"),
      icon: "🧭",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("Accessibility Statement")}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t("Last updated: August 1, 2025")}
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-lg text-gray-700 mb-8">
          {t(
            "At Hotelya, we are committed to ensuring digital accessibility for people with disabilities"
          )}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("Our Commitment")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {accessibilityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Conformance Status")}
        </h2>
        <p className="text-gray-700 mb-4">{t("We aim to meet WCAG")}</p>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {t("Known Limitations")}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                {t(
                  "Third-party booking widgets may have limited accessibility"
                )}
              </li>
              <li>
                {t("Some older PDF documents may not be fully accessible")}
              </li>
              <li>
                {t("Map interfaces may present challenges for keyboard users")}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {t("Ongoing Efforts")}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>{t("Monthly accessibility audits")}</li>
              <li>{t("Regular staff training")}</li>
              <li>{t("User testing with people with disabilities")}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t("Feedback Process")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("We welcome your feedback on the accessibility of our website")}
          </p>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li>{t("Email:")} accessibility@hotelya.com</li>
            <li>{t("Phone:")} +1 (800) 555-ACCESS</li>
            <li>{t("Feedback form on our website")}</li>
          </ul>
          <p className="text-sm text-gray-500">
            {t("We try to respond to feedback within 2 business days")}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t("Alternative Arrangements")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t(
              "If you're unable to access any content, we'll work with you to provide the information:"
            )}
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>{t("Phone support for bookings")}</li>
            <li>{t("Text-based alternatives for visual content")}</li>
            <li>{t("Assistance with navigation")}</li>
          </ul>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Technical Specifications")}
        </h2>
        <p>{t("Our accessibility efforts rely on HTML5")}</p>
        <p className="mt-4">
          {t("This statement was last reviewed on August 1, 2025")}
        </p>
      </div>
    </main>
  );
}
