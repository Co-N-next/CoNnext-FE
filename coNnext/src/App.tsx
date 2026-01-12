import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
/*
import Splash from "./pages/login/Splash";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import Home from "./pages/home/HomePage";
import LatestConcert from "./pages/home/LatestConcert";
import Mynews from "./pages/alarm/MyNews";
import Notices from "./pages/alarm/Notices";
import FindHall from "./pages/findHall/FindHall";
import SerchHall from "./pages/findHall/SearchHall";
import HallMap from "./pages/hallMap/HallMap";
import Mate from "./pages/mate/Mate";
import MyPage from "./pages/myPage/MyPage";
import Reserve from "./pages/reserve/ReserveList";*/
import AddTicket from "./pages/reserve/AddTicket";


function App() {
  return (
    <>
      <Routes>

          <Route element={<Layout />}>
          {/*}
          <Route path="/start" element={<Splash />} />
          <Route path="login" element={<Login/>}/>
          <Route path="signUp" element={<SignUp/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/concert" element={<LatestConcert/>}/>
          <Route path="/mynews" element={<Mynews/>}/>
          <Route path="/notices" element={<Notices/>}/>
          <Route path="/find" element={<FindHall />} />
          <Route path="/serch" element={<SerchHall/>}/>
          <Route path="/map" element={<HallMap/>}/>
          <Route path="/mate" element={<Mate/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/reserve" element={<Reserve/>}/>*/}
          <Route path="/add" element={<AddTicket/>}/>
     
          </Route>
      </Routes>
    </>
  );
}

export default App;