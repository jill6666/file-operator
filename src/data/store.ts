import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { folderReducer } from "./slice/folderSlice";

export const store = configureStore({ reducer: { folderReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
