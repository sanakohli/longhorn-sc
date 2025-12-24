# Longhorn SportsCenter

A minimal dashboard for tracking Texas Longhorns sporting events: built to make it easy to decide **which games to watch or attend** and quickly add them to your calendar.

Inspired by plaintext-style sports dashboards, this project prioritizes:
- clarity over clutter
- real schedules
- student usability (Big Ticket, timing, location)

---

## Features

### Unified Events Feed
- Aggregates major Texas Longhorns sports into one view
- Currently supports:
  - Men’s Basketball (MBB)
  - Women’s Basketball (WBB)
- Events include:
  - date & time (shown in Central Time)
  - venue
  - TV network
  - Big Ticket requirement

---

### Filtering
- **Sport**: multi-select (MBB, WBB)
- **Location**: multi-select (Home, Away, Neutral)
- **Time**: This Week or All games
- Filters combine intuitively (e.g. *Home + Away, This Week only*)

---

### Per-Game Calendar Export
- Click the calendar icon next to any game
- Downloads a single `.ics` calendar event
- Works with:
  - Google Calendar
  - Apple Calendar
  - Outlook
- Timezone-correct (Eastern → Central)
- No login or Google API required

---

### Clean, Readable UI
- Plaintext-inspired layout
- Keyboard & screen-reader friendly
- Designed for quick scanning on desktop or mobile

---

## Tech Stack

- **Frontend**: Next.js (App Router) + React
- **Styling**: Tailwind CSS
- **Data**: Sports-Reference CSV → normalized JSON
- **Calendar**: `.ics` generation (RFC 5545 compliant)
- **Icons**: lucide-react

