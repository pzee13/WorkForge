import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingState {
  spaceName:string
  spaceId: string;
  providerId: string;
  userId: string;
  bookingDate: Date;
  moveInTime: string;
  moveOutTime: string;
  chargePerHour: number;
  noOfSpaces:number;
  totalPrice: number;
  areaName: string;
  district: string;
  state: string;
  country: string;
  contactNumber:string
 
}

const initialBookingState: BookingState = {
  spaceName:'',
  spaceId: '',
  providerId: '',
  userId: '',
  bookingDate: new Date(),
  moveInTime: '',
  moveOutTime: '',
  chargePerHour: 0,
  noOfSpaces:0,
  totalPrice: 0,
  areaName: '',
  district: '',
  state: '',
  country: '',
  contactNumber:''
};

export const bookingSlice = createSlice({
  name: 'Booking',
  initialState: initialBookingState,
  reducers: {
    setBooking: (state, action: PayloadAction<BookingState>) => {
      state.spaceName = action.payload.spaceName;

      state.spaceId = action.payload.spaceId;
   
      state.providerId = action.payload.providerId;
   
      state.userId = action.payload.userId;
  
      state.bookingDate = action.payload.bookingDate;
    
      state.moveInTime = action.payload.moveInTime;
   
      state.moveOutTime = action.payload.moveOutTime;
   
      state.chargePerHour = action.payload.chargePerHour;

      state.noOfSpaces = action.payload.noOfSpaces;
 
      state.totalPrice = action.payload.totalPrice;

      state.areaName = action.payload.areaName;

      state.district = action.payload.district;

      state.state = action.payload.state;

      state.country = action.payload.country;

      state.contactNumber = action.payload.contactNumber;
    },
  },
});

export const { setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
