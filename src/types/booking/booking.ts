export interface BookingResponse<T = Booking| Booking[]|string> {
    status: number;
    success: boolean;
    message?: string;
    data?: T;
  }


  export interface Booking {
    id?: string;
    spaceId:string;
    providerId?: string;
    userId:string;
    bookingDate: Date;
    paidDate?: Date;
    moveInTime: string;
    moveOutTime: string;
    chargePerHour: number;
    noOfSpaces:number;
    totalPrice: number;
    totalPaid?:number;
    paymentId?:string;
    isPaid?:boolean;
  }