import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore  } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from './Auth/authSlice'

export const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth : authReducer,
    },
  
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });

setupListeners(store.dispatch);
