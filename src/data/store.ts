import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { folderReducer } from "./slice/folderSlice";
import { controlReducer } from "./slice/controlSlice";

export const store = configureStore({
  reducer: { folderReducer, controlReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
