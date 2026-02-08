import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, PlusCircle } from "lucide-react";
import jinah from "../../assets/images/jinah.svg";
import mate from "../../assets/images/mate.svg";
import star from "../../assets/Icons/star_on.svg";
import setting from "../../assets/Icons/Settings.svg";
import userplus from "../../assets/Icons/User Plus.svg";
import kakao from "../../assets/Variables/kakao.svg";

interface Mate {
  id: string;
  name: string;
  imageUrl: string;
}

const Mate = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFriendRequestOpen, setIsFriendRequestOpen] = useState(false);

  const featuredMate: Mate = {
    id: "1",
    name: "권진아 콘서트",
    imageUrl: jinah,
  };

  // 이 곳에 원하는 이미지 URL을 넣어주세요
  const MATE_IMAGE_URL = mate;

  const frequentMates: Mate[] = [
    {
      id: "2",
      name: "mate1",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "3",
      name: "mate2",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "4",
      name: "mate3",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "5",
      name: "mate4",
      imageUrl: MATE_IMAGE_URL,
    },
  ];

  const allMates: Mate[] = [
    {
      id: "6",
      name: "mate1",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "7",
      name: "mate2",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "8",
      name: "mate3",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "9",
      name: "mate4",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "10",
      name: "mate5",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "11",
      name: "mate6",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "12",
      name: "mate7",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "13",
      name: "mate8",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "14",
      name: "mate9",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "15",
      name: "mate10",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "16",
      name: "mate11",
      imageUrl: MATE_IMAGE_URL,
    },
    {
      id: "17",
      name: "mate12",
      imageUrl: MATE_IMAGE_URL,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E172A] text-white">
      <div className="max-w-2xl mx-auto pb-50">
        {/* Section 1: 메이트 헤더 및 추천 메이트 카드 */}
        <section className="p-[16px]">
          <h1 className="text-[25px] font-semibold mb-[20px]">메이트</h1>

          {/* 카드 컨테이너 */}
          <div className="w-[353px] h-[237px] bg-[#1E293B] rounded-[12px] flex items-center gap-[12px] p-[12px] mr-[10\">
            {/* 이미지 */}
            <img
              src={featuredMate.imageUrl}
              alt={featuredMate.name}
              className="w-[147px] h-[213px] object-cover rounded-[7px]"
            />

            {/* 텍스트 영역 */}
            <div className="flex-1 h-full flex flex-col justify-between py-[8px]">
              {/* 제목 */}
              <div className="flex justify-between">
                <p className="text-[16px] font-semibold">{featuredMate.name}</p>
                <div 
                  className="flex items-center gap-0.5 cursor-pointer hover:opacity-80 transition"
                  onClick={() => navigate("/mate/more")}
                >
                  <p className="text-[#A1A1A1] text-[13px] font-medium leading-[1.4]">더보기</p>
                  <ChevronRight size={14} className="text-[#A1A1A1]" />
                </div>
              </div>

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
              <button
                onClick={() => navigate("/mate/map")}
                className="w-[168px] h-[40px] bg-[#7F5AFF] hover:bg-[#6B4DE6] text-white text-[13px] font-medium rounded-[12px] transition"
              >
                메이트 위치보기
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

          <div className="flex justify-end gap-2.5 mt-4 px-2">

              <button 
                className="text-gray-400 hover:text-white transition"
                onClick={() => setIsFriendRequestOpen(!isFriendRequestOpen)}
              >
                <img src={userplus} alt="" className="w-[24px] h-[24px]"/>
              </button>

              {/* Friend Request Popup */}
              {isFriendRequestOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 w-[220px] bg-[#2E364A] rounded-[16px] shadow-xl overflow-hidden z-50 border border-[#364057]">
                  <button className="w-full flex items-center justify-between px-[20px] py-[16px] hover:bg-[#364057] transition group">
                    <span className="text-[15px] font-medium text-white group-hover:text-white/90">카카오톡으로 친구 신청</span>
                    <div className="rounded-full p-1">
                      <img src={kakao} alt="" className="text-white w-[24px] h-[24px]"/>
                    </div>
                  </button>
                  <div className="h-[1px] bg-[#3B455D] mx-[20px]"></div>
                  <button className="w-full flex items-center justify-between px-[20px] py-[16px] hover:bg-[#364057] transition group">
                    <span className="text-[15px] font-medium text-white group-hover:text-white/90">닉네임으로 친구 신청</span>
                    <PlusCircle className="w-6 h-6 text-white" />
                  </button>
                </div>
              )}
              <button className="text-gray-400 hover:text-white transition">
                <img src={setting} alt="" className="w-[24px] h-[24px]"/>
              </button>

            
          </div>
        </section>

        {/* Section 3: 자주 찾는 메이트 */}
        <section className="px-3 mb-[24px]">
          <div className="flex items-center gap-1 mb-4">
           <img src={star} alt="" className="w-[20px] h-[20px]"/>
            <h2 className="text-[18px] font-bold">자주 찾는 메이트</h2>
          </div>
          <div className="bg-[#252D3F] rounded-[12px] p-[12px] pt-[16px]">
            <div className="grid grid-cols-4 gap-[32px]">
            {frequentMates.map((mate) => (
              <div key={mate.id} className="flex flex-col items-center">
                <div className="w-[60px] h-[60px] bg-gray-700 rounded-full overflow-hidden mb-1">
                  <img
                    src={mate.imageUrl}
                    alt={mate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[12px] text-[#F2EFFF]">{mate.name}</span>
              </div>
            ))}
          </div>
          </div>
          
        </section>

        {/* Section 4: 전체 메이트 */}
        <section className="">
          <h2 className="text-[18px] font-bold mb-4 px-4">전체 메이트</h2>
          <div className="bg-[#252D3F] p-[8px] pt-[12px] m-[12px] rounded-[12px]">
            <div className="grid grid-cols-4 gap-4">
            {allMates.map((mate) => (
              <div key={mate.id} className="flex flex-col items-center">
                <div className="w-[60px] h-[60px] bg-gray-700 rounded-full overflow-hidden mb-1">
                  <img
                    src={mate.imageUrl}
                    alt={mate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[12px] text-[#F2EFFF]">{mate.name}</span>
              </div>
            ))}
          </div>
          </div>
          
        </section>
      </div>
    </div>
  );
};

export default Mate;
