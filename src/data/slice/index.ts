import { folderActions } from "./folderSlice";
import { controlActions } from "./controlSlice";

export const actions = { ...folderActions, ...controlActions };
