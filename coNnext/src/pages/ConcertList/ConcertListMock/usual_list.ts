export const getList = async () => {
  return {
    //커밋
    status: true,
    statusCode: 201,
    message: "요청이 성공했습니다.",
    data: [
      {
        id: 1,
        place: "서울특별시 송파구",
        title: "KSPO DOME",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
        isNew: true,
        date: new Date().toISOString().slice(0, 10),
      },
      {
        id: 2,
        place: "서울특별시 잠실",
        title: "잠실 주경기장",
        image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        isNew: true,
        date: "2026-01-10",
      },
      {
        id: 3,
        place: "서울특별시 구로구",
        title: "고척 스카이돔",
        image: "https://images.unsplash.com/photo-1505842465776-3d90f616310d",
        isNew: false,
        date: new Date().toISOString().slice(0, 10),
      },
      {
        id: 4,
        place: "서울특별시 용산구",
        title: "블루스퀘어",
        image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
        isNew: true,
        date: "2026-01-12",
      },
      {
        id: 5,
        place: "서울특별시 중구",
        title: "국립극장",
        image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
        isNew: false,
        date: "2026-01-13",
      },
    ],
  };
};
