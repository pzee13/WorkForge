import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// Import your reducers
import authReducer from '../slices/authSlice';
import { apiSlice } from "../slices/apiSlice"; 
import locationReducer from '../slices/space';
import addressReducer from '../slices/address';
import bookingReducer from '../slices/booking';

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]:apiSlice.reducer,
  location: locationReducer,
  address: addressReducer,
  booking: bookingReducer,
  
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;