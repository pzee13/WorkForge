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