import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  //커밋
  //검색어가 string이 아니라 number일수도 뭐가 올지도 몰라서 value 타입을 T로 둔다.
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  //value, delay가 변경될 때마다 실행
  useEffect(() => {
    console.log("⏱ 디바운스 시작:", value);

    // delay (ms) 후에 실행합니다.
    // delay 시간 후에 value를 debouncedValue로 업데이트하는 타이머를 시작합니다.
    // 값 변경 -> delay 만큼 기다림 -> 변화가 없으면 최종 업데이트
    //handler를 만든 이유는 useEffect 안에서 setTimeout을 직접 쓰면, 컴포넌트가 언마운트된 뒤에도 타이머가 실행될 수 있어서 이를 명확히 제어하고 cleanup 하기 위해서다.(용코딩 useeffect 설명참고)
    // const handler = setTimeout(() => setDebouncedValue(value), delay); //타이머 번호(id) 돌려줌
    const handler = setTimeout(() => {
      console.log("✅ 디바운스 적용됨:", value);
      setDebouncedValue(value);
    }, delay);
    // value가 변경되면, 기존 타이머를 지워서 업데이트를 취소합니다.
    // 값이 계속 바뀔 때마다 마지막에 멈춘 값만 업데이트 됩니다.
    // return () => clearTimeout(handler); // 아까만든 타이머 지움

    return () => {
      console.log("❌ 이전 타이머 취소");
      clearTimeout(handler);
    };
  }, [value, delay]);

  // 최종적으로 잠시 기다린 후의 값을 반환합니다

  return debouncedValue;
}

export default useDebounce;
