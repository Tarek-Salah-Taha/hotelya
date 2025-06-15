function Features() {
  return (
    <section className="bg-background text-text py-12 px-4 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Why Choose Hotelya?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded">
          <h3 className="text-lg font-bold text-primary mb-2">
            💰 Best Price Guarantee
          </h3>
          <p>
            We’ll match the price and give you an extra 10% off if you find the
            same hotel for less.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded">
          <h3 className="text-lg font-bold text-primary mb-2">
            ⚡ Instant Confirmation
          </h3>
          <p>
            Get immediate booking confirmation and peace of mind for your
            travels.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded">
          <h3 className="text-lg font-bold text-primary mb-2">
            📞 24/7 Support
          </h3>
          <p>
            Our dedicated support team is available around the clock to assist
            you.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
