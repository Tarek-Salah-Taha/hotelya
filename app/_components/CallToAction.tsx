function CallToAction() {
  return (
    <section className="bg-primary text-white py-12 text-center px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Ready to Book Your Next Stay?
      </h2>
      <p className="mb-6">
        Join over 2 million travelers who trust Hotelya for their hotel
        reservations
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-white text-primary px-6 py-2 rounded">
          Start Searching
        </button>
        <button className="border border-white px-6 py-2 rounded">
          Download App
        </button>
      </div>
    </section>
  );
}

export default CallToAction;
