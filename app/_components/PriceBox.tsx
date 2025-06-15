function PriceBox({ price: number; oldPrice?: number }) {
  return (
    <div className="bg-accent p-4 rounded-xl shadow text-text">
      {oldPrice && (
        <p className="line-through text-sm text-gray-600">${oldPrice}</p>
      )}
      <p className="text-2xl font-bold text-primary">${price}</p>
      <p className="text-sm text-gray-700">Per night, taxes included</p>
      <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 w-full">
        Book Now
      </button>
    </div>
  );
}

export default PriceBox;
