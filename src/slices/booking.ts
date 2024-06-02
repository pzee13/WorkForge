import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocationState {
  latitude: number;
  longitude: number;
}

export interface DetailsState {
    areaName: string;
    district: string;
    state: string;
    country: string;
    spaceName:string,
    spaceType:string,
    buildingName:string,
    description:string,
    floor:string,
    images:File | null,
    chargePerHour:number,
    availableSpaces:number,
    contactNumber:string,
    facilities:string[],
    rentalAgreement:File | null,
}

const initialLocationState: LocationState = {
  latitude: 0,
  longitude: 0,
};

const initialDetailsState: DetailsState = {
    areaName: '',
    district: '',
    state: '',
    country: '',
    spaceName: '',
    spaceType: '',
    buildingName: '',
    description: '',
    floor: '',
    images: null,
    chargePerHour: 0,
    availableSpaces: 0,
    contactNumber: '',
    facilities: [],
    rentalAgreement: null,
};

export const bookingSlice = createSlice({
  name: 'location',
  initialState: {
    ...initialLocationState,
    details: initialDetailsState,
  },
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setSpaceDetails: (state, action: PayloadAction<DetailsState>) => {
      state.details = action.payload;
    },
   
  },
});

export const { setLocation, setSpaceDetails } = bookingSlice.actions;

export default bookingSlice.reducer;
