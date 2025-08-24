function getRatingLabel(rating: number, t: (key: string) => string): string {
  if (rating >= 8.5) return t("Excellent");
  if (rating >= 7.5) return t("Very Good");
  if (rating >= 6) return t("Good");
  if (rating < 6) return t("Average");
  return t("No Rating");
}

export default getRatingLabel;
