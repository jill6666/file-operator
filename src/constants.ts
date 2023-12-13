import { ACTIONS } from "./data/types/enum";
export const BROWSER_VISIBLE_EXTENSIONS = ["txt", "js", "ts", "json", "text"];
export const FOLDER_ACTIONS = [
  { label: "Rename...", value: ACTIONS.Edit },
  { label: "Delete", value: ACTIONS.Delete },
  { label: "New file...", value: ACTIONS.CreateFile },
  { label: "New folder...", value: ACTIONS.CreateFolder },
];
export const FILE_ACTIONS = [
  { label: "Rename...", value: ACTIONS.Edit },
  { label: "Delete", value: ACTIONS.Delete },
];
