import { ITreeSchema } from "../data/types/interface";
import {
  FOLDER_ACTIONS,
  FILE_ACTIONS,
  ROOT_FOLDER_ACTIONS,
} from "../constants";

const getMenuOptions = (schema: ITreeSchema) => {
  const isRoot = !schema?.parentId;
  const isFolder = Boolean(schema?.children);

  if (isRoot) return ROOT_FOLDER_ACTIONS;
  return isFolder ? FOLDER_ACTIONS : FILE_ACTIONS;
};

export default getMenuOptions;
