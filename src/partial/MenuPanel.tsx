import { useState } from "react";
import useFileSchema from "../hook/useFileSchema";
import MenuItem from "../components/MenuItem";
import ToolBox from "../components/ToolBox";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";
import redux from "../data/redux";
import { ACTIONS, FILE_TYPE } from "../data/types/enum";
import { GITHUB_INFO } from "../constants";
import { v4 as uuidv4 } from "uuid";

const MenuPanel = () => {
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [targetSchema, setTargetSchema] = useState<any>();
  const [editing, setEditing] = useState<{ id?: string; type?: ACTIONS }>();
  const [toolboxPosition, setToolboxPosition] = useState({ x: 0, y: 0 });
  const currentSchema = useSelector(controlSelector.currentShema);

  const { treeMap, renameResource, deleteResource, ...res } = useFileSchema();
  const { copyResource, pasteResource, cutResource, createResource } = res;

  const root = treeMap?.[0];
  const toolboxStyle = {
    opacity: toolboxOpen ? 1 : 0,
    top: toolboxPosition.y,
    left: toolboxPosition.x,
  };

  const handleToolboxOnClick = (type: ACTIONS) => {
    TYPES_ACTION_MP?.[type]?.onClick();
    setToolboxOpen(false);
  };

  const handleToolboxOnClose = () => setToolboxOpen(false);

  const handleMenuItemOnSubmit = (value: string) => {
    editing?.type && TYPES_ACTION_MP?.[editing?.type]?.inputOnSubmit?.(value);
    setEditing(undefined);
  };

  const handleMenuItemOnRightClick = (props: any) => {
    setToolboxOpen(true);
    setTargetSchema(props?.schema);
    setToolboxPosition(props?.position);
  };

  const handleMenuInputOnBlur = () => setEditing(undefined);

  const handleMenuOnClick = (item: any) => redux.setCurrentSchema(item);

  const createFileOnClick = () => {
    const newId = uuidv4();
    redux.create({ id: newId, parentId: targetSchema?.id });
    setEditing({ id: newId, type: ACTIONS.CreateFile });
  };

  const createFolderOnClick = () => {
    const newId = uuidv4();
    redux.create({ id: newId, parentId: targetSchema?.id });
    setEditing({ id: newId, type: ACTIONS.CreateFolder });
  };

  const renameOnClick = () => {
    redux.setCurrentSchema(targetSchema);
    setEditing({ id: targetSchema.id, type: ACTIONS.Edit });
  };
  const renameOnSubmit = (val: string) =>
    renameResource({ id: targetSchema.id, name: val });

  const createFolderOnSubmit = (val: string) => {
    editing?.id &&
      createResource({
        id: editing.id,
        filename: val,
        parentId: targetSchema?.id,
        type: FILE_TYPE.Folder,
      });
  };

  const createFileOnSubmit = (val: string) => {
    editing?.id &&
      createResource({
        id: editing.id,
        filename: val,
        parentId: targetSchema?.id,
        type: FILE_TYPE.File,
      });
  };

  const TYPES_ACTION_MP = {
    [ACTIONS.CreateFile]: {
      onClick: createFileOnClick,
      inputOnSubmit: createFileOnSubmit,
    },
    [ACTIONS.CreateFolder]: {
      onClick: createFolderOnClick,
      inputOnSubmit: createFolderOnSubmit,
    },
    [ACTIONS.Edit]: {
      onClick: renameOnClick,
      inputOnSubmit: renameOnSubmit,
    },
    [ACTIONS.Delete]: {
      onClick: () => deleteResource({ id: targetSchema.id }),
      inputOnSubmit: () => {},
    },
    [ACTIONS.Copy]: {
      onClick: () => copyResource(targetSchema),
      inputOnSubmit: () => {},
    },
    [ACTIONS.Paste]: {
      onClick: () => pasteResource(targetSchema),
      inputOnSubmit: () => {},
    },
    [ACTIONS.Cut]: {
      onClick: () => cutResource(targetSchema),
      inputOnSubmit: () => {},
    },
  };

  return (
    <div className="w-full h-full border-r bg-primary-dark">
      <div className="overflow-scroll h-[calc(100vh-60px)] border-b pb-2">
        {root && (
          <MenuItem
            item={root}
            onEditId={editing?.id || ""}
            currentSchema={currentSchema}
            onEnter={handleMenuItemOnSubmit}
            inputOnBlur={handleMenuInputOnBlur}
            onClick={handleMenuOnClick}
            onRightClick={handleMenuItemOnRightClick}
          />
        )}
      </div>
      <div className="absolute z-40" style={toolboxStyle}>
        <ToolBox
          schema={targetSchema}
          open={toolboxOpen}
          onClose={handleToolboxOnClose}
          onClick={handleToolboxOnClick}
        />
      </div>
      <a
        href={GITHUB_INFO.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center h-[60px] px-4 space-x-2 cursor-pointer"
      >
        <i className={`${GITHUB_INFO.icon} text-2xl`}></i>
        <p>{GITHUB_INFO.title}</p>
      </a>
    </div>
  );
};
export default MenuPanel;
