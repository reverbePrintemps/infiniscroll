import { ReactNode, CSSProperties } from "react";
import "../styles/Grid.css";

interface GridProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Grid = ({ children, className, style }: GridProps) => {
  return (
    <div className={`Grid ${className || ""}`} style={style}>
      {children}
    </div>
  );
};
