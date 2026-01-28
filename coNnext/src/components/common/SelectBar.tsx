interface TabItem<T extends string = string> {
  key: T;
  label: string;
}

interface SelectBarProps<T extends string> {
  tabs: readonly TabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

const SelectBar = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: SelectBarProps<T>) => {
  return (
    <div className="bg-[#0f1729] w-full">
      <div className="flex border-b border-gray-800 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 py-4 text-center font-semibold transition ${
              activeTab === tab.key
                ? "text-[#CBBBFF] border-b-4 border-[#CBBBFF]"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectBar;
