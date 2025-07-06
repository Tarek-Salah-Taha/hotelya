function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      review:
        "Amazing service! Found the perfect hotel in Paris at an unbeatable price.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      review:
        "Best hotel booking platform I’ve used. Great deals and excellent customer support.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      review:
        "Instant confirmation and competitive prices. Hotelya made my business trip easy.",
      rating: 5,
    },
  ];

  // Helper to generate initials
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <section className="bg-background text-text py-12 px-4 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
        What Our Customers Say
      </h2>
      <p className="text-center mb-8">
        Join millions of satisfied travelers worldwide.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(({ name, review, rating }) => (
          <div
            key={name}
            className="bg-white p-6 shadow-md rounded-lg text-center flex flex-col items-center"
          >
            {/* Avatar with initials */}
            <div className="w-16 h-16 mb-4 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
              {getInitials(name)}
            </div>

            {/* Review text */}
            <p className="italic text-sm mb-3">“{review}”</p>

            {/* Star rating */}
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`h-4 w-4 inline-block ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Name */}
            <p className="font-semibold">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
