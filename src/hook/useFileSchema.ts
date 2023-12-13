import { useSelector } from "react-redux";
import { folderSelector } from "../data/slice/folderSlice";
import refineDataToTree from "../data/refine/refineDataToTree";
import { IEditProps, ICreateResource } from "../data/types/interface";
import redux from "../data/redux";
import getFileExtension from "../utils/getFileExtension";
import { v4 as uuidv4 } from "uuid";
import { BROWSER_VISIBLE_EXTENSIONS } from "../constants";
import store from "store2";

const useFileSchema = () => {
  const schema = useSelector(folderSelector.schema);
  const treeMap = refineDataToTree(schema);

  const initSchema = () => {
    const localStorageData = store.get("resource_schema");
    if (localStorageData) return redux.init(localStorageData);

    const id = uuidv4();
    const initData = [{ id, name: "App", parentId: null }];
    redux.init(initData);
  };

  const createResource = ({ filename, parentId, type }: ICreateResource) => {
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
    if (hasResource) return redux.delete(id);

    console.error("Delete error, no such id in resource.");
  };

  const renameResource = ({ id, name }: IEditProps) => {
    const hasResource = schema.findIndex((item) => item.id === id) !== -1;
    if (hasResource) return redux.rename({ id, name });

    console.error("Rename error, no such id in resource.");
  };

  return {
    treeMap,
    initSchema,
    renameResource,
    deleteResource,
    createResource,
  };
};

export default useFileSchema;
