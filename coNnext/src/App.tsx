import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Splash from "./pages/login/Splash";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import SocialSignUp from "./pages/login/SocialSignUp";
import Home from "./pages/home/HomePage";
import Mate from "./pages/mate/Mate";
import MyPage from "./pages/myPage/MyPage";
import Reserve from "./pages/reserve/ReserveList";
import FindHall from "./pages/findHall/FindHall";

/*
import LatestConcert from "./pages/home/LatestConcert";
import Mynews from "./pages/alarm/MyNews";
import Notices from "./pages/alarm/Notices";

import SerchHall from "./pages/findHall/SearchHall";
import HallMap from "./pages/hallMap/HallMap";

import AddTicket from "./pages/reserve/AddTicket";*/


function App() {
   return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/socialsignup" element={<SocialSignUp />} />
        <Route path="/splash" element={<Splash />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mate" element={<Mate />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/findhall" element={<FindHall />} />
          </Route>
      </Routes>
  );
}

export default App;