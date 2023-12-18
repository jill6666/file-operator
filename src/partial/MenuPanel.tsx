import { useState, useEffect } from "react";
import useFileSchema from "../hook/useFileSchema";
import MenuItem from "../components/MenuItem";
import ToolBox from "../components/ToolBox";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";
import redux from "../data/redux";
import size from "lodash/size";
import { ACTIONS, FILE_TYPE } from "../data/types/enum";
import { GITHUB_INFO } from "../constants";
import { v4 as uuidv4 } from "uuid";

const MenuPanel = () => {
  const [editType, setEdit] = useState<ACTIONS>();
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [targetSchema, setTargetSchema] = useState<any>();
  const [toolboxPosition, setToolboxPosition] = useState({ x: 0, y: 0 });

  const currentSchema = useSelector(controlSelector.currentShema);
  const onEditId = useSelector(controlSelector.onEditId);
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
  const id = currentSchema?.id;
  const toolboxStyle = {
    opacity: toolboxOpen ? 1 : 0,
    top: toolboxPosition.y,
    left: toolboxPosition.x,
  };

  const actionMp = {
    [ACTIONS.CreateFile]: {
      onClick: () => {
        setEdit(ACTIONS.CreateFile);

        const newId = uuidv4();
        redux.create({ id: newId, parentId: targetSchema?.id });
        redux.setEditing(newId);
      },
      inputOnSubmit: (val: any) =>
        createResource({
          filename: val,
          parentId: targetSchema?.id,
          type: FILE_TYPE.File,
        }),
    },
    [ACTIONS.CreateFolder]: {
      onClick: () => {
        setEdit(ACTIONS.CreateFolder);

        const newId = uuidv4();
        redux.create({ id: newId, parentId: targetSchema?.id });
        redux.setEditing(newId);
      },
      inputOnSubmit: (val: any) =>
        createResource({
          filename: val,
          parentId: targetSchema?.id,
          type: FILE_TYPE.Folder,
        }),
    },
    [ACTIONS.Edit]: {
      onClick: () => {
        setEdit(ACTIONS.Edit);
        redux.setCurrentSchema(targetSchema);
        redux.setEditing(targetSchema.id);
      },
      inputOnSubmit: (val: any) => renameResource({ id, name: val }),
    },
    [ACTIONS.Delete]: {
      onClick: () => deleteResource({ id: targetSchema.id }),
    },
    [ACTIONS.Copy]: { onClick: () => copyResource(targetSchema) },
    [ACTIONS.Paste]: { onClick: () => pasteResource(targetSchema) },
    [ACTIONS.Cut]: { onClick: () => cutResource(targetSchema) },
  };

  const handleToolboxOnClick = (type: ACTIONS) => {
    actionMp?.[type]?.onClick();
    setToolboxOpen(false);
  };

  const handleToolboxOnClose = () => setToolboxOpen(false);

  const handleMenuItemOnSubmit = (value: string) => {
    // @ts-ignore
    editType && actionMp?.[editType]?.inputOnSubmit(value);
    redux.setEditing("");
  };

  const handleMenuItemOnRightClick = (props: any) => {
    setToolboxOpen(true);
    setTargetSchema(props?.schema);
    setToolboxPosition(props?.position);
  };

  const handleMenuInputOnBlur = () => redux.setEditing("");

  const handleMenuOnClick = (item: any) => redux.setCurrentSchema(item);

  return (
    <div className="w-full h-full border-r bg-[#282c34] ">
      <div className="overflow-scroll h-[calc(100vh-60px)] border-b pb-2">
        {root && (
          <MenuItem
            item={root}
            onEditId={onEditId}
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
