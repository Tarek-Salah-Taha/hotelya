function Testimonials() {
  return (
    <section className="bg-background text-text py-12 px-4 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Sarah Johnson",
            review:
              "Amazing service! Found the perfect hotel in Paris at an unbeatable price.",
          },
          {
            name: "Mike Chen",
            review:
              "Best hotel booking platform I’ve used. Great deals and excellent customer support.",
          },
          {
            name: "Emily Davis",
            review:
              "Instant confirmation and competitive prices. Hotelya made my business trip easy.",
          },
        ].map(({ name, review }) => (
          <div key={name} className="bg-white p-6 shadow-md rounded">
            <p className="mb-2 italic">“{review}”</p>
            <p className="font-bold">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
