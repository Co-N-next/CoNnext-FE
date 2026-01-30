type VenueCardProps = {
  image: string;
  title: string;
  place: string;
  isToday?: boolean;
  isNew?: boolean;
};
const VenueCard = ({ image, title, place, isToday, isNew }: VenueCardProps) => {
  return (
    <div className="border border-white/20 text-white rounded-xl w-full">
      {/* 이미지 */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl">
        <img src={image} alt={title} className="w-full h-full object-cover" />

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

      <span className="mt-2 ml-2 block text-[10px] text-gray-300">{place}</span>
      <h3 className="font-semibold text-[16px] mb-2 ml-2">{title}</h3>
    </div>
  );
};

export default VenueCard;
