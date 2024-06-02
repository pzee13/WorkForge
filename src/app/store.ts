import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice"; 
import authReducer from '../slices/authSlice';
import locationReducer from '../slices/space'
import addressReducer from '../slices/address'
import bookingReducer from '../slices/booking'


export const store = configureStore({
    reducer: {
      auth:authReducer,
      location:locationReducer,
      address:addressReducer,
      booking:bookingReducer,
      [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
  })
  
  export type RootState = ReturnType<typeof store.getState>
  
  export type AppDispatch = typeof store.dispatch