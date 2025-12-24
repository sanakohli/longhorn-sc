import { fromZonedTime, toZonedTime, format } from "date-fns-tz";
import type { Event } from "../data/normalized/schema";

function toICSDate(date: Date) {
  return format(date, "yyyyMMdd'T'HHmmss");
}

export function generateEventICS(event: Event) {
  if (!event.startTime) return "";

  // Interpret stored time as Eastern
  const utcDate = fromZonedTime(event.startTime, "America/New_York");
  const centralDate = toZonedTime(utcDate, "America/Chicago");

  // Assume 2-hour game
  const endDate = new Date(centralDate.getTime() + 2 * 60 * 60 * 1000);

  const lines: string[] = [];

  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//Longhorn SportsCenter//EN");
  lines.push("CALSCALE:GREGORIAN");

  lines.push("BEGIN:VEVENT");
  lines.push(`UID:${event.id}@longhornsportscenter`);
  lines.push(`DTSTAMP:${toICSDate(new Date())}`);
  lines.push(`DTSTART:${toICSDate(centralDate)}`);
  lines.push(`DTEND:${toICSDate(endDate)}`);
  lines.push(
    `SUMMARY:Texas ${
      event.homeAway === "away" ? "@" : "vs"
    } ${event.opponent} (${event.sport.toUpperCase()})`
  );
  lines.push(`LOCATION:${event.venue}`);
  lines.push(
    `DESCRIPTION:TV: ${event.tvNetwork ?? "TBD"} | Big Ticket: ${
      event.bigTicketRequired ? "Yes" : "No"
    }`
  );
  lines.push("END:VEVENT");

  lines.push("END:VCALENDAR");

  return lines.join("\r\n");
}
