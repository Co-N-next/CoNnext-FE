import backButton from "../../assets/logo/BackButton.svg";
import { IoCheckmark } from "react-icons/io5";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

import { useGetList } from "../../hooks/queries/useGetList";
import useDebounce from "../../hooks/queries/useDebounce";
import VenueCard from "../../components/VenueCard";

const MAX_RECENT = 7;
const RECENT_KEYS = [
  "최근 검색어1",
  "최근 검색어2",
  "최근 검색어3",
  "최근 검색어4",
  "최근 검색어5",
  "최근 검색어6",
];

const SearchHall = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

  // ⭐ 변경: 정렬 상태 추가
  const [sort, setSort] = useState<"accuracy" | "latest">("accuracy");
  //이건 정렬을 하기 위해서가 아니라 지금 유저가 어떤 정렬을 선택했는지 기억하기 위해서 필요해.

  const debouncedValue = useDebounce(search, 1000);

  const { data = [] } = useGetList({
    search: debouncedValue,
  });

  const MockData = {
    status: true,
    statusCode: 200,
    message: "요청 성공",
    data: {
      popularVenue: {
        id: 1,
        title: "KSPO DOME",
      },
      searchResult: {
        keyword: "핸드볼 경기장",
        totalCount: 112,
        sort: "latest",
        items: [
          {
            id: 1,
            title: "KSPO DOME",
            place: "서울특별시 송파구",
            image:
              "https://images.unsplash.com/photo-1506157786151-b8491531f063",
            isNew: true,
            date: "2026-01-13",
          },
          {
            id: 2,
            title: "잠실 주경기장",
            place: "서울특별시 송파구",
            image:
              "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            isNew: false,
            date: "2026-01-10",
          },
        ],
      },
    },
  };

  /* 최근 검색어 초기 로딩 */
  useEffect(() => {
    const keywords = RECENT_KEYS.map((key) => localStorage.getItem(key)).filter(
      Boolean,
    ) as string[];

    setRecentKeywords(keywords.slice(0, MAX_RECENT));
  }, []);

  /* 최근 검색어 저장 */
  useEffect(() => {
    if (!debouncedValue.trim()) return;

    const filtered = recentKeywords.filter((k) => k !== debouncedValue);
    const next = [debouncedValue, ...filtered].slice(0, MAX_RECENT);

    RECENT_KEYS.forEach((key) => localStorage.removeItem(key));
    next.forEach((keyword, index) => {
      localStorage.setItem(`최근 검색어${index + 1}`, keyword);
    });

    setRecentKeywords(next);
  }, [debouncedValue]);

  /* 개별 삭제 */
  const handleRemoveKeyword = (target: string) => {
    const filtered = recentKeywords.filter((k) => k !== target);

    RECENT_KEYS.forEach((key) => localStorage.removeItem(key));
    filtered.forEach((keyword, index) => {
      localStorage.setItem(`최근 검색어${index + 1}`, keyword);
    });

    setRecentKeywords(filtered);
  };

  /* 전체 삭제 */
  const handleClearAll = () => {
    RECENT_KEYS.forEach((key) => localStorage.removeItem(key));
    setRecentKeywords([]);
  };

  // ⭐ 변경: 정렬된 데이터 (UI용 가짜 정렬)
  const sortedData = [...data].sort((a: any, b: any) => {
    if (sort === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0; // 정확도순 = 서버에서 내려준 순서 유지
  });

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white px-4 py-6">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center"
      >
        <div className="flex items-center gap-3 py-4 px-1 justify-between">
          <img src={backButton} alt="back" width={8} height={8} />
          <h1 className="font-pretendard text-[18px] font-semibold">
            공연장 찾기
          </h1>
        </div>
      </button>
      <div
        className="
    px-4 pt-6 pb-2 flex items-center gap-2
    font-pretendard text-[13px] font-medium leading-[120%]
  "
      >
        인기
        {/* 1만 다르게 */}
        <span className="px-1  text-[#CBBBFF]  text-[12px] font-semibold">
          1
        </span>
        {MockData.data.popularVenue.title}
      </div>

      {/* 검색 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="공연장, 홀, 시설 검색"
            className="h-[56px] w-full rounded-xl bg-[#1F2A3A]
                       pl-5 pr-14 outline-none"
          />
          <IoSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 최근 검색어 */}
      {search === "" && recentKeywords.length > 0 && (
        <section className="px-4">
          <div className="mb-8 flex items-center justify-between text-[13px] text-gray-400">
            <span>최근 검색</span>
            <button onClick={handleClearAll}>전체 삭제</button>
          </div>

          <ul className="space-y-2">
            {recentKeywords.map((keyword) => (
              <li key={keyword} className="flex items-center justify-between">
                <span className="text-[16px]">{keyword}</span>
                <button onClick={() => handleRemoveKeyword(keyword)}>✕</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 검색 결과 */}
      {search && (
        <section className="mt-6 space-y-4">
          {/* ⭐ 변경: 정렬 버튼 UI */}
          <div className="flex justify-between w-full">
            <span>검색결과 {MockData.data.searchResult.totalCount}건</span>

            <div className="flex items-center gap-4">
              {/* 최신순 */}
              <button
                onClick={() => setSort("latest")}
                className={`flex items-center gap-1 text-sm ${
                  sort === "latest" ? "text-white font-medium" : "text-gray-400"
                }`}
              >
                {sort === "latest" && <IoCheckmark size={14} />}
                최신순
              </button>

              {/* 정확도순 */}
              <button
                onClick={() => setSort("accuracy")}
                className={`flex items-center gap-1 text-sm ${
                  sort === "accuracy"
                    ? "text-white font-medium"
                    : "text-gray-400"
                }`}
              >
                {sort === "accuracy" && <IoCheckmark size={14} />}
                정확도순
              </button>
            </div>
          </div>

          <div className="px-2">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 justify-items-center scrollbar-transparent">
              {sortedData.map((item: any) => (
                <VenueCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  place={item.place}
                  isToday={false}
                  isNew={item.isNew}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchHall;
