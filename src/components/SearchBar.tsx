// @ts-nocheck
import { useState, useRef } from "react";
import size from "lodash/size";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";
import { ISearchResult } from "../data/types/interface";
import redux from "../data/redux";

interface ISearchBar {
  placeholder?: string;
  onKeyDown?(e: any): void;
  onClear?(e: any): void;
}

const VISIBLE = "visible";
const HIDDEN = "hidden";

let intervalId: any = null;

const SearchBar = ({ placeholder, onKeyDown, onClear }: ISearchBar) => {
  const searchResult = useSelector(controlSelector.searchResult);

  const inputRef = useRef(null);
  const cursorRef = useRef(null);
  const fakeInputRef = useRef(null);

  const [searchInput, setSearchInput] = useState<string | undefined>();

  const hasValue = size(searchInput);
  const showClearBtn = Boolean(hasValue);
  const inputPlaceholder = placeholder || "Search files by name.";

  const handleOnChange = (e: any) => {
    setInputContent(e?.target?.value || "");
  };

  const handleClear = () => {
    setInputContent("");
    onClear && onClear();
  };

  const setInputContent = (value?: string) => {
    fakeInputRef.current.innerText = value;
    setSearchInput(value);
  };

  const handleCmdOnClick = () => {
    inputRef?.current.focus();

    intervalId = setInterval(makeCursorStyle, 500);
  };

  const handleOnBlur = () => {
    clearInterval(intervalId);
    cursorRef.current.style.visibility = HIDDEN;
  };
  const handleOnKeyDown = (e: any) => {
    const isEnterKey = e?.code === "Enter" || e?.keyCode === 13;

    if (isEnterKey && onKeyDown) {
      onKeyDown(searchInput);
    }
  };

  const makeCursorStyle = () => {
    const curVisible =
      cursorRef.current.style.visibility === VISIBLE ? HIDDEN : VISIBLE;

    cursorRef.current.style.visibility = curVisible;
  };

  const handleOnClick = (e: any, item: ISearchResult) => {
    e.preventDefault();

    onClear && onClear();
    redux.setCurrentSchema(item);
  };

  return (
    <div className="flex relative w-full h-12 border items-center rounded-sm">
      <div
        className="flex w-full relative items-center p-2 pl-[45px]"
        onClick={handleCmdOnClick}
      >
        <div className="absolute top-[] left-[12px]">
          <i className="ri-file-search-line"></i>
        </div>
        <span
          className="float-left overflow-hidden p-0 whitespace-pre leading-5 text-base"
          ref={fakeInputRef}
        ></span>
        <div
          className="float-left bg-white rounded-md invisible w-[2px] h-[20px]"
          ref={cursorRef}
        />

        {!hasValue && (
          <span className="absolute opacity-[.5] text-base">
            {inputPlaceholder}
          </span>
        )}
      </div>
      <div onClick={handleClear} className="absolute right-2 cursor-pointer">
        {showClearBtn && <i className="ri-close-line"></i>}
      </div>

      <input
        className="w-0 h-0 opacity-0"
        ref={inputRef}
        type="search"
        inputMode="search"
        value={searchInput}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />

      {Boolean(size(searchResult)) && (
        <div className="w-full bg-primary-dark absolute top-[60px] border border-white z-40 rounded-sm text-base">
          <ul className="py-2 px-4 text-left divide-y divide-primary-main">
            {searchResult.map((option) => (
              <li
                key={option?.label}
                className="py-2 cursor-pointer"
                onClick={(e) => handleOnClick(e, option)}
              >
                {option?.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default SearchBar;
