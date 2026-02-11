import { useState } from "react";
import SelectBar from "../../components/common/SelectBar";
import MyNews from "./MyNews";
import Notices from "./Notices";

export type AlarmTab = "mynews" | "notices";

export const TABS = [
  { key: "mynews", label: "내 알림" },
  { key: "notices", label: "공지사항" },
] as const;

export default function AlarmPage() {
  const [activeTab, setActiveTab] = useState<AlarmTab>("mynews");
  type TabKey = (typeof TABS)[number]["key"];

  return (
    // HomePage와 완전히 동일한 래퍼(Wrapper) 구성
    <div className="min-h-screen bg-[#0a0f1e] text-white flex justify-center">
      <div className="w-full max-w-[450px]">
        {/* SelectBar 위치와 배경색을 HomePage와 동일하게 */}
        <div className="mt-5">
          <SelectBar
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={(key) => setActiveTab(key as AlarmTab)}
            /* indicator */
            indicatorColor="#FFFFFF"
            indicatorWidth={100}
            indicatorHeight={3}
            indicatorRadius="0px" /* text color */
            activeTextColor="#FFFFFF"
            inactiveTextColor="#9CA3AF"
            /* typography (피그마 그대로) */
            fontFamily="Pretendard"
            fontSize="16px"
            fontWeight={600}
            lineHeight={1.3}
            letterSpacing="0.025em"
            /* spacing (여기만 따로 조절) */
            paddingY={11}
            paddingX={0}
          />
        </div>

        {/* HomePage에서 section에 준 px-4와 pt-6을 그대로 적용해서 
          탭을 눌렀을 때 콘텐츠가 시작되는 위치를 똑같이 맞춤
        */}
        <div className="px-4 pt-6">
          {activeTab === "mynews" && <MyNews />}
          {activeTab === "notices" && <Notices />}
        </div>
      </div>
    </div>
  );
}
