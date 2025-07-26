export default function CookiesPage() {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      purpose: "Required for website functionality like login and checkout",
      examples: "Session cookies, authentication tokens",
      duration: "Session or up to 24 hours",
      control: "Cannot be disabled",
      controlType: "required",
    },
    {
      name: "Performance Cookies",
      purpose: "Collect anonymous data about website usage",
      examples: "Google Analytics, Hotjar",
      duration: "30 days to 2 years",
      control: "Optional",
      controlType: "optional",
    },
    {
      name: "Functional Cookies",
      purpose: "Remember preferences and settings",
      examples: "Language selection, currency preference",
      duration: "30 days to 1 year",
      control: "Optional",
      controlType: "optional",
    },
    {
      name: "Marketing Cookies",
      purpose: "Track visitors for personalized advertising",
      examples: "Facebook Pixel, Google Ads",
      duration: "30 days to 1 year",
      control: "Optional (disabled by default)",
      controlType: "marketing",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header remains the same */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <p className="text-lg text-gray-700 mb-8">
          Our website uses cookies and similar technologies to improve user
          experience, analyze traffic, and personalize content. By continuing to
          browse, you consent to our use of essential cookies. You can manage
          preferences for other cookie types at any time.
        </p>
      </div>

      {/* Mobile-friendly cookie cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Types of Cookies We Use
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
                    Purpose:
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    {cookie.purpose}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">
                    Examples:
                  </span>
                  <span className="text-sm text-gray-600 ml-2">
                    {cookie.examples}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-medium text-gray-500 min-w-[80px]">
                    Duration:
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
            Managing Cookies
          </h2>
          <p className="text-gray-700 mb-4">
            You can control non-essential cookies through our preference center
            or directly in your browser settings.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Browser Controls
          </h2>
          <p className="text-gray-700 mb-2">Most browsers allow you to:</p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>View and delete existing cookies</li>
            <li>Block cookies from specific sites</li>
            <li>Set preferences for all websites</li>
          </ul>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Additional Information
        </h2>
        <p>
          We may update this policy as technology and regulations evolve.
          Significant changes will be notified through our website or email.
        </p>
        <p className="mt-4">
          For questions about our cookie usage, please contact us at{" "}
          <strong>privacy@hotelya.com</strong>.
        </p>
      </div>
    </main>
  );
}
