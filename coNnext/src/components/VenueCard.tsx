// type VenueCardProps = {
//   image: string;
//   title: string;
//   place: string;
//   isToday?: boolean;
//   isNew?: boolean;
// };
import type { VenueListItem } from "../types/venue.ts";
const VenueCard = ({ name, city, imageUrl, isToday, isNew }: VenueListItem) => {
  return (
    <div className="h-[204px] w-[150px] overflow-hidden rounded-xl border border-white/20 text-white">
      {/* ÀÌ¹ÌÁö */}
      <div className="relative h-[150px] w-[150px] overflow-hidden">
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

      <div className="h-[54px] px-2 py-1">
        <span className="block text-[10px] text-gray-300">{city}</span>
        <h3 className="truncate text-[16px] font-semibold">{name}</h3>
      </div>
    </div>
  );
};

export default VenueCard;
