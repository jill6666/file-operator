import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITreeSchema } from "@data/types/interface";

export const ControlSlice = createSlice({
  name: "controlReducer",
  initialState: {
    currentShema: {} as ITreeSchema,
    rightClickSchema: {} as {
      schema: ITreeSchema;
      position: { x: string; y: string };
    },
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
};

export const controlActions = ControlSlice.actions;
export const controlReducer = ControlSlice.reducer;
