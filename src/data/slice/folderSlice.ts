import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFolderSchema } from "../types/interface";

export const FolderSlice = createSlice({
  name: "folderReducer",
  initialState: {
    id: "init",
    schema: [] as IFolderSchema[],
  },
  reducers: {
    initFolder(
      state,
      action: PayloadAction<{ id: string; schema: IFolderSchema[] }>
    ) {
      state.id = action.payload.id;
      state.schema = action.payload.schema;
    },
    setFolderId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

type TFolderState = {
  [key: string]: ReturnType<typeof FolderSlice.reducer>;
};

export const folderSelector = {
  id: (state: TFolderState) => state?.[FolderSlice.name]?.id,
  schema: (state: TFolderState) => state?.[FolderSlice.name]?.schema,
};

export const folderActions = FolderSlice.actions;
export const folderReducer = FolderSlice.reducer;
