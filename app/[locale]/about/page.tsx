export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative h-64 bg-primary/10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
          <div className="relative h-full flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-dark text-center px-4">
              About <span className="text-primary">Hotelya</span>
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 space-y-8">
          <div className="prose max-w-none">
            <p className="text-lg text-text leading-relaxed">
              Hotelya was founded to help travelers find reliable, affordable,
              and unique accommodations around the globe. We partner with
              thousands of hotels to bring you exclusive deals and the smoothest
              booking experience.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-light/10 p-6 rounded-lg border-l-4 border-primary">
            <h2 className="text-2xl font-bold text-dark mb-4">Our Mission</h2>
            <p className="text-text">
              To simplify travel by connecting people with the perfect places to
              stay, while building meaningful partnerships with hotels
              worldwide. We&#39;re committed to transparency, value, and
              exceptional customer experiences.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { value: "5M+", label: "Happy Travelers" },
              { value: "50K+", label: "Hotels Worldwide" },
              { value: "24/7", label: "Customer Support" },
              { value: "150+", label: "Countries Covered" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-border text-center"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-text">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-dark mb-6">Our Team</h2>
            <p className="text-text mb-6">
              Hotelya is powered by a diverse team of travel enthusiasts, tech
              innovators, and hospitality experts united by our passion for
              making travel better.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { name: "Alex Chen", role: "CEO & Founder" },
                { name: "Maria Garcia", role: "Head of Operations" },
                { name: "James Wilson", role: "CTO" },
                { name: "Sarah Johnson", role: "Customer Experience" },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-light flex items-center justify-center text-xl font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="font-medium text-dark">{member.name}</h3>
                  <p className="text-sm text-text/80">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
