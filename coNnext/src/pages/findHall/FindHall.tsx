import { useNavigate } from "react-router-dom";

export default function FindHall() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-lg font-semibold mb-2">공연장 정보</h1>
      <p className="text-sm text-gray-400 mb-4">공연장 상세 페이지</p>
      <button
        onClick={() => navigate(-1)}
        className="rounded-full bg-[#8B7CFF] px-4 py-2 text-sm font-medium text-white"
      >
        이전으로
      </button>
    </div>
  );
}
