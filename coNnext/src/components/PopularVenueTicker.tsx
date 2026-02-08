import { useEffect, useState } from "react";

interface PopularVenue {
  id: number;
  name: string;
}

interface Props {
  list: PopularVenue[];
}

const ITEM_HEIGHT = 28;

const PopularVenueTicker = ({ list }: Props) => {
  const rollingList = [...list, ...list];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  // index 증가
  useEffect(() => {
    if (!list.length) return;

    const id = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(id);
  }, [list.length]);

  // transition 끝난 뒤 처리
  const handleTransitionEnd = () => {
    if (index === list.length) {
      setAnimate(false);
      setIndex(0);
    }
  };

  // index가 0으로 돌아온 직후 다시 애니메이션 켜기
  useEffect(() => {
    if (index === 0) {
      requestAnimationFrame(() => {
        setAnimate(true);
      });
    }
  }, [index]);

  if (!list.length) return null;

  return (
    <div className="h-[28px] overflow-hidden rounded-md bg-[#121833] px-3">
      <div
        onTransitionEnd={handleTransitionEnd}
        className={animate ? "transition-transform duration-400" : ""}
        style={{ transform: `translateY(-${index * ITEM_HEIGHT}px)` }}
      >
        {rollingList.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="h-[28px] flex items-center text-sm"
          >
            <span className="mr-2 text-[13px] font-medium leading-[130%] tracking-[-0.025em] ">
              인기{" "}
              <span className="text-[#CBBBFF] ml-2">
                {(i % list.length) + 1}
              </span>
            </span>
            <span className="truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularVenueTicker;
