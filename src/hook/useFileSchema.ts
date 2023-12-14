import { useSelector } from "react-redux";
import { folderSelector } from "../data/slice/folderSlice";
import refineDataToTree from "../data/refine/refineDataToTree";
import { IEditProps, ICreateResource } from "../data/types/interface";
import redux from "../data/redux";
import getFileExtension from "../utils/getFileExtension";
import { v4 as uuidv4 } from "uuid";
import { BROWSER_VISIBLE_EXTENSIONS } from "../constants";
import store from "store2";
import { mockFolderData } from "../data/mock";
import getCompletePathByfilename from "../utils/getCompletePathByfilename";

interface ICheckIsNotDuplicate {
  filename: string;
  parentId: string;
}

const useFileSchema = () => {
  const schema = useSelector(folderSelector.schema);
  const treeMap = refineDataToTree(schema);

  const initSchema = () => {
    const localStorageData = store.get("resource_schema");
    if (localStorageData) return redux.init(localStorageData);

    const id = uuidv4();
    const initData = mockFolderData || [{ id, name: "App", parentId: null }];
    redux.init(initData);
  };

  const checkIsNotDuplicate = ({
    filename,
    parentId,
  }: ICheckIsNotDuplicate) => {
    const hasSameFilename = schema.find(
      (item) => item?.parentId === parentId && item?.name === filename
    );

    return !Boolean(hasSameFilename);
  };

  const createResource = ({ filename, parentId, type }: ICreateResource) => {
    const isValid = checkIsNotDuplicate({ filename, parentId });
    if (!isValid) return alert("Duplicate name in a folder, please rename.");

    const id = uuidv4();
    const extension = getFileExtension(filename);
    const browserVisible =
      extension && BROWSER_VISIBLE_EXTENSIONS.includes(extension);

    const params = {
      folder: { id, parentId, name: filename },
      file: {
        id,
        parentId,
        name: filename,
        extension,
        browserVisible,
      },
    };

    if (!params[type]) console.error("Create error, invalid type.");

    redux.create(params[type]);
  };

  const deleteResource = ({ id }: { id: string }) => {
    const hasResource = schema.findIndex((item) => item.id === id) !== -1;
    if (hasResource) return redux.delete({ id });

    console.error("Delete error, no such id in resource.");
  };

  const renameResource = ({ id, name }: IEditProps) => {
    const hasResource = schema.findIndex((item) => item.id === id) !== -1;
    if (hasResource) return redux.rename({ id, name });

    console.error("Rename error, no such id in resource.");
  };

  const copyResource = () => {};
  const pasteResource = () => {};
  const cutResource = () => {};

  const searchResource = (name: string) => {
    const resultOptions = getCompletePathByfilename(name, treeMap[0]);

    redux.setSearchResult(resultOptions);
  };

  const clearSearchResult = () => {
    redux.setSearchResult();
  };

  return {
    treeMap,
    initSchema,
    renameResource,
    deleteResource,
    createResource,
    copyResource,
    pasteResource,
    cutResource,
    searchResource,
    clearSearchResult,
  };
};

export default useFileSchema;
