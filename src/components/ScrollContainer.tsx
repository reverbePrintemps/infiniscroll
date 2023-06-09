import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

import "../styles/ScrollContainer.css";

type ScrollContainerProps = {
  children: ReactNode;
  style?: CSSProperties;
  onIsReachingBottom: (bool: boolean) => void;
};

export const ScrollContainer = ({
  style,
  children,
  onIsReachingBottom,
}: ScrollContainerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [bottomOfScrollPosition, setBottomOfScrollPosition] = useState(
    windowHeight + window.scrollY
  );
  const [bottomOfContent, setBottomOfContent] = useState<number>();
  const [isReachingBottom, setIsReachingBottom] = useState(false);

  useEffect(() => {
    if (bottomOfContent) {
      setIsReachingBottom(
        bottomOfScrollPosition >= bottomOfContent - windowHeight / 2
      );
    }
  }, [bottomOfContent, bottomOfScrollPosition, windowHeight]);

  useEffect(() => {
    if (scrollContainerRef.current && children) {
      setBottomOfContent(scrollContainerRef.current.offsetHeight);
    }
  }, [children]);

  useEffect(() => {
    onIsReachingBottom(isReachingBottom);
  }, [isReachingBottom, onIsReachingBottom]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setBottomOfScrollPosition(windowHeight + window.scrollY);
    }
  };

  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div ref={scrollContainerRef} className="ScrollContainer" style={style}>
      {children}
    </div>
  );
};
