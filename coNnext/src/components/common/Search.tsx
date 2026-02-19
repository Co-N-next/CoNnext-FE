import type { ChangeEvent, KeyboardEvent } from "react";
import Searchlogo from "../../assets/Icons/search.svg";

interface SearchProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  onClick?: () => void;
  onSearch?: () => void;
  placeholder?: string;
}

const Search = ({
  value,
  onChange,
  readOnly = false,
  onClick,
  onSearch,
  placeholder = "공연장을 검색해보세요",
}: SearchProps) => {
  const handleSearch = () => {
    if (readOnly) {
      onClick?.();
      return;
    }
    onSearch?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative w-full" onClick={readOnly ? onClick : undefined}>
      <input
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        placeholder={placeholder}
        className="w-full h-10 rounded-md bg-[#1B2540] px-4 pr-10 text-sm text-white outline-none cursor-text"
      />

      <button
        type="button"
        onClick={handleSearch}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-[#745AFF]"
      >
        <img src={Searchlogo} alt="검색" className="h-[24px] w-[24px]" />
      </button>
    </div>
  );
};

export default Search;
