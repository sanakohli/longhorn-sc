import { fromZonedTime, toZonedTime, format } from "date-fns-tz";

export function formatCentralTime(startTime: string | null): string {
  if (!startTime) return "TBD";

  // 1️⃣ Interpret stored time as Eastern Time → UTC
  const utcDate = fromZonedTime(startTime, "America/New_York");

  // 2️⃣ Convert UTC → Central Time
  const centralDate = toZonedTime(utcDate, "America/Chicago");

  // 3️⃣ Format for display
  return format(centralDate, "h:mm a");
}
