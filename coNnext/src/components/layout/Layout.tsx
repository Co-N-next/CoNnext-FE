import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[450px] min-h-screen flex flex-col relative">
        <Header />

        <main className="flex-1 w-full overflow-y-auto pt-20 pb-24">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
