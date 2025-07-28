import { useTranslations } from "next-intl";

function Testimonials() {
  const t = useTranslations("HomePage");

  const testimonials = [
    {
      name: t("Sarah Johnson"),
      review: t("amazing service"),
      rating: 5,
    },
    {
      name: t("Mike Chen"),
      review: t("best hotel booking platform I've used"),
      rating: 5,
    },
    {
      name: t("Emily Davis"),
      review: t("instant confirmation and competitive prices"),
      rating: 5,
    },
  ];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">
            {t("what our customers say")}
          </h2>
          <p className="text-lg text-text opacity-90">
            {t("join millions of satisfied travelers worldwide")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, review, rating }) => (
            <div
              key={name}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30"
            >
              <div className="flex flex-col items-center">
                {/* Avatar with initials */}
                <div className="w-20 h-20 mb-6 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                  {getInitials(name)}
                </div>

                {/* Review text */}
                <p className="italic text-text mb-5 text-center">{review}</p>

                {/* Star rating */}
                <div className="flex mb-4 text-xl">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`${
                        i < rating ? "text-secondary" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Name */}
                <p className="font-semibold text-text">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
