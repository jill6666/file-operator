import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditProps, ISchema } from "@data/types/interface";

export const FolderSlice = createSlice({
  name: "folderReducer",
  initialState: {
    schema: [] as ISchema[],
  },
  reducers: {
    init(state, actions: PayloadAction<ISchema[]>) {
      state.schema = actions.payload;
    },
    create(state, actions: PayloadAction<ISchema>) {
      state.schema = [...state.schema, actions.payload];
    },
    rename(state, actions: PayloadAction<IEditProps>) {
      const { id, name } = actions.payload;
      const newState = state.schema.map((item) => {
        if (item.id === id) item.name = name;
        return item;
      });
      state.schema = newState;
    },
    delete(state, actions: PayloadAction<{ id: string }>) {
      const id = actions.payload.id;
      const newState = state.schema.filter((item) => item.id !== id);
      state.schema = newState;
    },
  },
});

type TFolderState = {
  [key: string]: ReturnType<typeof FolderSlice.reducer>;
};

export const folderSelector = {
  schema: (state: TFolderState) => state?.[FolderSlice.name]?.schema,
};

export const folderActions = FolderSlice.actions;
export const folderReducer = FolderSlice.reducer;
