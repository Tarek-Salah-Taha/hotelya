export default function AccessibilityPage() {
  const accessibilityFeatures = [
    {
      title: "Keyboard Navigation",
      description:
        "All functionality available via keyboard, with visible focus indicators",
      icon: "⌨️",
    },
    {
      title: "Screen Reader Compatible",
      description:
        "Proper ARIA labels and semantic HTML for screen reader users",
      icon: "📖",
    },
    {
      title: "Text Alternatives",
      description:
        "Descriptive alt text for images and transcripts for multimedia",
      icon: "🖼️",
    },
    {
      title: "Color Contrast",
      description:
        "Minimum 4.5:1 contrast ratio for normal text (WCAG AA standard)",
      icon: "🎨",
    },
    {
      title: "Resizable Text",
      description: "Text can be zoomed to 200% without loss of functionality",
      icon: "🔍",
    },
    {
      title: "Consistent Navigation",
      description: "Predictable structure and labeling across all pages",
      icon: "🧭",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Accessibility Statement
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
          At Hotelya, we are committed to ensuring digital accessibility for
          people with disabilities. We continually improve the user experience
          for everyone and apply relevant accessibility standards.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Our Commitment
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
          Conformance Status
        </h2>
        <p className="text-gray-700 mb-4">
          We aim to meet WCAG 2.1 Level AA standards. Our website is partially
          conformant, meaning some content may not fully conform to the
          accessibility standard.
        </p>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              Known Limitations
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Third-party booking widgets may have limited accessibility
              </li>
              <li>Some older PDF documents may not be fully accessible</li>
              <li>Map interfaces may present challenges for keyboard users</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Ongoing Efforts</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Monthly accessibility audits</li>
              <li>Regular staff training</li>
              <li>User testing with people with disabilities</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Feedback Process
          </h2>
          <p className="text-gray-600 mb-4">
            We welcome your feedback on the accessibility of our website. Please
            let us know if you encounter barriers:
          </p>
          <ul className="space-y-2 text-gray-600 mb-4">
            <li>Email: accessibility@hotelya.com</li>
            <li>Phone: +1 (800) 555-ACCESS</li>
            <li>Feedback form on our website</li>
          </ul>
          <p className="text-sm text-gray-500">
            We try to respond to feedback within 2 business days.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Alternative Arrangements
          </h2>
          <p className="text-gray-600 mb-4">
            If you&apos;re unable to access any content, we&apos;ll work with
            you to provide the information:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Phone support for bookings</li>
            <li>Text-based alternatives for visual content</li>
            <li>Assistance with navigation</li>
          </ul>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Technical Specifications
        </h2>
        <p>
          Our accessibility efforts rely on HTML5, WAI-ARIA, CSS and JavaScript
          technologies. We recommend using the latest versions of assistive
          technologies and web browsers.
        </p>
        <p className="mt-4">
          This statement was last reviewed on{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          . We regularly update our accessibility practices as standards evolve.
        </p>
      </div>
    </main>
  );
}
