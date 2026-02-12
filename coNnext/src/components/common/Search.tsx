import Searchlogo from "../../assets/Icons/search.svg";

interface SearchProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  onClick?: () => void;
  placeholder?: string;
}

const Search = ({
  value,
  onChange,
  readOnly = false,
  onClick,
  placeholder = "공연장을 검색해보세요",
}: SearchProps) => {
  return (
    <div className="relative w-full" onClick={readOnly ? onClick : undefined}>
      <input
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className="
          w-full h-10 rounded-md bg-[#1B2540]
          px-4 pr-10 text-sm text-white
          outline-none
          cursor-pointer
        "
      />

      {/* 아이콘 */}
      <div
        className="
          absolute right-1.5 top-1/2 -translate-y-1/2
          flex h-[30px] w-[30px] items-center justify-center
          rounded-md bg-[#745AFF]
          pointer-events-none
        "
      >
        <img src={Searchlogo} alt="검색" className="w-[24px] h-[24px]" />
      </div>
    </div>
  );
};

export default Search;