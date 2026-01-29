import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
<<<<<<< HEAD
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[450px] min-h-screen flex flex-col relative">
        <Header />

        <main className="flex-1 w-full overflow-y-auto pt-20 pb-24">
          <Outlet />
=======
    <div className="min-h-screenflex justify-center">
      <div className="w-full max-w-[450px] min-h-screen flex flex-col relative">
        <Header />

        <main className="flex-1 w-full overflow-y-auto pt-20 pb-24 ">
         <Outlet />
>>>>>>> 90d9491d37fe15f2f04a1d515ee33d890d73a1f7
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
<<<<<<< HEAD
=======


>>>>>>> 90d9491d37fe15f2f04a1d515ee33d890d73a1f7
