import { useState } from "react";
import { Search, UserPlus, Settings } from "lucide-react";
import jinah from "../../assets/images/jinah.svg";
interface Mate {
  id: string;
  name: string;
  imageUrl: string;
}

const Mate = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredMate: Mate = {
    id: "1",
    name: "권진아 콘서트",
    imageUrl: jinah,
  };

  const frequentMates: Mate[] = [
    {
      id: "2",
      name: "mate1",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
    },
    {
      id: "3",
      name: "mate2",
      imageUrl:
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=200&h=200&fit=crop",
    },
    {
      id: "4",
      name: "mate3",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    },
    {
      id: "5",
      name: "mate4",
      imageUrl:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop",
    },
  ];

  const allMates: Mate[] = [
    {
      id: "6",
      name: "mate1",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    {
      id: "7",
      name: "mate2",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
    },
    {
      id: "8",
      name: "mate3",
      imageUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop",
    },
    {
      id: "9",
      name: "mate4",
      imageUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    },
    {
      id: "10",
      name: "mate5",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    {
      id: "11",
      name: "mate6",
      imageUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
    },
    {
      id: "12",
      name: "mate7",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    },
    {
      id: "13",
      name: "mate8",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
    {
      id: "14",
      name: "mate9",
      imageUrl:
        "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=200&h=200&fit=crop",
    },
    {
      id: "15",
      name: "mate10",
      imageUrl:
        "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=200&h=200&fit=crop",
    },
    {
      id: "16",
      name: "mate11",
      imageUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    },
    {
      id: "17",
      name: "mate12",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E172A] text-white">
      <div className="max-w-2xl mx-auto pb-50">
        {/* Section 1: 메이트 헤더 및 추천 메이트 카드 */}
        <section className="p-[24px]">
          <h1 className="text-[25px] font-semibold mb-[20px]">메이트</h1>

          {/* 카드 컨테이너 */}
          <div className="w-[353px] h-[237px] bg-[#1E293B] rounded-[12px] flex items-center gap-[12px] p-[12px]">
            {/* 이미지 */}
            <img
              src={featuredMate.imageUrl}
              alt={featuredMate.name}
              className="w-[147px] h-[213px] object-cover rounded-[7px]"
            />

            {/* 텍스트 영역 */}
            <div className="flex-1 h-full flex flex-col justify-between py-[8px]">
              {/* 제목 */}
              <h2 className="text-[16px] font-semibold">{featuredMate.name}</h2>

              {/* 설명 텍스트 */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[#A1A1A1] text-[13px] font-medium leading-[1.4]">
                  공연을 예매한 메이트가
                </p>
                <p className="text-[#A1A1A1] text-[13px] font-medium leading-[1.4]">
                  없습니다.
                </p>
              </div>

              {/* 버튼 */}
              <button className="w-[168px] h-[40px] bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white text-[13px] font-medium rounded-[12px] transition">
                메이트 초대하기
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: 검색창 */}
        <section className="mt-4 p-[4px] gap-[4px]">
          <div className="relative">
            <input
              type="text"
              placeholder="메이트 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[369px] h-[44px] ml-[12px] bg-[#1E293B] text-white placeholder-[#7A7A7A] text-[13px] py-4 pl-5 pr-12 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#7F5AFF] hover:bg-indigo-700 p-2.5 rounded-lg transition">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button className="text-gray-400 hover:text-white transition">
              <UserPlus className="text-[#FEFEFE] w-6 h-6" />
            </button>
            <button className="text-gray-400 hover:text-white transition">
              <Settings className="text-[#FEFEFE] w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Section 3: 자주 찾는 메이트 */}
        <section className="px-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-6 h-6 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <h2 className="text-xl font-bold">자주 찾는 메이트</h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {frequentMates.map((mate) => (
              <div key={mate.id} className="flex flex-col items-center">
                <div className="w-[60px] h-[60px] bg-gray-700 rounded-2xl overflow-hidden mb-2">
                  <img
                    src={mate.imageUrl}
                    alt={mate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-400">{mate.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: 전체 메이트 */}
        <section className="px-6">
          <h2 className="text-xl font-bold mb-4">전체 메이트</h2>

          <div className="grid grid-cols-4 gap-4">
            {allMates.map((mate) => (
              <div key={mate.id} className="flex flex-col items-center">
                <div className="w-[60px] h-[60px] bg-gray-700 rounded-2xl overflow-hidden mb-2">
                  <img
                    src={mate.imageUrl}
                    alt={mate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-400">{mate.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mate;
