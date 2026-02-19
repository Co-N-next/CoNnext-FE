import api from "./axios";
import type {
  GetSearchHistoryResponse,
  PostSearchHistoryRequest,
  SearchHistoryItem,
  SearchType,
} from "../types/searchHistory";

type HistoryResponse = Partial<GetSearchHistoryResponse> & {
  payload?: unknown;
  result?: unknown;
};

const normalizePayload = (
  raw: unknown,
  fallbackType: SearchType,
): SearchHistoryItem[] => {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item, index) => {
      if (typeof item === "string") {
        return {
          id: index + 1,
          keyword: item,
          searchType: fallbackType,
        } satisfies SearchHistoryItem;
      }

      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        const keyword = String(obj.keyword ?? "");
        if (!keyword) return null;

        return {
          id: Number(obj.id ?? index + 1),
          keyword,
          searchType:
            obj.searchType === "CONCERT" || obj.searchType === "VENUE"
              ? (obj.searchType as SearchType)
              : fallbackType,
        } satisfies SearchHistoryItem;
      }

      return null;
    })
    .filter((item): item is SearchHistoryItem => item !== null);
};

export const getSearchHistory = async (
  type: SearchType,
): Promise<GetSearchHistoryResponse> => {
  const { data } = await api.get<HistoryResponse>("/searchHistory", {
    params: { type },
  });

  const payload = normalizePayload(data.payload ?? [], type);

  return {
    statusCode: data.statusCode ?? 200,
    message: data.message ?? "OK",
    pageInfo: data.pageInfo ?? {
      page: 0,
      size: payload.length,
      hasNext: false,
      totalElements: payload.length,
      totalPages: 1,
    },
    payload,
  };
};

export const postSearchHistory = async (body: PostSearchHistoryRequest) => {
  const { data } = await api.post("/searchHistory", {
    keyword: body.keyword,
    searchType: body.searchType,
  });
  return data;
};

export const deleteSearchHistory = async (searchHistoryId: number) => {
  const { data } = await api.delete(`/searchHistory/${searchHistoryId}`);
  return data;
};

export const deleteAllSearchHistory = async (type: SearchType) => {
  const { data } = await api.delete("/searchHistory/all", {
    params: { type },
  });
  return data;
};
