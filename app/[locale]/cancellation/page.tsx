export default function CancellationPage() {
  const policyDetails = [
    {
      title: "Standard Cancellation",
      description:
        "Free cancellation up to 24-48 hours before check-in (varies by property). No penalty if canceled within timeframe.",
      timeframe: "24-48 hours before arrival",
      icon: "🕒",
    },
    {
      title: "Non-Refundable Rates",
      description:
        "Special discounted rates typically don't qualify for refunds. Consider travel insurance for flexibility.",
      timeframe: "No refund after booking",
      icon: "⚠️",
    },
    {
      title: "Late Cancellations",
      description:
        "Cancellations after deadline may incur 1 night charge plus tax. Some properties have stricter policies.",
      timeframe: "After cancellation deadline",
      icon: "⏱️",
    },
    {
      title: "No-Shows",
      description:
        "Failure to arrive without cancellation results in full stay charge. Always contact us if delayed.",
      timeframe: "After check-in time",
      icon: "🚫",
    },
    {
      title: "Group Bookings",
      description:
        "Different policies apply for 5+ rooms. May require 30+ days notice for full refund.",
      timeframe: "Varies by property",
      icon: "👥",
    },
    {
      title: "Special Circumstances",
      description:
        "Weather events, illness, or emergencies may qualify for exceptions with documentation.",
      timeframe: "Case by case",
      icon: "🆘",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cancellation Policy
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Most bookings can be canceled free of charge within 24 hours. Review
          specific hotel cancellation rules during checkout or in your booking
          confirmation.
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
          Need to Cancel?
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              Online Cancellation
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Log in to your account</li>
              <li>Go to &lsquo;My Bookings&rsquo;</li>
              <li>Select reservation</li>
              <li>Follow cancellation prompts</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Contact Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Phone: +1 (800) 555-CANCEL</li>
              <li>Email: cancellations@hotelya.com</li>
              <li>Live Chat: Available 24/7</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              For same-day cancellations, we recommend calling for immediate
              processing.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-green-50 rounded-xl p-6 border border-green-100">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>💡</span> Travel Protection Tip
        </h2>
        <p className="text-gray-700">
          Consider adding <strong>FlexRate Protection</strong> during your next
          booking for free cancellations up to 24 hours before check-in, even on
          non-refundable rates.
        </p>
      </div>
    </main>
  );
}
