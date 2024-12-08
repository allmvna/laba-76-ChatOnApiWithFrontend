import { configureStore } from "@reduxjs/toolkit";
import {messageReducer} from "../container/slices/messageSlice/messageSlice.tsx";

export const store = configureStore({
  reducer: {
    chat: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
