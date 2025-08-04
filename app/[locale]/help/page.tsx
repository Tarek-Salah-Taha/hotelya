import { useTranslations } from "next-intl";

export default function HelpPage() {
  const t = useTranslations("HelpPage");

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("Help Center")}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("Find answers to common questions about booking")}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* FAQ Section */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            {t("Frequently Asked Questions")}
          </h2>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="border-b border-gray-100 pb-6 last:border-0">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("How do I modify or cancel my reservation?")}
              </h3>
              <p className="text-gray-600">
                {t(
                  "You can modify or cancel your reservation through your account dashboard"
                )}
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="border-b border-gray-100 pb-6 last:border-0">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("What payment methods do you accept?")}
              </h3>
              <p className="text-gray-600">
                {t("We accept all major credit cards")}
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="border-b border-gray-100 pb-6 last:border-0">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("How do I contact customer support?")}
              </h3>
              <p className="text-gray-600">
                {t("Our support team is available 24/7")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
