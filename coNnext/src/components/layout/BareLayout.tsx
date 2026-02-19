import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

const BareLayout: React.FC = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[450px] h-[100dvh] flex flex-col relative">
        <main
          key={`${location.pathname}${location.search}`}
          ref={mainRef}
          className="flex-1 min-h-0 w-full overflow-y-auto"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BareLayout;
