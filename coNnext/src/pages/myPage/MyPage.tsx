// src/pages/myPage/MyPage.tsx
import React, { useEffect, useState } from "react";
import MyPageGuest from "./MyPageGuest";
import MyPageUser from "./MyPageUser";
import { logout as apiLogout } from "../../api/auth";

type User = {
  nickname: string;
  email: string;
  favoriteVenues: number;
  visitedConcerts: number;
  friendMates: number;
};

const MyPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * 로그인 여부 판단 기준: sessionStorage의 userEmail
     *
     * - 로그인/회원가입 성공 시 반드시 sessionStorage.setItem('userEmail', ...) 저장
     * - 로그아웃/탈퇴 시 sessionStorage.removeItem('userEmail') 제거
     * - /auth/terms/me 는 백엔드 500 에러로 신뢰 불가 → 사용 안 함
     * - reissueToken()은 비로그인 유저도 성공할 수 있어 판단 기준 부적합
     */
    const savedEmail = sessionStorage.getItem("userEmail");
    const savedNickname = sessionStorage.getItem("userNickname") ?? "";

    if (savedEmail) {
      setUser({
        nickname: savedNickname,
        email: savedEmail,
        favoriteVenues: 0,
        visitedConcerts: 0,
        friendMates: 0,
      });
      setIsLogin(true);
    } else {
      // userEmail 없음 = 비로그인 (온보딩에서 로그인 없이 시작한 경우 포함)
      setIsLogin(false);
      setUser(null);
    }

    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("userNickname");
      window.location.href = "/login";
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ background: "#0E172A" }}
      >
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full text-white pb-24 overflow-y-auto"
      style={{ background: "#0E172A" }}
    >
      <div className="p-6">
        <h1
          style={{
            fontFamily: "Pretendard",
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