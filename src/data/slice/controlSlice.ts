import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISchema } from "@data/types/interface";
import store from "store2";

export const ControlSlice = createSlice({
  name: "controlReducer",
  initialState: {
    currentId: "",
    currentShema: {} as ISchema,
  },
  reducers: {
    setCurrentSchema(
      state,
      actions: PayloadAction<{ id: string; currentShema: ISchema }>
    ) {
      state.currentId = actions.payload.id;
      state.currentShema = actions.payload.currentShema;
    },
  },
});

type TControlState = {
  [key: string]: ReturnType<typeof ControlSlice.reducer>;
};

export const controlSelector = {
  currentId: (state: TControlState) => state?.[ControlSlice.name]?.currentId,
  currentShema: (state: TControlState) =>
    state?.[ControlSlice.name]?.currentShema,
};

export const controlActions = ControlSlice.actions;
export const controlReducer = ControlSlice.reducer;
