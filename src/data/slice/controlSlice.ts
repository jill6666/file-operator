import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITreeSchema, IOption } from "@data/types/interface";

interface ISearchResult extends IOption, ITreeSchema {}

export const ControlSlice = createSlice({
  name: "controlReducer",
  initialState: {
    currentShema: {} as ITreeSchema,
    rightClickSchema: {} as {
      schema: ITreeSchema;
      position: { x: string; y: string };
    },
    searchResult: [] as ISearchResult[],
    onEditId: "",
  },
  reducers: {
    setCurrentSchema(state, actions: PayloadAction<ITreeSchema>) {
      state.currentShema = actions.payload;
    },
    setRightClickSchema(
      state,
      actions: PayloadAction<{
        schema: ITreeSchema;
        position: { x: string; y: string };
      }>
    ) {
      state.rightClickSchema = actions.payload;
    },
    setSearchResult(state, actions: PayloadAction<ISearchResult[]>) {
      state.searchResult = actions.payload;
    },
    setEditing(state, actions: PayloadAction<string>) {
      state.onEditId = actions.payload;
    },
  },
});

type TControlState = {
  [key: string]: ReturnType<typeof ControlSlice.reducer>;
};

export const controlSelector = {
  currentShema: (state: TControlState) =>
    state?.[ControlSlice.name]?.currentShema,
  rightClickSchema: (state: TControlState) =>
    state?.[ControlSlice.name]?.rightClickSchema,
  searchResult: (state: TControlState) =>
    state?.[ControlSlice.name]?.searchResult,
  onEditId: (state: TControlState) => state?.[ControlSlice.name]?.onEditId,
};

export const controlActions = ControlSlice.actions;
export const controlReducer = ControlSlice.reducer;
