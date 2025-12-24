// export type Sport =
//   | "football"
//   | "mbb"
//   | "wbb"
//   | "baseball"
//   | "softball"
//   | "volleyball";

export type Sport =
  | "mbb"
  | "wbb";

export interface Event {
  id: string;
  sport: Sport;
  opponent: string;
  homeAway: "home" | "away" | "neutral";
  date: string;          // YYYY-MM-DD
  startTime: string;     // ISO string
  venue: string;
  city: string;
  tvNetwork: string | null;
  bigTicketRequired: boolean;
}
