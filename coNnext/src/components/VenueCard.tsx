// type VenueCardProps = {
//   image: string;
//   title: string;
//   place: string;
//   isToday?: boolean;
//   isNew?: boolean;
// };
import type { Venue } from "../types/venueSearch";

const VenueCard = ({ name, city, imageUrl, isToday, isNew }: Venue) => {
  return (
    <div className="border border-white/20 text-white rounded-xl w-full">
      {/* 이미지 */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />

        {isToday && (
          <span className="absolute top-3 left-2 bg-[#745AFF] text-white text-[10px] font-medium px-2 py-1 rounded-full">
            Today
          </span>
        )}

        {isNew && (
          <span className="absolute bottom-0 left-0 bg-[#414141] text-white text-xs font-medium px-3 py-1 rounded-tr-md">
            New
          </span>
        )}
      </div>

      <span className="mt-2 ml-2 block text-[10px] text-gray-300 truncate pr-2">{city}</span>
      <h3 className="font-semibold text-[16px] mb-2 ml-2 truncate pr-2">{name}</h3>
    </div>
  );
};

export default VenueCard;