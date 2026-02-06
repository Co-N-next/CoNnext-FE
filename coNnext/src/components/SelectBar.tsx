interface SelectBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SelectBar = ({ activeTab, onTabChange }: SelectBarProps) => {
  return (
    <div className="bg-[#0f1729] w-full">
      <div className="flex border-b border-gray-800 w-full">
        <button
          onClick={() => onTabChange("public")}
          className={`flex-1 py-4 text-center font-semibold transition ${
            activeTab === "public"
              ? "text-[#CBBBFF] border-b-4 border-[#CBBBFF] w-full"
              : "text-gray-500 w-full"
          }`}
        >
          공연장
        </button>
        <button
          onClick={() => onTabChange("pharmacy")}
          className={`flex-1 py-4 text-center font-semibold transition ${
            activeTab === "pharmacy"
              ? "text-[#CBBBFF] border-b-4 border-[#CBBBFF] w-full"
              : "text-gray-500 w-full"
          }`}
        >
          야구장
        </button>
      </div>
    </div>
  );
};

export default SelectBar;
