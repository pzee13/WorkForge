import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from './redux-persist-config';
import { persistStore } from 'redux-persist'; // Import persistStore
import  rtkQueryErrorLogger  from '../middleware/rtkQueryErrorLogger'
import { userApiSlice } from '../slices/userApiSlice'; // General API slice
import { providerApiSlice } from '../slices/providerApiSlice'; // Provider API slice
import { adminApiSlice } from '../slices/adminApiSlice'; 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check as it conflicts with redux-persist
    }).concat(rtkQueryErrorLogger ,userApiSlice.middleware,providerApiSlice.middleware,adminApiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store); // Create persistor

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;