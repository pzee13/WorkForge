export interface MyError {
    data?: {
      message?: string;
    };
    error?: string;
  }

  export interface FormValues {
    name: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
  }
  

  export interface OtpResponse {
    success: boolean;
    message: string;
  }


  export interface AdminLogins {
    email: string;
    password: string
  }


  export interface UpdateUser {
    name:string;
    mobile : string;
  }



  export interface AddSpaceForm{
    spaceName:string,
    spaceType:string,
    buildingName:string,
    description:string,
    floor:string,
    images:File[] | null,
    chargePerHour:number,
    availableSpaces:number,
    contactNumber:string,
    facilities:string[]|null,
    rentalAgreement:File | null,
  }


  export interface AddSpaceForms{
    spaceName:string,
    spaceType:string,
    buildingName:string,
    description:string,
    floor:string,
    images:File,
    chargePerHour:number,
    availableSpaces:number,
    contactNumber:string,
    facilities:string,
    rentalAgreement:File,
  }