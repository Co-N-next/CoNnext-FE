import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
<<<<<<< HEAD

// import Splash from "./pages/login/Splash";
// import Login from "./pages/login/Login";
// import SignUp from "./pages/login/SignUp";
// import Home from "./pages/home/HomePage";
// import LatestConcert from "./pages/home/LatestConcert";
// import MyNews from "./pages/alarm/MyNews";
// import Notices from "./pages/alarm/Notices";
// import FindHall from "./pages/findHall/FindHall";
// import SerchHall from "./pages/findHall/SearchHall";
// import HallMap from "./pages/hallMap/HallMap";
import Mate from "./pages/mate/Mate";
// import MyPage from "./pages/myPage/MyPage";
import AddTicket from "./pages/reserve/AddTicket";
import Reserve from "./pages/reserve/ReserveList";
import AddDetail from "./pages/reserve/AddDetail";
=======
/*
import Splash from "./pages/login/Splash";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import LatestConcert from "./pages/home/LatestConcert";
import Mynews from "./pages/alarm/MyNews";
import Notices from "./pages/alarm/Notices";
import FindHall from "./pages/findHall/FindHall";
import SerchHall from "./pages/findHall/SearchHall";
import HallMap from "./pages/hallMap/HallMap";
import Mate from "./pages/mate/Mate";
import MyPage from "./pages/myPage/MyPage";
import Reserve from "./pages/reserve/ReserveList";*/
import Home from "./pages/home/HomePage";
import AddTicket from "./pages/reserve/AddTicket";

>>>>>>> 90d9491d37fe15f2f04a1d515ee33d890d73a1f7

function App() {
  return (
    <>
<<<<<<< HEAD
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* <Route path="/start" element={<Splash />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/concert" element={<LatestConcert />} />
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
=======
      <Routes>

          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/*}
          <Route path="/start" element={<Splash />} />
          <Route path="login" element={<Login/>}/>
          <Route path="signUp" element={<SignUp/>}/
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
     
>>>>>>> 90d9491d37fe15f2f04a1d515ee33d890d73a1f7
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
