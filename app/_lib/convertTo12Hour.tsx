export function convertTo12Hour(
  time24: string,
  t: (key: string) => string
): string {
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const isPM = hour >= 12;

  hour = hour % 12;
  if (hour === 0) hour = 12;

  const period = isPM ? t("PM") : t("AM");

  return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
}
