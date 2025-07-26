export default function PressPage() {
  const pressReleases = [
    {
      title: "Hotelya Raises $20M Series B to Expand Global Hotel Network",
      date: "May 15, 2023",
      source: "TechCrunch",
    },
    {
      title: "Hotelya Named One of Fastest Growing Travel Startups",
      date: "March 2, 2023",
      source: "Forbes",
    },
    {
      title: "How Hotelya is Changing the Way We Book Hotels",
      date: "January 10, 2023",
      source: "Travel Weekly",
    },
  ];

  const mediaCoverage = [
    {
      title: "The Future of Travel Tech: Interview with Hotelya CEO",
      source: "Bloomberg",
      date: "April 5, 2023",
    },
    {
      title: "Hotelya's Innovative Approach to Hotel Booking",
      source: "Skift",
      date: "February 18, 2023",
    },
    {
      title: "Why Travelers Are Switching to Hotelya",
      source: "Condé Nast Traveler",
      date: "December 5, 2022",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">
          Press & <span className="text-primary">Media</span>
        </h1>
        <p className="text-xl text-text max-w-3xl mx-auto">
          For media inquiries, interviews, or partnerships, please contact our
          press team.
        </p>
      </div>

      {/* Press Contact */}

      {/* Press Releases */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-dark mb-8">Press Releases</h2>
        <div className="space-y-6">
          {pressReleases.map((release, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
              <div className="flex gap-4 text-sm text-text/80">
                <span>{release.date}</span>
                <span>•</span>
                <span>{release.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Coverage */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-dark mb-8">Media Coverage</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaCoverage.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all h-full"
            >
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium text-primary">
                  {item.source}
                </span>
                <span className="text-sm text-text/80">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Bios */}
      <div>
        <h2 className="text-3xl font-bold text-dark mb-8">Leadership Team</h2>
        <p className="text-text mb-6">
          Available for interviews and commentary on travel industry trends.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Alex Chen",
              title: "CEO & Founder",
              bio: "Travel tech entrepreneur with 15+ years experience",
            },
            {
              name: "Maria Garcia",
              title: "Chief Operations Officer",
              bio: "Former hospitality executive",
            },
            {
              name: "James Wilson",
              title: "Chief Technology Officer",
              bio: "Software architect and AI specialist",
            },
            {
              name: "Sarah Johnson",
              title: "Chief Marketing Officer",
              bio: "Brand strategist and growth expert",
            },
          ].map((person, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-border text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-light flex items-center justify-center text-2xl font-bold text-primary">
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-lg font-semibold">{person.name}</h3>
              <p className="text-primary mb-2">{person.title}</p>
              <p className="text-sm text-text">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-light/10 rounded-xl p-8 m-8 text-center">
        <h2 className="text-2xl font-bold text-dark mb-2">Media Inquiries</h2>
        <p className="text-text mb-4">
          Email:{" "}
          <a
            href="mailto:press@hotelya.com"
            className="text-primary hover:underline"
          >
            press@hotelya.com
          </a>
        </p>
      </div>
    </main>
  );
}
