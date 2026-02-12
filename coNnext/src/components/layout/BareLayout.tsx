import React from "react";
import { Outlet } from "react-router-dom";

const BareLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[450px] min-h-screen flex flex-col relative">
        <main className="flex-1 w-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BareLayout;
