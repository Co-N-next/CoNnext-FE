import { useEffect, useState } from "react";

/**
 * 입력값 변경을 지연시키는 debounce 훅
 * @param value - debounce를 적용할 값
 * @param delay - 지연 시간 (밀리초)
 * @returns debounced된 값
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 값이 변경되면 타이머 설정
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup: 이전 타이머 제거
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
