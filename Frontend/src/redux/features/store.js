import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore  } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from './Auth/authSlice';
import favoritesReducer from './favorites/favoriteSlice';
import cartSliceReducer from '../features/cart/cartSlice'
import shopReducer from './shop/shopSlice.js'
import { getFavoritesFromLocalStorage } from "../../Utils/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || [];

export const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth : authReducer,
      favorites: favoritesReducer,
      cart : cartSliceReducer, 
      shop : shopReducer, 
    },

    preloadedState: {
      favorites: initialFavorites,
    },
  
  
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });

setupListeners(store.dispatch);
