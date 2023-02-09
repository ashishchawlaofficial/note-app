import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";
import noteReducer from "./slices/noteSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    notes: noteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
