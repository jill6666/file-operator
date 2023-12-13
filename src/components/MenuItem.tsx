import { useState } from "react";
import { ITreeSchema } from "../data/types/interface";
import size from "lodash/size";
import redux from "../data/redux";

const MenuItem = ({ item }: { item: ITreeSchema }) => {
  const [isExpand, setIsExpane] = useState(true);
  const filename = `${item.name}`;
  const expandable = size(item?.children);

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
    <div className="text-left pl-2 divide-y w-full cursor-pointer">
      <div
        className="px-4 py-2"
        onClick={(e) => handleOnClick(e, item)}
        onContextMenu={(e) => handleOnContextMenu(e, item)}
      >
        <div className="flex space-x-2">
          {expandable && <div className="text-sm">{!isExpand ? "►" : "▼"}</div>}
          <div>{filename}</div>
        </div>
      </div>
      {isExpand && item.children && (
        <div className="pl-2 divide-y">
          {item.children.map((i) => (
            <MenuItem item={i} />
          ))}
        </div>
      )}
    </div>
  );
};
export default MenuItem;
