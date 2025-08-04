import { useTranslations } from "next-intl";

export default function PressPage() {
  const t = useTranslations("PressPage");

  const pressReleases = [
    {
      title: t("Hotelya Raises $20M Series B to Expand Global Hotel Network"),
      date: t("May 15, 2025"),
      source: t("TechCrunch"),
    },
    {
      title: t("Hotelya Named One of Fastest Growing Travel Startups"),
      date: t("March 2, 2024"),
      source: t("Forbes"),
    },
    {
      title: t("How Hotelya is Changing the Way We Book Hotels"),
      date: t("January 10, 2023"),
      source: t("Travel Weekly"),
    },
  ];

  const mediaCoverage = [
    {
      title: t("The Future of Travel Tech: Interview with Hotelya CEO"),
      source: t("Bloomberg"),
      date: t("April 5, 2024"),
    },
    {
      title: t("Hotelya's Innovative Approach to Hotel Booking"),
      source: t("Skift"),
      date: t("February 18, 2023"),
    },
    {
      title: t("Why Travelers Are Switching to Hotelya"),
      source: t("Condé Nast Traveler"),
      date: t("December 5, 2022"),
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">
          {t("Press & Media")}
        </h1>
        <p className="text-xl text-text max-w-3xl mx-auto">
          {t(
            "For media inquiries, interviews, or partnerships, please contact our press team"
          )}
        </p>
      </div>

      {/* Press Contact */}

      {/* Press Releases */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-dark mb-8">
          {t("Press Releases")}
        </h2>
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
        <h2 className="text-3xl font-bold text-dark mb-8">
          {t("Media Coverage")}
        </h2>
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
        <h2 className="text-3xl font-bold text-dark mb-8">
          {t("Leadership Team")}
        </h2>
        <p className="text-text mb-6">
          {t(
            "Available for interviews and commentary on travel industry trends"
          )}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Alex Chen",
              title: t("CEO & Founder"),
              bio: t("Travel tech entrepreneur with 15+ years experience"),
            },
            {
              name: "Maria Garcia",
              title: t("Chief Operations Officer"),
              bio: t("Former hospitality executive"),
            },
            {
              name: "James Wilson",
              title: t("Chief Technology Officer"),
              bio: t("Software architect and AI specialist"),
            },
            {
              name: "Sarah Johnson",
              title: t("Chief Marketing Officer"),
              bio: t("Brand strategist and growth expert"),
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
        <h2 className="text-2xl font-bold text-dark mb-2">
          {t("Media Inquiries")}
        </h2>
        <p className="text-text mb-4">
          {t("Email")}{" "}
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
