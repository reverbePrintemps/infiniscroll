import { useEffect, useRef, useState } from "react";

import "../styles/AutogrowingInput.css";

type AutogrowingInputProps = {
  rows?: number;
  cols?: number;
  value: string;
  focus?: boolean;
  className?: string;
  placeholder: string;
  onBlur?: () => void;
  onEnter?: () => void;
  onChange: (value: any) => void;
};

export const AutogrowingInput = ({
  rows,
  cols,
  focus,
  value,
  onBlur,
  onEnter,
  onChange,
  className,
  placeholder,
}: AutogrowingInputProps) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    focus && inputRef.current?.focus();
  }, [focus]);

  return (
    <div className="AutogrowingInput__container">
      <div
        className="AutogrowingInput"
        data-replicated-value={inputValue || placeholder}
      >
        <textarea
          ref={inputRef}
          rows={rows ?? 1}
          cols={cols ?? 1}
          placeholder={placeholder}
          className={`AutogrowingInput__textarea ${className || ""}`}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnter && onEnter();
            }
          }}
          autoFocus={focus}
          value={inputValue}
          autoComplete={"off"}
          data-lpignore={"true"}
          data-form-type={"other"}
          spellCheck={false}
          onFocus={(e) =>
            e.target.setSelectionRange(
              e.target.value.length,
              e.target.value.length
            )
          }
          onBlur={() => {
            onBlur && onBlur();
          }}
        />
      </div>
    </div>
  );
};
