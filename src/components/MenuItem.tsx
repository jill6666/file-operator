import { useState } from "react";
import { ITreeSchema } from "../data/types/interface";
import size from "lodash/size";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";

interface IMenuItem {
  item: ITreeSchema;
  currentSchema: ITreeSchema;
  onEditId: string;
  onEnter?(val?: string): void;
  inputOnBlur?(): void;
  onClick?(props: any): void;
  onRightClick?(props: any): void;
}
const MenuItem = ({
  item,
  currentSchema,
  onEditId,
  onEnter,
  inputOnBlur,
  onClick,
  onRightClick,
}: IMenuItem) => {
  const [isExpand, setIsExpane] = useState(true);
  const [inputValue, setInputValue] = useState(item?.name || "");

  const filename = `${item?.name}`;
  const expandable = size(item?.children);
  const isActive = currentSchema?.id === item?.id;
  const isEdit = onEditId === item?.id;

  const handleOnClick = (e: React.MouseEvent, item: ITreeSchema) => {
    e.preventDefault();
    expandable && setIsExpane((prev) => !prev);
    onClick && onClick(item);
  };

  const handleOnContextMenu = (e: React.MouseEvent, item: ITreeSchema) => {
    e.preventDefault();

    const position = { x: e.clientX, y: e.clientY };
    onRightClick && onRightClick({ schema: item, position });
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleOnKeyDown = (e: any) => {
    const isEnterKey = e?.code === "Enter" || e?.keyCode === 13;
    if (isEnterKey) onEnter && onEnter(inputValue);
  };

  const handleOnBlur = () => {
    inputOnBlur && inputOnBlur();
  };
  return (
    <div className="text-left pl-2 divide-y divide-[#555] w-full cursor-pointer">
      <div
        className="px-4 py-2"
        onClick={(e) => handleOnClick(e, item)}
        onContextMenu={(e) => handleOnContextMenu(e, item)}
      >
        {!isEdit && (
          <div className="flex space-x-2">
            {Boolean(expandable) && (
              <div className="text-sm">
                {!isExpand ? (
                  <i className="ri-arrow-right-s-line"></i>
                ) : (
                  <i className="ri-arrow-down-s-line"></i>
                )}
              </div>
            )}
            <div style={{ fontWeight: isActive ? "700" : "300" }}>
              {filename}
            </div>
          </div>
        )}
        {isEdit && (
          <input
            type="text"
            onBlur={handleOnBlur}
            value={inputValue}
            autoFocus={true}
            className="bg-transparent focus:outline-none p-0 m-0"
            style={{ color: "#61dafb" }}
            onChange={handleInputChange}
            onKeyDown={handleOnKeyDown}
          />
        )}
      </div>
      {isExpand && item.children && (
        <div className="pl-2 divide-y divide-[#555]">
          {item.children.map((i, index) => (
            <div key={i.id + index}>
              <MenuItem
                item={i}
                currentSchema={currentSchema}
                onEditId={onEditId}
                onEnter={onEnter}
                inputOnBlur={inputOnBlur}
                onClick={onClick}
                onRightClick={onRightClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MenuItem;
