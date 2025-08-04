import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("Contact Us")}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t(
            "We're here to help with any questions about your stay or bookings"
          )}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 pb-3 border-b border-gray-100">
          {t("Get in Touch")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Email Section */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors">
            <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              E
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("Email Support")}
            </h3>
            <p className="text-gray-600 hover:text-primary transition-colors mb-3">
              <a href="mailto:support@hotelya.com" className="hover:underline">
                support@hotelya.com
              </a>
            </p>
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              {t("Fast response")}
            </span>
          </div>

          {/* Phone Section */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors">
            <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              P
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("Phone Support")}
            </h3>
            <p className="text-gray-600 hover:text-primary transition-colors mb-3">
              <a href="tel:+18001234567" className="hover:underline">
                +1 (800) 123-4567
              </a>
            </p>
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              {t("24/7 availability")}
            </span>
          </div>

          {/* Address Section */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors">
            <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              H
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("Headquarters")}
            </h3>
            <p className="text-gray-600">{t("123 Hospitality Way")}</p>
            <p className="text-gray-600 mb-3">{t("San Francisco, CA 94107")}</p>
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              {t("Mon-Fri, 9AM-5PM")}
            </span>
          </div>
        </div>
      </div>

      {/* Additional Support Section */}
      <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {t("Need immediate assistance?")}
        </h3>
        <p className="text-gray-600 mb-4">
          {t("Call our 24/7 support line at")} <strong>+1 800 123 4567</strong>
        </p>
        <p className="text-sm text-gray-500">
          {t("Average wait time: less than 2 minutes")}
        </p>
      </div>
    </main>
  );
}
