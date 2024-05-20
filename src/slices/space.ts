import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocationState {
  latitude: number;
  longitude: number;
}

const initialLocationState: LocationState = {
  latitude: 0,
  longitude: 0,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState: initialLocationState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
