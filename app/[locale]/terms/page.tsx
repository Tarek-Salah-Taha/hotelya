// import { useTranslations } from "next-intl";

export default function TermsPage() {
  // const t = useTranslations("TermsPage");

  const termsSections = [
    {
      title: "Account Responsibility",
      content:
        "You're responsible for maintaining confidentiality of your account credentials and all activities under your account. Notify us immediately of any unauthorized use.",
      icon: "👤",
    },
    {
      title: "Booking Policies",
      content:
        "All reservations are subject to availability and hotel confirmation. Prices may change until booking is confirmed. Special requests aren't guaranteed.",
      icon: "🏨",
    },
    {
      title: "Payment Terms",
      content:
        "Full payment may be required at booking or check-in as specified. We accept major credit cards and may pre-authorize your card before arrival.",
      icon: "💳",
    },
    {
      title: "Cancellations",
      content:
        "Standard cancellations must be made within property-specific deadlines. Non-refundable bookings can't be canceled without penalty. See our Cancellation Policy for details.",
      icon: "❌",
    },
    {
      title: "User Conduct",
      content:
        "You agree not to use our services for unlawful purposes or to transmit harmful content. We reserve the right to terminate accounts for violations.",
      icon: "🚫",
    },
    {
      title: "Intellectual Property",
      content:
        "All website content, logos, and software are our property or licensed to us. Unauthorized use is prohibited without express written permission.",
      icon: "©️",
    },
    {
      title: "Limitation of Liability",
      content:
        "We're not liable for indirect damages from service use. Our maximum liability is limited to the total booking value. Hotels are independent service providers.",
      icon: "⚖️",
    },
    {
      title: "Dispute Resolution",
      content:
        "Disputes will first attempt resolution through negotiation. If unresolved, disputes will be settled through binding arbitration in San Francisco, CA.",
      icon: "🤝",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Terms & Conditions
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
          Please read these terms carefully before using the Hotelya platform.
          By accessing or using our services, you agree to be bound by these
          terms and our Privacy Policy.
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
          Important Legal Notices
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Governing Law</h3>
            <p className="text-gray-600">
              These terms are governed by California law without regard to
              conflict of law principles.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Changes to Terms</h3>
            <p className="text-gray-600">
              We may modify these terms at any time. Continued use after changes
              constitutes acceptance.
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Contact Information
        </h2>
        <p>
          For questions about these Terms & Conditions, please contact us at:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Email: legal@hotelya.com</li>
          <li>
            Mail: Hotelya Legal Department, 123 Compliance Way, San Francisco,
            CA 94107
          </li>
          <li>
            Phone: +1 (800) 555-LEGAL (Business hours: Mon-Fri 9AM-5PM PST)
          </li>
        </ul>
      </div>
    </main>
  );
}
