import "./App.css";

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "./components/layout/Layout";

/* 🔽 페이지 imports */
import Home from "./pages/home/HomePage";
import FindHall from "./pages/findHall/FindHall";
import SearchHall from "./pages/findHall/SearchHall";
import MyNews from "./pages/alarm/MyNews";
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
        {/* ✅ 모든 페이지는 Layout 기준 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/*
          <Route path="/start" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/concert" element={<LatestConcert />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/map" element={<HallMap />} />
          <Route path="/mate" element={<Mate />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/reserve" element={<Reserve />} />
          */}

          <Route path="/find" element={<FindHall />} />
          <Route path="/search" element={<SearchHall />} />
          <Route path="/mynews" element={<MyNews />} />
          <Route path="/add" element={<AddTicket />} />
        </Route>
      </Routes>

      {/* 🔧 개발 환경에서만 React Query Devtools */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
