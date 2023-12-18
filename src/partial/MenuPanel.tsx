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
import Dialog from "../components/Dialog";

const MenuPanel = () => {
  const [editType, setEdit] = useState<ACTIONS>();
  const [open, setOpen] = useState(false);
  const currentSchema = useSelector(controlSelector.currentShema);
  const rightClickSchema = useSelector(controlSelector.rightClickSchema);
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
  const handleOnClose = () => {
    redux.setRightClickSchema({});
  };

  useEffect(() => {
    console.log("currentSchema.id", id);
    console.log("rightClickSchema.id", rightClickSchema.schema?.id);
  }, [id, rightClickSchema.schema]);

  // toolbox item onClick & input onKeydown callback
  const actionMp = {
    [ACTIONS.CreateFile]: {
      onClick: () => {
        setEdit(ACTIONS.CreateFile);

        const newId = uuidv4();
        redux.create({ id: newId, parentId: id });
        redux.setEditing(newId);
      },
      callback: (val: any) =>
        createResource({
          filename: val,
          parentId: id,
          type: FILE_TYPE.File,
        }),
    },
    [ACTIONS.CreateFolder]: {
      onClick: () => {
        setEdit(ACTIONS.CreateFolder);

        const newId = uuidv4();
        redux.create({ id: newId, parentId: id });
        redux.setEditing(newId);
      },
      callback: (val: any) =>
        createResource({
          filename: val,
          parentId: id,
          type: FILE_TYPE.Folder,
        }),
    },
    [ACTIONS.Edit]: {
      onClick: () => {
        setEdit(ACTIONS.Edit);
        redux.setCurrentSchema(rightClickSchema.schema);
        redux.setEditing(rightClickSchema.schema.id);
      },
      callback: (val: any) => renameResource({ id, name: val }),
    },
    [ACTIONS.Delete]: {
      onClick: () => deleteResource({ id }),
    },
    [ACTIONS.Copy]: { onClick: () => copyResource(rightClickSchema.schema) },
    [ACTIONS.Paste]: { onClick: () => pasteResource(rightClickSchema.schema) },
    [ACTIONS.Cut]: { onClick: () => cutResource(rightClickSchema.schema) },
  };

  // handle toolbox item onclick
  const handleOnClick = (type: ACTIONS) => {
    actionMp?.[type]?.onClick();
    redux.setRightClickSchema({});
  };

  const handleOnEnter = (value: string) => {
    // @ts-ignore
    editType && actionMp?.[editType]?.callback(value);
    redux.setEditing("");
  };
  const handleInputOnBlur = () => {
    redux.setEditing("");
  };

  return (
    <div className="w-full h-full border-r bg-[#282c34] ">
      <Dialog isOpen={open} />

      <div className="overflow-scroll h-[calc(100vh-60px)] border-b pb-2">
        {root && (
          <MenuItem
            item={root}
            onEnter={handleOnEnter}
            inputOnBlur={handleInputOnBlur}
          />
        )}
      </div>
      <div
        className="absolute"
        style={{
          opacity: size(rightClickSchema) ? 1 : 0,
          top: rightClickSchema?.position?.y,
          left: rightClickSchema?.position?.x,
        }}
      >
        <ToolBox
          schema={rightClickSchema.schema}
          onClose={handleOnClose}
          onClick={handleOnClick}
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
