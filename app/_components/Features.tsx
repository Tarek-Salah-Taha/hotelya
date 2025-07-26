function Features() {
  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            Why Choose <span className="text-primary">Hotelya</span>?
          </h2>
          <p className="text-lg text-text opacity-90 max-w-2xl mx-auto">
            Experience the best in hotel booking with our premium features
            designed for modern travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border hover:border-primary/30 group">
            <div className="text-3xl mb-4 text-primary">💰</div>
            <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
              Best Price Guarantee
            </h3>
            <p className="text-text opacity-80">
              We’ll match the price and give you an extra 10% off if you find
              the same hotel for less elsewhere.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border hover:border-primary/30 group">
            <div className="text-3xl mb-4 text-primary">⚡</div>
            <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
              Instant Confirmation
            </h3>
            <p className="text-text opacity-80">
              Get immediate booking confirmation and peace of mind for your
              travels with our real-time system.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border hover:border-primary/30 group">
            <div className="text-3xl mb-4 text-primary">📞</div>
            <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
              24/7 Global Support
            </h3>
            <p className="text-text opacity-80">
              Our dedicated support team is available around the clock to assist
              you wherever you are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
