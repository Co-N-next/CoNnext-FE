import { Search } from "lucide-react"; // 돋보기 아이콘

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
  onSearch,
  className = "",
}: SearchBarProps) => {
  // 엔터 키를 눌렀을 때 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* 돋보기 아이콘 */}
      <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 p-2.5 rounded-lg transition">
        <Search className="w-5 h-5" />
      </button>

      {/* 입력창 (검색용이므로 input type="text" 권장) */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full h-[44px] bg-[#1E293B] border border-gray-700 rounded-[10px] pl-10 pr-4 text-white text-[13px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default SearchBar;
