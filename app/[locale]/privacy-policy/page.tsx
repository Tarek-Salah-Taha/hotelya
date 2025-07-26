export default function PrivacyPolicyPage() {
  const policySections = [
    {
      title: "Data We Collect",
      content: [
        "Contact information (name, email, phone)",
        "Payment details (processed securely via PCI-compliant services)",
        "Booking history and preferences",
        "Device and browser information",
        "Location data (with your permission)",
      ],
      icon: "📋",
    },
    {
      title: "How We Use Data",
      content: [
        "Process reservations and payments",
        "Personalize your experience",
        "Improve our services",
        "Send booking confirmations and updates",
        "Prevent fraud and ensure security",
      ],
      icon: "🔍",
    },
    {
      title: "Data Sharing",
      content: [
        "With hotels and service providers to fulfill bookings",
        "Payment processors to complete transactions",
        "Legal authorities when required by law",
        "Third-party analytics (anonymized where possible)",
        "Marketing partners (with your consent)",
      ],
      icon: "🤝",
    },
    {
      title: "Your Rights",
      content: [
        "Access your personal data",
        "Request correction of inaccurate data",
        "Delete your data (subject to legal requirements)",
        "Object to certain processing",
        "Withdraw consent for marketing",
      ],
      icon: "🛡️",
    },
    {
      title: "Security Measures",
      content: [
        "SSL encryption for all data transfers",
        "Regular security audits",
        "Limited employee access to sensitive data",
        "Secure payment processing",
        "Data minimization principles",
      ],
      icon: "🔒",
    },
    {
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for website functionality",
        "Analytics cookies to improve our services",
        "Marketing cookies (opt-in required)",
        "Browser controls to manage preferences",
        "Do Not Track browser setting support",
      ],
      icon: "🍪",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
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
          We are committed to protecting your personal data. This policy
          explains what information we collect, how we use it, and your rights
          under GDPR, CCPA, and other privacy regulations.
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
          Exercising Your Rights
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Data Requests</h3>
            <p className="text-gray-600 mb-4">
              Submit requests regarding your personal data through our online
              portal or by contacting our Data Protection Officer.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              Contact Information
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: privacy@hotelya.com</li>
              <li>Phone: +1 (800) 555-PRIV</li>
              <li>
                Mail: Data Protection Officer, 123 Privacy Lane, San Francisco,
                CA 94107
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Additional Information
        </h2>
        <p>
          We may update this policy periodically. Significant changes will be
          notified through email or website notices. Continued use of our
          services constitutes acceptance of the updated policy.
        </p>
        <p className="mt-4">
          For questions about this policy or our privacy practices, please
          contact us using the information above.
        </p>
      </div>
    </main>
  );
}
