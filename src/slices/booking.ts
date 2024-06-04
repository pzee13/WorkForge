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
  payment: PaymentState;
}

export interface PaymentState {
  totalPaid: number;
  paymentMethod: string;
  paymentId: string;
  isPaid: boolean;
  paidDate: Date;
}

const initialBookingState: BookingState  = {
  spaceId: '',
  providerId: '',
  userId: '',
  bookingDate: new Date(),
  moveInTime: '',
  moveOutTime: '',
  chargePerHour: 0,
  totalPrice: 0,
  payment: {
    totalPaid: 0,
    paymentMethod: '',
    paymentId: '',
    isPaid: false,
    paidDate: new Date(),
  },
};

export const bookingSlice = createSlice({
  name: 'Booking',
  initialState: initialBookingState,
  reducers: {
    setBookingDetails: (state, action: PayloadAction<BookingState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setPayment: (state, action: PayloadAction<PaymentState>) => {
      state.payment = action.payload;
    },
  },
});

export const { setBookingDetails, setPayment } = bookingSlice.actions;

export default bookingSlice.reducer;
