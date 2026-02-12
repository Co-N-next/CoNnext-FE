import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";

const FooterLayout = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex justify-center bg-[#0a0f1e]">
      <div className="w-full max-w-[450px] min-h-screen flex flex-col relative bg-[#0a0f1e]">
        
        {/* Header가 없습니다 */}
        
        {/* 자식 페이지(MateMap)가 그려질 공간 */}
        <main
          ref={mainRef}
          className="flex-1 w-full overflow-y-auto bg-[#0a0f1e] pb-20"
        >
          <Outlet />
        </main>

        {/* 푸터 */}
        <Footer />
      </div>
    </div>
  );
};

export default FooterLayout;
