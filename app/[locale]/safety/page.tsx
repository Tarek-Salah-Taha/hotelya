export default function SafetyPage() {
  const safetyTips = [
    {
      title: "Research Your Destination",
      content:
        "Check travel advisories and local laws before your trip. Be aware of any health requirements, visa needs, or safety concerns in your destination.",
      icon: "🌍",
    },
    {
      title: "Secure Accommodations",
      content:
        "Choose reputable hotels with good security measures. Verify they have 24/7 front desk service, secure entry, and in-room safes.",
      icon: "🏨",
    },
    {
      title: "Emergency Preparedness",
      content:
        "Save local emergency numbers and your country's embassy contacts. Know the nearest hospital and keep a basic first-aid kit.",
      icon: "🆘",
    },
    {
      title: "Digital Security",
      content:
        "Use VPNs on public WiFi, enable two-factor authentication, and avoid sharing travel plans on social media in real-time.",
      icon: "🔒",
    },
    {
      title: "Transportation Safety",
      content:
        "Use licensed taxis or reputable ride-sharing services. Avoid traveling alone at night and always share your route with someone.",
      icon: "🚖",
    },
    {
      title: "Health Precautions",
      content:
        "Pack necessary medications, check if vaccinations are required, and have travel insurance that covers medical emergencies.",
      icon: "💊",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Travel Safety Tips
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your safety is our priority. Explore our comprehensive guide to secure
          and worry-free travels.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {safetyTips.map((tip, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-4">{tip.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {tip.title}
            </h3>
            <p className="text-gray-600">{tip.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Emergency Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">
              Global Emergency Numbers
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Police: 112 (most countries)</li>
              <li className="text-gray-600">Medical: 911 or 112</li>
              <li className="text-gray-600">Fire: 911 or 112</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Hotelya Support</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                24/7 Safety Hotline: +1 (800) 555-SAFE
              </li>
              <li className="text-gray-600">
                Emergency email: safety@hotelya.com
              </li>
              <li className="text-gray-600">In-app emergency button</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
