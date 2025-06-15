function HotelOverview({ description }: { description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-text">
      <h2 className="text-2xl font-semibold mb-4">Overview</h2>
      <p className="text-lg text-gray-700">
        {description || "No description available for this hotel."}
      </p>
    </div>
  );
}

export default HotelOverview;
