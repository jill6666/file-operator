import useFileSchema from "../hook/useFileSchema";
import MenuItem from "../components/MenuItem";
import ToolBox from "../components/ToolBox";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";
import redux from "../data/redux";
import size from "lodash/size";
import { ACTIONS } from "../data/types/enum";

const MenuPanel = () => {
  const currentSchema = useSelector(controlSelector.rightClickSchema);
  const { treeMap, renameResource, deleteResource, createResource } =
    useFileSchema();

  const root = treeMap?.[0];
  const id = currentSchema?.schema?.id;

  const handleOnClose = () => {
    redux.setRightClickSchema({});
  };
  const handleOnClick = (type: ACTIONS) => {
    redux.setRightClickSchema({});

    // TODO: add input for CreateFile and CreateFolder
    switch (type) {
      case ACTIONS.CreateFile:
        createResource({ filename: "0000", parentId: id, type: "file" });
        break;
      case ACTIONS.CreateFolder:
        createResource({ filename: "0000", parentId: id, type: "folder" });
        break;
      case ACTIONS.Delete:
        deleteResource({ id });
        break;
      case ACTIONS.Edit:
        renameResource({ id, name: "Jill Baby" });
        break;
    }
  };

  return (
    <div className="w-full">
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
