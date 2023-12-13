import { ITreeSchema } from "../data/types/interface";
import size from "lodash/size";
import {
  FOLDER_ACTIONS,
  FILE_ACTIONS,
  ROOT_FOLDER_ACTIONS,
} from "../constants";

const getMenuOptions = (schema: ITreeSchema) => {
  const isRoot = schema?.id === "root";
  const isFolder = size(schema?.children);

  if (isRoot) return ROOT_FOLDER_ACTIONS;
  return isFolder ? FOLDER_ACTIONS : FILE_ACTIONS;
};

export default getMenuOptions;
