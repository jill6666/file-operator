import { ACTIONS } from "./data/types/enum";

export const BROWSER_VISIBLE_EXTENSIONS = ["txt", "js", "ts", "json", "text"];

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
