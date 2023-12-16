import { useEffect, useState } from "react";
import useFileSchema from "../hook/useFileSchema";
import MenuItem from "../components/MenuItem";
import ToolBox from "../components/ToolBox";
import { useSelector } from "react-redux";
import { controlSelector } from "../data/slice/controlSlice";
import redux from "../data/redux";
import size from "lodash/size";
import { ACTIONS, FILE_TYPE } from "../data/types/enum";

const MenuPanel = () => {
  const [editType, setEdit] = useState<ACTIONS>();
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

  useEffect(() => {
    console.log("editType", editType);
  }, [editType]);

  const handleOnClose = () => {
    redux.setRightClickSchema({});
  };

  const actionMp = {
    [ACTIONS.CreateFile]: {
      onClick: () => {
        setEdit(ACTIONS.CreateFile);
        redux.setEditing(id);
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
        redux.setEditing(id);
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
        redux.setEditing(id);
      },
      callback: (val: any) => renameResource({ id, name: val }),
    },
    [ACTIONS.Delete]: {
      onClick: () => deleteResource({ id }),
    },
    [ACTIONS.Copy]: { onClick: () => copyResource(currentSchema.schema) },
    [ACTIONS.Paste]: { onClick: () => pasteResource(currentSchema.schema) },
    [ACTIONS.Cut]: { onClick: () => cutResource(currentSchema.schema) },
  };

  const handleOnClick = (type: ACTIONS) => {
    redux.setRightClickSchema({});
    actionMp?.[type]?.onClick();
  };

  const GITHUB_INFO = {
    icon: "ri-github-fill",
    url: "https://github.com/jill6666",
    title: "Source code on Github",
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
