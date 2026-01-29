import type { Concert } from "../types/concert";

interface ConcertCardProps {
  concert: Concert;
  section: string;
}

const ConcertCard = ({ concert }: ConcertCardProps) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="flex gap-[27px] pr-[24px] pl-[24px] pt-2 pb-[24px]">
        <img
          src={concert.imageUrl}
          alt={concert.title}
          className="w-[103px] h-[144px] object-cover rounded-[10px] shrink-0"
        />
        <div className="flex-1 flex flex-col">
          <div>
            <h3 className="text-white font-semibold text-[16px] pb-0.5 leading-tight">
              {concert.title}
            </h3>
            <p className="text-gray-300 text-sm">{concert.subtitle}</p>
            <p className="text-white text-[16px] font-normal mb-1">
              {concert.artist}
            </p>
          </div>
          <div className="">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              {/* <Calendar className="w-4 h-4" /> */}
              <p className="pr-4 text-[13px]">일시</p>
              <span className="text-white text-[13px]">
                {concert.date} {concert.time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              {/* <MapPin className="w-4 h-4" /> */}
              <p className="pr-4 text-[13px]">장소</p>
              <span className="text-white text-[13px]">{concert.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              {/* <MapPin className="w-4 h-4" /> */}
              <p className="pr-4 text-[13px]">좌석</p>
              <span className="text-white text-[13px]">{concert.seat}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[24px] py-1 pb-4 space-y-[8px]">
        <button className="w-full bg-[#414141] hover:bg-gray-600 text-white p-[10px] rounded-[10px] font-medium text-[12px] transition">
          정보 더보기
        </button>
        <div className="flex gap-2">
          <button className="flex-1 bg-[#7F5AFF] hover:bg-indigo-700 text-white p-[10px] rounded-[10px] font-medium text-[12px] transition">
            메이트 찾기
          </button>
          <button className="flex-1 bg-[#7F5AFF] hover:bg-indigo-700 text-white p-[10px] rounded-[10px] font-medium text-[12px] transition">
            지도 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConcertCard;
