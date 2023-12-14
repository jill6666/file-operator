import { useState } from "react";
import { ITreeSchema } from "../data/types/interface";
import size from "lodash/size";
import redux from "../data/redux";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";

const MenuItem = ({ item }: { item: ITreeSchema }) => {
  const currentSchema = useSelector(controlSelector.currentShema);
  const [isExpand, setIsExpane] = useState(true);
  const filename = `${item?.name}`;
  const expandable = size(item?.children);
  const isActive = currentSchema?.id === item?.id;

  const handleOnClick = (e: React.MouseEvent, item: ITreeSchema) => {
    e.preventDefault();
    expandable && setIsExpane((prev) => !prev);

    redux.setCurrentSchema(item);
  };

  const handleOnContextMenu = (e: React.MouseEvent, item: ITreeSchema) => {
    e.preventDefault();

    const position = { x: e.clientX, y: e.clientY };

    redux.setRightClickSchema({ schema: item, position });
  };
  return (
    <div className="text-left pl-2 divide-y divide-[#555] w-full cursor-pointer">
      <div
        className="px-4 py-2"
        onClick={(e) => handleOnClick(e, item)}
        onContextMenu={(e) => handleOnContextMenu(e, item)}
      >
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
          <div style={{ fontWeight: isActive ? "700" : "300" }}>{filename}</div>
        </div>
      </div>
      {isExpand && item.children && (
        <div className="pl-2 divide-y divide-[#555]">
          {item.children.map((i) => (
            <MenuItem item={i} />
          ))}
        </div>
      )}
    </div>
  );
};
export default MenuItem;
