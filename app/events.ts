import type { Event } from "../data/normalized/schema";
import mbb from "../data/normalized/mbb.json";
import wbb from "../data/normalized/wbb.json";

export const events = [...mbb, ...wbb] as Event[];
