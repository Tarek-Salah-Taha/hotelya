import { useTranslations } from "next-intl";

export default function CancellationPage() {
  const t = useTranslations("CancellationPage");

  const policyDetails = [
    {
      title: t("Standard Cancellation"),
      description: t(
        "Free cancellation up to 24-48 hours before check-in (varies by property)"
      ),
      timeframe: t("24-48 hours before arrival"),
      icon: "🕒",
    },
    {
      title: t("Non-Refundable Rates"),
      description: t(
        "Special discounted rates typically dont qualify for refunds"
      ),
      timeframe: t("No refund after booking"),
      icon: "⚠️",
    },
    {
      title: t("Late Cancellations"),
      description: t(
        "Cancellations after deadline may incur 1 night charge plus tax"
      ),
      timeframe: t("After cancellation deadline"),
      icon: "⏱️",
    },
    {
      title: t("No-Shows"),
      description: t(
        "Failure to arrive without cancellation results in full stay charge"
      ),
      timeframe: t("After check-in time"),
      icon: "🚫",
    },
    {
      title: t("Group Bookings"),
      description: t("Different policies apply for 5+ rooms"),
      timeframe: t("Varies by property"),
      icon: "👥",
    },
    {
      title: t("Special Circumstances"),
      description: t("Weather events"),
      timeframe: t("Case by case"),
      icon: "🆘",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("Cancellation Policy")}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t("Most bookings can be canceled free of charge within 24 hours")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {policyDetails.map((policy, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{policy.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {policy.title}
                </h3>
                <p className="text-gray-600 mb-3">{policy.description}</p>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full inline-block">
                  {policy.timeframe}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("Need to Cancel?")}
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {t("Online Cancellation")}
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>{t("Log in to your account")}</li>
              <li>{t("Go to My Bookings")}</li>
              <li>{t("Select reservation")}</li>
              <li>{t("Follow cancellation prompts")}</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              {t("Contact Support")}
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>{t("Phone:")} +1 (800) 555-CANCEL</li>
              <li>{t("Email:")} cancellations@hotelya.com</li>
              <li>{t("Live Chat: Available 24/7")}</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              {t("For same-day cancellations")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-100">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>💡</span> {t("Travel Protection Tip")}
        </h2>
        <p className="text-gray-700">
          {t("Consider adding FlexRate Protection")}
        </p>
      </div>
    </main>
  );
}
