export interface ITreeSchema {
  id: string;
  name: string;
  parentId: string | null;
  children?: TFolderChildren;
}

export type TFolderChildren = Array<ITreeSchema | IFileSchema>;

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
  filename: string;
  parentId: string;
  type: "folder" | "file";
}

export interface IOption {
  label: string;
  value: string;
}
