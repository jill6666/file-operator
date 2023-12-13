import { ITreeSchema } from "../data/types/interface";
import { ACTIONS } from "../data/types/enum";
import size from "lodash/size";
import { FOLDER_ACTIONS, FILE_ACTIONS } from "../constants";

const ToolBox = ({
  schema,
  onClose,
  onClick,
}: {
  schema?: ITreeSchema;
  onClose?(): void;
  onClick?(type: ACTIONS): void;
}) => {
  const isFolder = size(schema?.children);
  const data = isFolder ? FOLDER_ACTIONS : FILE_ACTIONS;

  const handleOnClose = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose && onClose();
  };

  const handleOnClick = (e: React.MouseEvent, type: ACTIONS) => {
    e.preventDefault();
    onClick && onClick(type);
  };

  return (
    <div className="relative">
      <div
        className="absolute right-[-15px] top-[-15px] w-6 h-6 bg-white border text-center items-center rounded-[5rem] cursor-pointer text-sm"
        onClick={handleOnClose}
      >
        x
      </div>
      <div className="flex flex-col p-2 rounded-sm space-y-2 divide-y bg-white p-2 border">
        {data.map((item) => (
          <div
            key={item.value}
            className="cursor-pointer"
            onClick={(e) => handleOnClick(e, item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolBox;
