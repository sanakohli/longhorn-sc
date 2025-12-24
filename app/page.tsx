"use client";

import { useState } from "react";
import { events } from "./events";
import { formatCentralTime } from "./time";
import { generateEventICS } from "./calendar";
import { Calendar } from "lucide-react";

type Location = "home" | "away" | "neutral";
type Sport = "mbb" | "wbb";

function isThisWeek(dateStr: string) {
  const eventDate = new Date(dateStr);
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return eventDate >= startOfWeek && eventDate < endOfWeek;
}

function filterClass(active: boolean) {
  return active
    ? "ml-2 underline font-semibold text-[#AC4E00]"
    : "ml-2 text-gray-500 hover:text-[#AC4E00] transition-colors";
}

function downloadEvent(event: any) {
  const ics = generateEventICS(event);
  if (!ics) return;

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.id}.ics`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


export default function Home() {
  // 🔹 Multi-select sports
  const [sportFilter, setSportFilter] = useState<Set<Sport>>(
    new Set(["mbb", "wbb"])
  );

  // 🔹 Multi-select locations
  const [locationFilter, setLocationFilter] = useState<Set<Location>>(
    new Set(["home", "away", "neutral"])
  );

  const [weekFilter, setWeekFilter] = useState<"thisWeek" | "all">("thisWeek");

  function toggleSport(sport: Sport) {
    setSportFilter(prev => {
      const next = new Set(prev);
      if (next.has(sport)) {
        next.delete(sport);
      } else {
        next.add(sport);
      }
      return next;
    });
  }

  function toggleLocation(loc: Location) {
    setLocationFilter(prev => {
      const next = new Set(prev);
      if (next.has(loc)) {
        next.delete(loc);
      } else {
        next.add(loc);
      }
      return next;
    });
  }

  const filteredEvents = events.filter(event => {
    if (!sportFilter.has(event.sport)) return false;
    if (!locationFilter.has(event.homeAway)) return false;
    if (weekFilter === "thisWeek" && !isThisWeek(event.date)) return false;
    return true;
  });

  return (
    <main className="p-8 font-mono">
      <h1 className="text-2xl mb-4">Longhorn SportsCenter</h1>

      {/* Filters */}
      <div className="mb-6 space-x-8 text-sm">
        {/* Sport Filter (Multi-select) */}
        <span>
          Sport:
          <button
            onClick={() => setSportFilter(new Set(["mbb", "wbb"]))}
            className={filterClass(sportFilter.size === 2)}
          >
            All
          </button>
          <button
            onClick={() => toggleSport("mbb")}
            className={filterClass(sportFilter.has("mbb"))}
          >
            MBB
          </button>
          <button
            onClick={() => toggleSport("wbb")}
            className={filterClass(sportFilter.has("wbb"))}
          >
            WBB
          </button>
        </span>

        {/* Location Filter (Multi-select) */}
        <span>
          Location:
          <button
            onClick={() =>
              setLocationFilter(new Set(["home", "away", "neutral"]))
            }
            className={filterClass(locationFilter.size === 3)}
          >
            All
          </button>
          <button
            onClick={() => toggleLocation("home")}
            className={filterClass(locationFilter.has("home"))}
          >
            Home
          </button>
          <button
            onClick={() => toggleLocation("away")}
            className={filterClass(locationFilter.has("away"))}
          >
            Away
          </button>
          <button
            onClick={() => toggleLocation("neutral")}
            className={filterClass(locationFilter.has("neutral"))}
          >
            Neutral
          </button>
        </span>

        {/* Time Filter */}
        <span>
          Time:
          <button
            onClick={() => setWeekFilter("thisWeek")}
            className={filterClass(weekFilter === "thisWeek")}
          >
            This Week
          </button>
          <button
            onClick={() => setWeekFilter("all")}
            className={filterClass(weekFilter === "all")}
          >
            All
          </button>
        </span>
      </div>

      {/* Events */}
      {filteredEvents.map(event => (
        <div key={event.id} className="mb-4">
          <div className="font-semibold flex items-center gap-2">
            <span>
              {event.date} — Texas{" "}
              {event.homeAway === "home"
                ? "vs"
                : event.homeAway === "away"
                  ? "@"
                  : "vs"}{" "}
              {event.opponent}
            </span>

            {event.startTime && (
              <Calendar
                onClick={() => downloadEvent(event)}
                aria-label="Add game to calendar"
                role="button"
                className="w-4 h-4 shrink-0 cursor-pointer text-[#AC4E00] hover:opacity-80"
              />
            )}
          </div>

          <div className="text-sm">
            {event.sport.toUpperCase()} · {event.venue} ·{" "}
            {formatCentralTime(event.startTime)} CT
          </div>
          <div className="text-sm text-gray-600">
            TV: {event.tvNetwork ?? "N/A"} · Big Ticket:{" "}
            {event.bigTicketRequired ? "Yes" : "No"}
          </div>
        </div>
      ))}

      {filteredEvents.length === 0 && (
        <div className="text-sm text-gray-500 mt-6">
          No games match your filters.
        </div>
      )}
    </main>
  );
}
