import { ITreeSchema } from "../data/types/interface";
import { ACTIONS } from "../data/types/enum";
import getMenuOptions from "../utils/getMenuOptions";

const ToolBox = ({
  open,
  schema,
  onClose,
  onClick,
}: {
  open?: boolean;
  schema?: ITreeSchema;
  onClose?(): void;
  onClick?(type: ACTIONS): void;
}) => {
  const options = (schema && getMenuOptions(schema)) || [];

  const handleOnClose = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose && onClose();
  };

  const handleOnClick = (e: React.MouseEvent, type: ACTIONS) => {
    e.preventDefault();
    onClick && onClick(type);
  };

  return (
    <dialog open={open} className="relative text-primary-dark">
      <div
        className="absolute right-[-15px] top-[-15px] w-6 h-6 bg-white border text-center items-center rounded-[5rem] cursor-pointer text-sm"
        onClick={handleOnClose}
      >
        <i className="ri-close-line"></i>
      </div>
      <div className="flex flex-col p-2 rounded-sm space-y-2 divide-y bg-white p-2 border">
        {options.map((item) => (
          <div
            key={item.value}
            className="cursor-pointer"
            onClick={(e) => handleOnClick(e, item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </dialog>
  );
};

export default ToolBox;
