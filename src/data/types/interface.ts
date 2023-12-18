import { FILE_TYPE } from "./enum";

export interface ITreeSchema {
  id: string;
  name: string;
  parentId: string | null;
  children?: TFolderChildren[];
}

export type TFolderChildren = IFileSchema | ITreeSchema;

export interface IFileSchema {
  id: string;
  name: string;
  parentId: string;
  extension: string;
  browserVisible: boolean;
}

export interface IEditProps {
  id: string;
  name: string;
}

export interface ISchema {
  id: string;
  name: string;
  parentId: string | null;
  extension: string | null;
}

export interface ICreateResource {
  id: string;
  filename: string;
  parentId: string;
  type: FILE_TYPE;
}

export interface IOption {
  label: string;
  value: string;
}
