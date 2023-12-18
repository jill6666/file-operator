import { useSelector } from "react-redux";
import { folderSelector } from "../data/slice/folderSlice";
import refineDataToTree from "../data/refine/refineDataToTree";
import {
  IEditProps,
  ICreateResource,
  ITreeSchema,
} from "../data/types/interface";
import redux from "../data/redux";
import getFileExtension from "../utils/getFileExtension";
import { v4 as uuidv4 } from "uuid";
import { BROWSER_VISIBLE_EXTENSIONS, DEFAULT_FILE_CONTENT } from "../constants";
import store from "store2";
import { mockFolderData } from "../data/mock";
import getCompletePathByfilename from "../utils/getCompletePathByfilename";
import clipboard from "../utils/clipboard";
import cloneDeep from "lodash/cloneDeep";
import { FILE_TYPE } from "../data/types/enum";
import renewSchemaId from "../utils/renewSchemaId";
import clearNoParentItem from "../utils/clearNoParentItem";

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

  const newFile = (id: string, name: string, parentId: string) => {
    const extension = getFileExtension(name);
    const browserVisible = BROWSER_VISIBLE_EXTENSIONS.includes(extension);
    const schema = { id, parentId, name, extension, browserVisible };

    // @ts-ignore
    store.set(id, DEFAULT_FILE_CONTENT?.[extension] || "test");
    redux.create(schema);
  };

  const newFolder = (id: string, name: string, parentId: string) => {
    const schema = { id, name, parentId, children: [] };
    redux.create(schema);
  };

  const createResource = ({
    id,
    filename,
    parentId,
    type,
  }: ICreateResource) => {
    const isValid = checkIsNotDuplicate({ filename, parentId });
    if (!isValid) return alert("Duplicate name in a folder, please rename.");

    switch (type) {
      case FILE_TYPE.Folder:
        newFolder(id, filename, parentId);
        break;
      case FILE_TYPE.File:
        newFile(id, filename, parentId);
        break;
      default:
        break;
    }
  };

  const deleteSchema = (id: string) => {
    const filter = schema.filter((s) => s.id !== id);
    const newSchema = clearNoParentItem(filter, id);
    redux.update(newSchema);
    store.remove(id);
  };

  const deleteResource = ({ id }: { id: string }) => {
    const hasResource = schema.findIndex((item) => item.id === id) !== -1;
    if (!hasResource)
      return console.error("Delete error, no such id in resource.");

    deleteSchema(id);
  };

  const renameResource = ({ id, name }: IEditProps) => {
    const deep = cloneDeep(schema);
    const hasResource = deep.findIndex((i) => i.id === id) !== -1;
    if (!hasResource) return console.error("Rename error, not in resource.");

    const newSchema = deep.map((item) => {
      if (item.id !== id) return item;

      const extension = getFileExtension(name);
      const browserVisible = BROWSER_VISIBLE_EXTENSIONS.includes(extension);
      return { ...item, name, extension, browserVisible };
    });

    redux.update(newSchema);
  };

  const copyResource = async (schema: ITreeSchema) => {
    await clipboard
      .set(JSON.stringify(schema))
      .catch((e) => console.error("Copy error"));
  };

  const pasteResource = async (parent: ITreeSchema) => {
    try {
      const currentBoard = await clipboard.read();
      if (!currentBoard) return console.error("Clipboard is empty.");

      const data = JSON.parse(currentBoard);
      const isValid = checkIsNotDuplicate({
        filename: data?.name,
        parentId: parent.id,
      });
      if (!isValid) return alert("Duplicate name in a folder, please rename.");

      const deep = cloneDeep(schema);
      const newChildren = renewSchemaId(parent.id, data);

      const newSchema = [...deep, ...newChildren];

      redux.update(newSchema);
    } catch (e) {
      console.error(e);
    }
  };

  const cutResource = async (target: ITreeSchema) => {
    await clipboard
      .set(JSON.stringify(target))
      .catch((e) => console.error("Cut error"));

    deleteSchema(target.id);
  };

  const searchResource = (name: string) => {
    const resultOptions = getCompletePathByfilename(
      name,
      treeMap[0],
      treeMap[0]?.name
    );

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
