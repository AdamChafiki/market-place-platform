import { useRef } from "react";

type Direction = "left" | "right";

export function useScroll(cardSelector = ".announcement-card", gap = 16) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: Direction) => {
    if (!scrollRef.current) return;

    const card = scrollRef.current.querySelector(cardSelector) as HTMLElement;
    const cardWidth = card ? card.offsetWidth + gap : 266;

    const scrollTo =
      direction === "left"
        ? scrollRef.current.scrollLeft - cardWidth
        : scrollRef.current.scrollLeft + cardWidth;

    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return { scrollRef, scroll };
}
