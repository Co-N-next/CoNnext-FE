import React, { useEffect, useState } from "react";
import MyPageGuest from "./MyPageGuest";
import MyPageUser from "./MyPageUser";
import api from "../../api/axios";

type User = {
  nickname: string;
  favoriteVenues: number;
  visitedConcerts: number;
  friendMates: number;
};

const MyPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const res = await api.get("/auth/terms/me");
        setUser(res.data);
        setIsLogin(true);
      } catch {
        setIsLogin(false);
        setUser(null);
      }
    };

    fetchMyInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  return (
    <div
      className="min-h-screen w-full text-white pb-24 overflow-y-auto"
      style={{ background: "#0E172A" }}
    >
      <div className="p-6">
        <h1
          style={{
            fontFamily: "PretendardSemiBold",
            fontWeight: 600,
            fontSize: "23px",
            lineHeight: "130%",
            letterSpacing: "-0.025em",
          }}
        >
          마이페이지
        </h1>
      </div>

      {isLogin && user ? (
        <MyPageUser user={user} onLogout={handleLogout} />
      ) : (
        <MyPageGuest />
      )}
    </div>
  );
};

export default MyPage;
