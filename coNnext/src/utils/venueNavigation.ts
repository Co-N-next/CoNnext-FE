import { searchVenues } from "../api/venueSearch";

const normalizeName = (name: string) => name.replace(/\s+/g, "").toLowerCase();

export const resolveVenueId = async (
  venueName?: string,
  fallbackVenueId?: number,
): Promise<number | null> => {
  if (typeof fallbackVenueId === "number") return fallbackVenueId;

  const query = venueName?.trim();
  if (!query) return null;

  try {
    const res = await searchVenues(query, 0);
    const venues = res.payload ?? [];
    if (venues.length === 0) return null;

    const normalizedQuery = normalizeName(query);
    const exact = venues.find((v) => normalizeName(v.name) === normalizedQuery);
    return exact?.id ?? venues[0].id ?? null;
  } catch {
    return null;
  }
};
