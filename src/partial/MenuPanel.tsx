import useFileSchema from "../hook/useFileSchema";
import MenuItem from "../components/MenuItem";
import ToolBox from "../components/ToolBox";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";
import redux from "../data/redux";
import size from "lodash/size";
import { ACTIONS, FILE_TYPE } from "../data/types/enum";

const MenuPanel = () => {
  const currentSchema = useSelector(controlSelector.rightClickSchema);
  const {
    treeMap,
    renameResource,
    deleteResource,
    createResource,
    copyResource,
    pasteResource,
    cutResource,
  } = useFileSchema();

  const root = treeMap?.[0];
  const id = currentSchema?.schema?.id;

  const handleOnClose = () => {
    redux.setRightClickSchema({});
  };
  const handleOnClick = (type: ACTIONS) => {
    redux.setRightClickSchema({});

    // TODO: create file, create folder, rename
    switch (type) {
      case ACTIONS.CreateFile:
        createResource({
          filename: "0000.ts",
          parentId: id,
          type: FILE_TYPE.File,
        });
        break;
      case ACTIONS.CreateFolder:
        createResource({
          filename: "0001",
          parentId: id,
          type: FILE_TYPE.Folder,
        });
        break;
      case ACTIONS.Edit:
        renameResource({ id, name: "Jill Baby" });
        break;
      case ACTIONS.Delete:
        deleteResource({ id });
        break;
      case ACTIONS.Copy:
        copyResource(currentSchema.schema);
        break;
      case ACTIONS.Paste:
        pasteResource(currentSchema.schema);
        break;
      case ACTIONS.Cut:
        cutResource(currentSchema.schema);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full border-r h-[90%] bg-[#282c34] overflow-scroll">
      {root && <MenuItem item={root} />}
      <div
        className="absolute"
        style={{
          opacity: size(currentSchema) ? 1 : 0,
          top: currentSchema?.position?.y,
          left: currentSchema?.position?.x,
        }}
      >
        <ToolBox
          schema={currentSchema.schema}
          onClose={handleOnClose}
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};
export default MenuPanel;
