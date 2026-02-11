import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";

// import Splash from "./pages/login/Splash";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import Home from "./pages/home/HomePage";
import ConcertDetail from "./pages/home/ConcertDetail";
// import MyNews from "./pages/alarm/MyNews";
// import Notices from "./pages/alarm/Notices";
// import FindHall from "./pages/findHall/FindHall";
// import SerchHall from "./pages/findHall/SearchHall";
// import HallMap from "./pages/hallMap/HallMap";
import Mate from "./pages/mate/Mate";
import MateMap from "./pages/mate/MateMap";
import MyPage from "./pages/myPage/MyPage";
import AddTicket from "./pages/reserve/AddTicket";
import ReserveList from "./pages/reserve/ReserveList";
import AddDetail from "./pages/reserve/AddDetail";
import MoreInform from "./pages/reserve/components/MoreInform";
import MateMore from "./pages/mate/MateMore";

import FooterLayout from "./components/layout/FooterLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* <Route path="/start" element={<Splash />} /> */}
            <Route path="login" element={<Login />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="/" element={<Home />} />
             <Route path="/concert" element={<ConcertDetail />} />
            {/* <Route path="/mynews" element={<MyNews />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/find" element={<FindHall />} />
            <Route path="/serch" element={<SerchHall />} />
            <Route path="/map" element={<HallMap />} /> */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mate" element={<Mate />} />
            <Route path="/mate/more" element={<MateMore />} />
            <Route path="/add" element={<AddTicket />} />
            <Route path="/reserve" element={<ReserveList />} />
            <Route path="/more-info" element={<MoreInform />} />
            <Route path="/add-detail" element={<AddDetail />} />
          </Route>
          <Route element={<FooterLayout />}>
            <Route path="/mate/map" element={<MateMap />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
