import { ACTIONS } from "./data/types/enum";
import PkgJson from "../package.json";

export const BROWSER_VISIBLE_EXTENSIONS = [".txt", ".js", ".ts", ".json"];

const initJSFile = `const foo = 'boo';`;
const initTSFile = `function getUser (id: string): IUser { return { id: '00-1122', name: 'Jill' } }`;
const initTxtFile = `Type something interesting with .txt file...`;
const initJsonFile = PkgJson;

export const DEFAULT_FILE_CONTENT = {
  ".txt": initTxtFile,
  ".js": initJSFile,
  ".ts": initTSFile,
  ".json": initJsonFile,
};

export const ROOT_FOLDER_ACTIONS = [
  { label: "New file...", value: ACTIONS.CreateFile },
  { label: "New folder...", value: ACTIONS.CreateFolder },
  { label: "Rename...", value: ACTIONS.Edit },
  { label: "Paste", value: ACTIONS.Paste },
  { label: "Copy", value: ACTIONS.Copy },
];
export const FOLDER_ACTIONS = [
  ...ROOT_FOLDER_ACTIONS,
  { label: "Delete", value: ACTIONS.Delete },
  { label: "Cut", value: ACTIONS.Cut },
];

export const FILE_ACTIONS = [
  { label: "Rename...", value: ACTIONS.Edit },
  { label: "Delete", value: ACTIONS.Delete },
  { label: "Copy", value: ACTIONS.Copy },
  { label: "Cut", value: ACTIONS.Cut },
];

export const GITHUB_INFO = {
  icon: "ri-github-fill",
  url: "https://github.com/jill6666",
  title: "Source code on Github",
};
