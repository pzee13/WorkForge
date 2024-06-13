import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from './redux-persist-config';
import { persistStore } from 'redux-persist'; // Import persistStore
import  rtkQueryErrorLogger  from '../middleware/rtkQueryErrorLogger'

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check as it conflicts with redux-persist
    }).concat(rtkQueryErrorLogger),
  devTools: true,
});

export const persistor = persistStore(store); // Create persistor

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;