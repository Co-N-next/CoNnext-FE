interface TabItem<T extends string = string> {
  key: T;
  label: string;
}

interface SelectBarProps<T extends string> {
  tabs: readonly TabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;

  /** indicator 옵션 */
  indicatorColor?: string;
  indicatorWidth?: number;
  indicatorHeight?: number;
  indicatorRadius?: string;

  /** text 색상 */
  activeTextColor?: string;
  inactiveTextColor?: string;

  /** typography 옵션 */
  fontFamily?: string; // ⭐ [추가]
  fontSize?: string; // 기존
  fontWeight?: number; // 기존
  lineHeight?: number; // ⭐ [추가] (1.3)
  letterSpacing?: string; // ⭐ [추가] ("0.025em")

  /** spacing 옵션 */
  paddingY?: number; // 기존
  paddingX?: number; // 기존
}

const SelectBar = <T extends string>({
  tabs,
  activeTab,
  onTabChange,

  indicatorColor = "#CBBBFF",
  indicatorWidth,
  indicatorHeight = 4,
  indicatorRadius = "9999px",

  activeTextColor = "#CBBBFF",
  inactiveTextColor = "#6B7280",

  fontFamily = "Pretendard", // ⭐ 기본 폰트
  fontSize = "14px",
  fontWeight = 600,
  lineHeight = 1.3, // ⭐
  letterSpacing = "0em", // ⭐ 기존은 자간 없음

  paddingY = 16,
  paddingX = 0,
}: SelectBarProps<T>) => {
  return (
    <div className="bg-[#0f1729] w-full">
      <div className="flex border-b border-gray-800 w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className="relative flex-1 text-center transition-colors duration-200"
              style={{
                color: isActive ? activeTextColor : inactiveTextColor,

                /* typography */
                fontFamily, // ⭐
                fontSize,
                fontWeight,
                lineHeight, // ⭐
                letterSpacing, // ⭐

                /* spacing */
                paddingTop: paddingY,
                paddingBottom: paddingY,
                paddingLeft: paddingX,
                paddingRight: paddingX,
              }}
            >
              {tab.label}

              {isActive && (
                <div
                  className="absolute bottom-0 transition-all duration-200"
                  style={{
                    backgroundColor: indicatorColor,
                    width: indicatorWidth ? `${indicatorWidth}px` : "100%",
                    height: `${indicatorHeight}px`,
                    borderRadius: indicatorRadius,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectBar;