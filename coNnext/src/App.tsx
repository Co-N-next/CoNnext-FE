import "./App.css";

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AlarmIndex from "./pages/alarm/AlarmIndex";
import Layout from "./components/layout/Layout";
import BareLayout from "./components/layout/BareLayout";
/* 🔽 페이지 imports */
import Home from "./pages/home/HomePage";
import FindHall from "./pages/findHall/FindHall";
import SearchHall from "./pages/findHall/SearchHall";
import AddTicket from "./pages/reserve/AddTicket";

/*
import Splash from "./pages/login/Splash";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import LatestConcert from "./pages/home/LatestConcert";
import Notices from "./pages/alarm/Notices";
import HallMap from "./pages/hallMap/HallMap";
import Mate from "./pages/mate/Mate";
import MyPage from "./pages/myPage/MyPage";
import Reserve from "./pages/reserve/ReserveList";
*/

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* ✅ 기본 Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<FindHall />} />

          {/* 🔔 알림 영역 */}
          <Route path="/alarm" element={<AlarmIndex />} />

          <Route path="/add" element={<AddTicket />} />
        </Route>

        {/* ✅ search만 BareLayout */}
        <Route element={<BareLayout />}>
          <Route path="/search" element={<SearchHall />} />
        </Route>
      </Routes>

      {/* false로 하면 야자수는 개발모드에서만 보이고 배포에서는 안보임. */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
