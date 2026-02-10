import "./App.css";
import { Routes, Route} from "react-router-dom";
import Layout from "./components/layout/Layout";

// import Splash from "./pages/login/Splash";
// import Login from "./pages/login/Login";
// import SignUp from "./pages/login/SignUp";
import Home from "./pages/home/HomePage";
import ConcertList from "./pages/home/ConcertList";
import ConcertDetail from "./pages/home/ConcertDetail";
// import MyNews from "./pages/alarm/MyNews";
// import Notices from "./pages/alarm/Notices";
import FindHall from "./pages/findHall/FindHall";
// import SerchHall from "./pages/findHall/SearchHall";
// import HallMap from "./pages/hallMap/HallMap";
import Mate from "./pages/mate/Mate";
// import MyPage from "./pages/myPage/MyPage";
import AddTicket from "./pages/reserve/AddTicket";
import Reserve from "./pages/reserve/ReserveList";
import AddDetail from "./pages/reserve/AddDetail";

function App() {
   if (import.meta.env.DEV) {
    localStorage.setItem("accessToken", "temp-dev-token");
  }
  return (
    <>
        <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/concert" element={<ConcertList />} />
          <Route path="/concert/:id" element={<ConcertDetail />} />
            <Route path="/find" element={<FindHall />} />
            {/* <Route path="/start" element={<Splash />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="/mynews" element={<MyNews />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/find" element={<FindHall />} />
          <Route path="/serch" element={<SerchHall />} />
          <Route path="/map" element={<HallMap />} />
          <Route path="/mypage" element={<MyPage />} /> */}
            <Route path="/mate" element={<Mate />} />
            <Route path="/add" element={<AddTicket />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/add-detail" element={<AddDetail />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
