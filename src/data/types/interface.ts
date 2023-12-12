export interface IFolderSchema {
  id: string;
  filename: string;
  extension: string;
  children: IFolderSchema[];
}
