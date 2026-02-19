// src/App.tsx
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/* 레이아웃 */
import Layout from "./components/layout/Layout";
import BareLayout from "./components/layout/BareLayout";
import FooterLayout from "./components/layout/FooterLayout";

/* 페이지 */
import Home from "./pages/home/HomePage";
import Onboarding from "./pages/onboarding/Onboarding";
import ConcertDetail from "./pages/home/ConcertDetail";
import FindHall from "./pages/findHall/FindHall";
import SearchHall from "./pages/findHall/SearchHall";
import HallMap from "./pages/hallMap/HallMap";
import AlarmIndex from "./pages/alarm/AlarmIndex";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import SocialSignUp from "./pages/login/SocialSignUp";
import Mate from "./pages/mate/Mate";
import MateMap from "./pages/mate/MateMap";
import MateMore from "./pages/mate/MateMore";
import MyPage from "./pages/myPage/MyPage";
import MyPageEdit from "./pages/myPage/MyPageEdit";
import MyPageNotification from "./pages/myPage/MyPageNotification";
import MyPageVisibility from "./pages/myPage/MyPageVisibility";
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
        {/* 기본 Layout (헤더+푸터) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/concert/:id" element={<ConcertDetail />} />
          <Route path="/find" element={<FindHall />} />
          <Route path="/map/:venueId" element={<HallMap />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mate" element={<Mate />} />
          <Route path="/mate/more" element={<MateMore />} />
          <Route path="/add" element={<AddTicket />} />
          <Route path="/reserve" element={<ReserveList />} />
          <Route path="/more-info" element={<MoreInform />} />
          <Route path="/add-detail" element={<AddDetail />} />
          <Route path="/alarm" element={<AlarmIndex />} />
        </Route>

        {/* BareLayout (헤더/푸터 없음) */}
        <Route element={<BareLayout />}>
          <Route path="/search" element={<SearchHall />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/terms" element={<SocialSignUp />} />
        </Route>

        {/* FooterLayout */}
        <Route element={<FooterLayout />}>
          <Route path="/mate/map" element={<MateMap />} />
          <Route path="/mate/detail" element={<MateDetail />} />
          <Route path="/mate/detail/:id" element={<MateDetail />} />
          <Route path="/mypage/edit" element={<MyPageEdit />} />
          <Route path="/mypage/notification" element={<MyPageNotification />} />
          <Route path="/mypage/visibility" element={<MyPageVisibility />} />
        </Route>

        {/* 온보딩 (단독) */}
        <Route path="/" element={<Onboarding />} />
      </Routes>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
