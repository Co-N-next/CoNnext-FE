import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/layout/Layout";

import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import Home from "./pages/home/HomePage";
import Onboarding from "./pages/onboarding/Onboarding";
import ConcertDetail from "./pages/home/ConcertDetail";
import ConcertList from "./pages/home/ConcertList";
import MyNews from "./pages/alarm/MyNews";
import Notices from "./pages/alarm/Notices";
import FindHall from "./pages/findHall/FindHall";
import SerchHall from "./pages/findHall/SearchHall";
import HallMap from "./pages/hallMap/HallMap";
import Mate from "./pages/mate/Mate";
import MateMap from "./pages/mate/MateMap";
import MateDetail from "./pages/mate/MateDetail";
import MyPage from "./pages/myPage/MyPage";
import AddTicket from "./pages/reserve/AddTicket";
import ReserveList from "./pages/reserve/ReserveList";
import AddDetail from "./pages/reserve/AddDetail";
import MoreInform from "./pages/reserve/components/MoreInform";
import MateMore from "./pages/mate/MateMore";

import FooterLayout from "./components/layout/FooterLayout";

// QueryClient 생성 및 캐싱 정책 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분 - 데이터가 fresh 상태로 유지되는 시간
      gcTime: 10 * 60 * 1000, // 10분 - 캐시에 데이터가 보관되는 시간 (구 cacheTime)
      refetchOnWindowFocus: false, // 창 포커스 시 자동 refetch 비활성화 (중복 요청 방지)
      retry: 1, // 실패 시 1번만 재시도
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            
            <Route path="login" element={<Login />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
             <Route path="/concert" element={<ConcertList />} />
             <Route path="/concert/:detailId" element={<ConcertDetail />} />
            <Route path="/mynews" element={<MyNews />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/find" element={<FindHall />} />
            <Route path="/search" element={<SerchHall />} />
            <Route path="/map/:venueId" element={<HallMap />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mate" element={<Mate />} />
            <Route path="/mate/more" element={<MateMore />} />
            <Route path="/mate/detail" element={<MateDetail />} />
            <Route path="/add" element={<AddTicket />} />
            <Route path="/reserve" element={<ReserveList />} />
            <Route path="/more-info" element={<MoreInform />} />
            <Route path="/add-detail" element={<AddDetail />} />
          </Route>
          
          <Route path="/" element={<Onboarding />} />
          <Route element={<FooterLayout />}>
            <Route path="/mate/map" element={<MateMap />} />
          </Route>

        </Routes>
      </BrowserRouter>
      {/* React Query Devtools - 개발 환경에서만 표시 */}
      <ReactQueryDevtools initialIsOpen={false} />
      
    </QueryClientProvider>
  );
}

export default App;
