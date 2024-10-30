import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./service/apiSlice";
import authSlice from "./slices/authSlice"

export const store = configureStore({
    reducer : {
      auth:authSlice,
      [apiSlice.reducerPath] :apiSlice.reducer


        
        
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});
