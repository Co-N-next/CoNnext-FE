import api from "./axios";

export interface ConcertSchedule {
  detailId: number;
  startAt: string;
  round: number;
  runningTime: number;
}

export interface ConcertByIdPayload {
  id: number;
  name: string;
  posterImage: string;
  ageRating: string;
  noticeUrl: string;
  schedules: ConcertSchedule[];
}

export interface UpcomingConcert {
  concertId: number;
  detailId: number;
  concertName: string;
  posterImage: string;
  startAt: string;
  dday: string;
}

export interface TodayConcert {
  concertId: number;
  concertName: string;
  posterImage: string;
  startAt: string;
  round: number;
  runningTime: number;
  price: number;
}

export interface MyTodayConcert {
  reservationId: number;
  concertId: number;
  venueId?: number;
  concertName: string;
  posterImage: string;
  startAt: string;
  round: number;
  runningTime: number;
  price: number;
  artist: string;
  venue: string;
  floor?: number;
  section?: string;
  row?: string;
  seat?: number;
}

export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  pageInfo: PageInfo;
  payload: T;
}

export interface ConcertDetailPayload {
  concertId: number;
  name: string;
  posterImage: string;
  ageRating: string;
  noticeUrl: string;
  detailId: number;
  startAt: string;
  runningTime: number;
  intermission: number;
  round: number;
}

const dedupeBy = <T>(items: T[], getKey: (item: T) => string | number) => {
  const seen = new Set<string | number>();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const normalizeListPayload = <T>(payload: unknown): T[] => {
  if (Array.isArray(payload)) return payload as T[];
  if (
    payload &&
    typeof payload === "object" &&
    Array.isArray((payload as { payload?: unknown }).payload)
  ) {
    return (payload as { payload: T[] }).payload;
  }
  if (
    payload &&
    typeof payload === "object" &&
    Array.isArray((payload as { result?: unknown }).result)
  ) {
    return (payload as { result: T[] }).result;
  }
  return [];
};

const logUpcomingDuplicates = (items: UpcomingConcert[]) => {
  if (!import.meta.env.DEV) return;
  if (!Array.isArray(items) || items.length === 0) return;

  const byDetailKey = new Map<string, number>();
  const byConcertKey = new Map<number, number>();

  items.forEach((item) => {
    const detailKey = `${item.concertId}-${item.detailId}-${item.startAt}`;
    byDetailKey.set(detailKey, (byDetailKey.get(detailKey) ?? 0) + 1);
    byConcertKey.set(item.concertId, (byConcertKey.get(item.concertId) ?? 0) + 1);
  });

  const duplicatedDetails = [...byDetailKey.entries()]
    .filter(([, count]) => count > 1)
    .map(([key, count]) => ({ key, count }));
  const duplicatedConcerts = [...byConcertKey.entries()]
    .filter(([, count]) => count > 1)
    .map(([concertId, count]) => ({ concertId, count }));

  if (duplicatedDetails.length > 0 || duplicatedConcerts.length > 0) {
    console.group("[getUpcomingConcerts] duplicate diagnostics");
    console.log("raw payload length:", items.length);
    if (duplicatedDetails.length > 0) console.table(duplicatedDetails);
    if (duplicatedConcerts.length > 0) console.table(duplicatedConcerts);
    console.groupEnd();
  }
};

export const getUpcomingConcerts = async (page: number = 0, size: number = 20) => {
  const res = await api.get<ApiResponse<UpcomingConcert[]>>("/concerts/upcoming", {
    params: { page, size },
  });
  logUpcomingDuplicates(res.data.payload ?? []);

  const dedupedPayload = dedupeBy(
    res.data.payload ?? [],
    (item) => item.detailId ?? `${item.concertId}-${item.startAt}`,
  );

  return {
    ...res.data,
    pageInfo: {
      ...res.data.pageInfo,
      totalElements: dedupedPayload.length,
    },
    payload: dedupedPayload,
  };
};

export const getTodayConcerts = async () => {
  const res = await api.get<ApiResponse<TodayConcert[]>>("/concerts/today");
  const rawItems = normalizeListPayload<TodayConcert>(res.data.payload);

  const dedupedPayload = dedupeBy(
    rawItems,
    (item) => `${item.concertId}-${item.startAt}-${item.round}`,
  );

  return {
    ...res.data,
    pageInfo: {
      ...res.data.pageInfo,
      totalElements: dedupedPayload.length,
    },
    payload: dedupedPayload,
  };
};

export const getMyTodayConcerts = async (debug: boolean = false) => {
  const res = await api.get<ApiResponse<MyTodayConcert[]>>("/concerts/my-today", {
    params: { debug },
  });
  const rawItems = normalizeListPayload<MyTodayConcert>(res.data.payload);

  const dedupedPayload = dedupeBy(
    rawItems,
    (item) => item.reservationId ?? `${item.concertId}-${item.startAt}-${item.round}`,
  );

  return {
    ...res.data,
    pageInfo: {
      ...res.data.pageInfo,
      totalElements: dedupedPayload.length,
    },
    payload: dedupedPayload,
  };
};

export const getMyTodayConcertCount = async () => {
  const res = await api.get<ApiResponse<number>>("/concerts/my-today/count");
  return res.data;
};

export const getConcertDetailById = async (detailId: number | string) => {
  const res = await api.get<ApiResponse<ConcertDetailPayload>>(
    `/concerts/details/${detailId}`,
  );
  return res.data;
};

export const getConcertById = async (concertId: number | string) => {
  const res = await api.get<ApiResponse<ConcertByIdPayload>>(`/concerts/${concertId}`);
  return res.data;
};
