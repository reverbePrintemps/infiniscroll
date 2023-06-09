import { memo, ReactNode, useEffect, useState } from "react";
import { AutogrowingInput } from "./AutogrowingInput";
import { Button } from "./Button";

import "../styles/Search.css";

type SearchProps = {
  focus?: boolean;
  placeholder: string;
  showInput?: boolean;
  onEnter?: () => void;
  children?: ReactNode;
  onClick?: () => void;
  onSearchInput: (input: string) => void;
};

export const Search = memo(
  ({
    focus: focusProp,
    onSearchInput,
    placeholder,
    showInput,
    children,
    onEnter,
    onClick,
  }: SearchProps) => {
    const [searchInput, setSearchInput] = useState("");
    const [focus, setFocus] = useState(focusProp || false);

    useEffect(() => {
      onSearchInput(searchInput);
    }, [searchInput]);

    return (
      <div
        className="Search"
        onClick={() => {
          setFocus(true);
          onClick && onClick();
        }}
      >
        <div className="Search__searchIcon">🔎</div>
        {!showInput && children ? (
          children
        ) : (
          <AutogrowingInput
            className="Search__input"
            cols={40}
            focus={focus}
            placeholder={placeholder}
            value={searchInput || ""}
            onChange={(input) => {
              setSearchInput(input);
            }}
            onEnter={onEnter}
            onBlur={() => {
              setFocus(false);
            }}
          />
        )}
        {searchInput.length > 0 && (
          <Button
            className="Search__clearButton"
            onClick={() => setSearchInput("")}
          >
            <div className="Search__clearIcon">X</div>
          </Button>
        )}
      </div>
    );
  }
);
