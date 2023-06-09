import { ReactNode, CSSProperties } from "react";

interface ErrorProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/* No styles for Error component in this exercise. Demo purposes only. :) */
export const Error = ({ children, className, style }: ErrorProps) => {
  return (
    <div className={`Error ${className || ""}`} style={style}>
      {children}
    </div>
  );
};
