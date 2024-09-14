import { configureStore } from "@reduxjs/toolkit";
import orbitReducer from "../features/orbitSlice/orbitSlice";

const store = configureStore({
  reducer: {
    orbit: orbitReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
