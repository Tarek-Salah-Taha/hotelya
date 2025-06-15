function getRatingLabel(rating: number): string {
  if (rating >= 8.5) return "Excellent";
  if (rating >= 7.5) return "Very Good";
  if (rating >= 6) return "Good";
  if (rating < 6) return "Average";
  return "No Rating";
}

export default getRatingLabel;
