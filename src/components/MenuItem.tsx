import { useState } from "react";
import { ITreeSchema } from "../data/types/interface";
import size from "lodash/size";

const MenuItem = ({ item }: { item: ITreeSchema }) => {
  const [isExpand, setIsExpane] = useState(true);
  const filename = `${item.name}`;
  const expandable = size(item?.children);

  const handleOnClick = () => {
    expandable && setIsExpane((prev) => !prev);
  };
  return (
    <div className="text-left pl-2 divide-y w-full cursor-pointer">
      <div className="px-4 py-2" onClick={handleOnClick}>
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
