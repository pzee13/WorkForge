import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface AddressState{
    areaName: string;
    district: string;
    state: string;
    country: string;
  }

  const addressInitialState:AddressState = {
    areaName: '',
    district: '',
    state: '',
    country: '',
  }

  
export const addressSlice = createSlice({
    name: 'address',
    initialState: addressInitialState,
    reducers: {
      setAddress: (state, action: PayloadAction<AddressState>) => {
        state.areaName = action.payload.areaName;
        state.district = action.payload.district;
        state.state = action.payload.state;
        state.country = action.payload.country;
      },
    },
  });
  
  export const { setAddress } = addressSlice.actions;
  
  export default addressSlice.reducer;
  



