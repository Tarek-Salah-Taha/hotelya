function ReviewCard({ name: string; rating: number; comment: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm text-text">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-base">{name}</h4>
        <span className="text-primary font-bold">{rating.toFixed(1)}</span>
      </div>
      <p className="text-sm text-gray-700">{comment}</p>
    </div>
  );
}

export default ReviewCard;
