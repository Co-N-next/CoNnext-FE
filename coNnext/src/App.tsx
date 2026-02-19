import "./App.css";

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/* 🔽 레이아웃 */
import Layout from "./components/layout/Layout";
import BareLayout from "./components/layout/BareLayout";
import FooterLayout from "./components/layout/FooterLayout";

/* 🔽 페이지 imports */
import Home from "./pages/home/HomePage";
import Onboarding from "./pages/onboarding/Onboarding"; // HEAD에는 있었으나 사용되지 않을 수 있음, 일단 유지
import ConcertDetail from "./pages/home/ConcertDetail";
import FindHall from "./pages/findHall/FindHall";
import SearchHall from "./pages/findHall/SearchHall";
import HallMap from "./pages/hallMap/HallMap";
import AlarmIndex from "./pages/alarm/AlarmIndex";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import Mate from "./pages/mate/Mate";
import MateMap from "./pages/mate/MateMap";
import MateMore from "./pages/mate/MateMore";
import MyPage from "./pages/myPage/MyPage";
import AddTicket from "./pages/reserve/AddTicket";
import ReserveList from "./pages/reserve/ReserveList";
import AddDetail from "./pages/reserve/AddDetail";
import MoreInform from "./pages/reserve/components/MoreInform";
import MateDetail from "./pages/mate/MateDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Routes>
          {/* 🔥 기본 Layout */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/concert/:id" element={<ConcertDetail />} />
            <Route path="/find" element={<FindHall />} />
            <Route path="/map/:venueId" element={<HallMap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mate" element={<Mate />} />
            <Route path="/mate/more" element={<MateMore />} />
            <Route path="/add" element={<AddTicket />} />
            <Route path="/reserve" element={<ReserveList />} />
            <Route path="/more-info" element={<MoreInform />} />
            <Route path="/add-detail" element={<AddDetail />} />
            <Route path="/alarm" element={<AlarmIndex />} />
          </Route>

          {/* 🔍 Search는 BareLayout */}
          <Route element={<BareLayout />}>
            <Route path="/search" element={<SearchHall />} />
          </Route>

          {/* 🗺 FooterLayout */}
          <Route element={<FooterLayout />}>
            <Route path="/mate/map" element={<MateMap />} />
            <Route path="/mate/detail/:id" element={<MateDetail />} />
          </Route>

          {/* 🌱 온보딩은 단독 */}
          <Route path="/" element={<Onboarding />} />
        </Routes>

        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;