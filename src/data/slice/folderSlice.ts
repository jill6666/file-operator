import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditProps, ISchema } from "@data/types/interface";
import store from "store2";
import clearNoParentItem from "../../utils/clearNoParentItem";

export const FolderSlice = createSlice({
  name: "folderReducer",
  initialState: {
    schema: [] as ISchema[],
  },
  reducers: {
    init(state, actions: PayloadAction<ISchema[]>) {
      state.schema = actions.payload;
      store.set("resource_schema", actions.payload);
    },
    create(state, actions: PayloadAction<ISchema>) {
      state.schema = [...state.schema, actions.payload];
      store.set("resource_schema", state.schema);
    },
    rename(state, actions: PayloadAction<IEditProps>) {
      const { id, name } = actions.payload;
      const newState = state.schema.map((item) => {
        if (item.id === id) item.name = name;
        return item;
      });
      state.schema = newState;
      store.set("resource_schema", newState);
    },
    update(state, actions: PayloadAction<ISchema[]>) {
      state.schema = actions.payload;
      store.set("resource_schema", actions.payload);
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
