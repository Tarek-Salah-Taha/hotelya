export default function CareersPage() {
  const perks = [
    {
      icon: "🏝️",
      title: "Flexible PTO",
      description: "Take time when you need it",
    },
    { icon: "🏠", title: "Remote Options", description: "Work from anywhere" },
    {
      icon: "💪",
      title: "Health Benefits",
      description: "Medical, dental & vision",
    },
    {
      icon: "📈",
      title: "Career Growth",
      description: "Learning & development",
    },
    {
      icon: "🍕",
      title: "Team Events",
      description: "Regular company retreats",
    },
    { icon: "💻", title: "Tech Stipend", description: "For your home office" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">
          Join the <span className="text-primary">Hotelya</span> Team
        </h1>
        <p className="text-xl text-text max-w-3xl mx-auto">
          We&apos;re building the future of travel. Come help us create
          exceptional experiences for travelers around the world.
        </p>
      </div>

      {/* Culture Section */}
      <div className="bg-light/10 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-dark mb-6 text-center">
          Our Culture
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Mission-Driven</h3>
            <p className="text-text">
              We&apos;re passionate about making travel accessible and enjoyable
              for everyone.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Collaborative</h3>
            <p className="text-text">
              We believe the best solutions come from diverse perspectives
              working together.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-2">Growth-Oriented</h3>
            <p className="text-text">
              We invest in our team&apos;s development and celebrate continuous
              learning.
            </p>
          </div>
        </div>
      </div>

      {/* Perks Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-dark mb-8 text-center">
          Perks & Benefits
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {perks.map((perk, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{perk.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{perk.title}</h3>
              <p className="text-text">{perk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
