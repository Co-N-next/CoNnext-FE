export const getList = async () => {
  return {
    status: true,
    statusCode: 201,
    message: "요청이 성공했습니다.",
    data: [
      {
        id: 1,
        place: "서울특별시 송파구",
        title: "KSPO DOME",
        image: "/list_mock_image/Gocheok Sky Dome.jpg", // ✅ public/assets 경로
        isNew: true,
        date: "2026-01-09", // TODAY
      },
      {
        id: 2,
        place: "서울특별시 잠실",
        title: "잠실 주경기장",
        image: "/list_mock_image/Gocheok Sky Dome.jpg", // ✅ public/assets 경로

        isNew: true,
        date: "2026-01-10",
      },
      {
        id: 3,
        place: "서울특별시 구로구",
        title: "고척 스카이돔",
        image: "/list_mock_image/Jamsil Olympic Stadium.jpg",
        isNew: false,
        date: "2026-01-11",
      },
      {
        id: 4,
        place: "서울특별시 용산구",
        title: "블루스퀘어",
        image: "/list_mock_image/KSPO DOME.jpg",
        isNew: true,
        date: "2026-01-12",
      },
      {
        id: 5,
        place: "서울특별시 중구",
        title: "국립극장",
        image: "/list_mock_image/Gocheok Sky Dome.jpg", // ✅ public/assets 경로
        isNew: false,
        date: "2026-01-13",
      },
      {
        id: 6,
        place: "서울특별시 종로구",
        title: "세종문화회관",
        image: "/list_mock_image/Jamsil Olympic Stadium.jpg",
        isNew: true,
        date: "2026-01-14", // TODAY
      },
      {
        id: 7,
        place: "서울특별시 마포구",
        title: "KT&G 상상마당",

        image: "/list_mock_image/KSPO DOME.jpg",
        isNew: false,
        date: "2026-01-15",
      },
      {
        id: 8,
        place: "서울특별시 강남구",
        title: "코엑스 오디토리움",

        image: "/list_mock_image/KSPO DOME.jpg",
        isNew: true,
        date: "2026-01-08",
      },
      {
        id: 9,
        place: "서울특별시 서초구",
        title: "예술의전당",

        image: "/list_mock_image/KSPO DOME.jpg",
        isNew: false,
        date: "2025-10-15",
      },
      {
        id: 10,
        place: "서울특별시 영등포구",
        title: "명화 라이브홀",
        image: "/list_mock_image/KSPO DOME.jpg",
        isNew: true,
        date: "2026-01-07", // TODAY
      },
    ],
  };
};
