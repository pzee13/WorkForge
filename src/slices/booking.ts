import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingState {
  spaceId: string;
  providerId: string;
  userId: string;
  bookingDate: Date;
  moveInTime: string;
  moveOutTime: string;
  chargePerHour: number;
  totalPrice: number;
}

const initialBookingState: BookingState = {
  spaceId: '',
  providerId: '',
  userId: '',
  bookingDate: new Date(),
  moveInTime: '',
  moveOutTime: '',
  chargePerHour: 0,
  totalPrice: 0,
};

export const bookingSlice = createSlice({
  name: 'Booking',
  initialState: initialBookingState,
  reducers: {
    setBooking: (state, action: PayloadAction<BookingState>) => {
      state.spaceId = action.payload.spaceId;
   
      state.providerId = action.payload.providerId;
   
      state.userId = action.payload.userId;
  
      state.bookingDate = action.payload.bookingDate;
    
      state.moveInTime = action.payload.moveInTime;
   
      state.moveOutTime = action.payload.moveOutTime;
   
      state.chargePerHour = action.payload.chargePerHour;
 
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
