import { CSSProperties, MouseEvent, ReactNode, useState } from "react";
import "../styles/Button.css";

export interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent) => void;
  style?: CSSProperties;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  topLevel?: boolean;
  isMenu?: boolean;
  isOpen?: boolean;
}

export const Button = ({
  className,
  children,
  disabled,
  isActive,
  topLevel,
  onClick,
  isMenu,
  isOpen,
  style,
  type,
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={`Button ${className || ""} ${isPressed ? "m-pressed" : ""} ${
        isActive ? "m-active" : ""
      }`}
      onClick={(e) => {
        onClick && onClick(e);
        !isMenu && e.stopPropagation();
      }}
      style={style}
      onTouchStart={() => setIsPressed(true)}
      // onTouchEnd may lead to inconsistent behavior but is necessary when scrolling over buttons on mobile
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled}
      type={type}
    >
      {!topLevel && isMenu && (
        <span className={`Button__openIndicator ${isOpen ? "m-open" : ""}`}>
          {"👈 \u00A0"}
        </span>
      )}
      {topLevel && isOpen ? <span>🙅</span> : children}
    </button>
  );
};
