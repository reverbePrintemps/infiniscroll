import { ReactNode, CSSProperties } from "react";
import "../styles/Skeleton.css";

interface SkeletonProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Skeleton = ({ children, className, style }: SkeletonProps) => {
  return (
    <div
      className={`Skeleton ${className || ""}`}
      style={style}
      data-testid="image-skeleton"
    >
      {children}
    </div>
  );
};
