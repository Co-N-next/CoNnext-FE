import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/common/Search";

import before from "../../assets/logo/before.svg";
import PopularVenueTicker from "../../components/PopularVenueTicker";
import { useVenuesearch } from "../../hooks/queries/useVenuesearch";
import {
  getSearchHistory,
  postSearchHistory,
  deleteSearchHistory,
  deleteAllSearchHistory,
} from "../../api/SearchHistory";
import VenueCard from "../../components/VenueCard";
import { useTrendingVenues } from "../../hooks/queries/useTrendingVenues";

type SearchKeyword = {
  id: number;
  keyword: string;
};

const SearchHall = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [recentKeywords, setRecentKeywords] = useState<SearchKeyword[]>([]);

  const refreshRecentKeywords = async () => {
    const res = await getSearchHistory("VENUE");
    setRecentKeywords(
      (res.payload ?? []).slice(0, 7).map((item) => ({
        id: item.id,
        keyword: item.keyword,
      })),
    );
  };

  const normalizedSearch = submittedSearch.trim();

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useVenuesearch({
    search: normalizedSearch,
  });

  const { data: trendingData, isLoading: isTrendingLoading } =
    useTrendingVenues();

  useEffect(() => {
    const fetchRecentKeywords = async () => {
      try {
        await refreshRecentKeywords();
      } catch (e) {
        console.error(e);
      }
    };

    fetchRecentKeywords();
  }, []);

  const results =
    searchData?.pages
      .flatMap((pageData) => pageData.payload ?? [])
      .filter(
        (item, index, arr) =>
          arr.findIndex((candidate) => candidate.id === item.id) === index,
      ) ?? [];

  const executeSearch = async (keywordFromClick?: string) => {
    const keyword = (keywordFromClick ?? search).trim();
    if (!keyword) return;

    setSearch(keyword);
    setSubmittedSearch(keyword);

    try {
      const exists = recentKeywords.some((item) => item.keyword === keyword);
      if (!exists) {
        await postSearchHistory({
          keyword,
          searchType: "VENUE",
        });
      }
      await refreshRecentKeywords();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveKeyword = async (id: number) => {
    try {
      await deleteSearchHistory(id);
      setRecentKeywords((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearAll = async () => {
    try {
      await deleteAllSearchHistory("VENUE");
      setRecentKeywords([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] px-4 py-6 text-white">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/find")}>
          <img src={before} alt="back" className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">공연장 찾기</h1>
      </div>

      <div className="mt-8">
        {isTrendingLoading ? (
          <p className="text-sm text-gray-400">인기 공연장 불러오는 중...</p>
        ) : (
          <PopularVenueTicker
            list={
              trendingData?.payload.map((venue) => ({
                id: venue.id,
                name: venue.name,
              })) ?? []
            }
          />
        )}
      </div>

      <div className="mb-4 mt-4 flex items-center gap-3">
        <Search
          value={search}
          onChange={(e) => {
            const next = e.target.value;
            setSearch(next);
            if (!next.trim()) setSubmittedSearch("");
          }}
          onSearch={() => {
            void executeSearch();
          }}
          placeholder="공연장을 검색해보세요"
        />
      </div>

      {search.trim() === "" && recentKeywords.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm text-gray-400">최근 검색</h2>
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-500 hover:text-gray-300"
            >
              전체 삭제
            </button>
          </div>

          <ul className="space-y-2">
            {recentKeywords.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <button
                  onClick={() => {
                    void executeSearch(item.keyword);
                  }}
                  className="text-left"
                >
                  {item.keyword}
                </button>
                <button
                  onClick={() => handleRemoveKeyword(item.id)}
                  className="text-gray-500 hover:text-white"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {normalizedSearch && (
        <section className="mt-6">
          <div className="grid grid-cols-2 gap-3">
            {isSearchLoading && (
              <p className="col-span-2 text-sm text-gray-400">검색 중...</p>
            )}

            {!isSearchLoading &&
              results.map((item) => (
                <div key={item.id} className="scale-[0.95]">
                  <VenueCard
                    id={item.id}
                    name={item.name}
                    city={item.city}
                    imageUrl={item.imageUrl}
                    isToday={true}
                    isNew={false}
                  />
                </div>
              ))}

            {!isSearchLoading && results.length === 0 && (
              <p className="col-span-2 text-sm text-gray-400">
                검색 결과가 없습니다.
              </p>
            )}
          </div>

          {hasNextPage && (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              className="mt-4 w-full rounded-lg bg-[#1B2540] py-2 text-sm disabled:opacity-60"
            >
              {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
            </button>
          )}
        </section>
      )}
    </div>
  );
};

export default SearchHall;
