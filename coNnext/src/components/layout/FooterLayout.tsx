import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const FooterLayout = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[450px] min-h-screen flex flex-col relative">
        
        {/* Header가 없습니다 */}
        
        {/* 자식 페이지(MateMap)가 그려질 공간 */}
        <main className="flex-1 w-full overflow-y-auto pb-20">
          <Outlet />
        </main>

        {/* 푸터 */}
        <Footer />
      </div>
    </div>
  );
};

export default FooterLayout;