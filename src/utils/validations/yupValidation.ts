import * as Yup from 'yup'

// validation for login
export const loginValidation = Yup.object({
    email: Yup.string()
    .email("please enter valid email")
    .required("please enter email"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^[^\s]+$/, "Password cannot contain spaces")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Please enter password"),
})


export const resetPasswordValidation = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter password"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Password not matched")
    .required("Please enter confirm password"),
});

export const validationSchema = Yup.object({
    name: Yup.string()
      .min(3)
      .max(30)
      .matches( /^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
      .required("Please enter name"),
    
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter email"),
      mobile: Yup.string()
      .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
      .required("Please enter mobile"),
      password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^[^\s]+$/, "Password cannot contain spaces")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Please enter password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Please enter confirm password"),
  });

  export const spaceValidation = Yup.object().shape({
    spaceName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must be at most 30 characters")
      .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
      .required("Please enter name"),
    spaceType: Yup.string()
      .required("Please select space type"),
    buildingName: Yup.string()
      .required("Please enter building name"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must be at most 500 characters")
      .matches(/^[^\s]+(\s[^\s]+)*$/, "Description cannot have adjacent spaces")
      .required("Please enter description"),
    floor: Yup.string()
      .required("Please enter floor"),
    images: Yup.array()
      .of(Yup.mixed().required('An image is required'))
      .length(4, 'Exactly 4 images are required')
      .required('Images are required'),
    chargePerHour: Yup.number()
      .required("Please enter charge per hour")
      .positive("Charge per hour must be positive")
      .min(100, "Minimum charge 100")
      .max(1000, "Maximum charge 1000"),
    availableSpaces: Yup.number()
      .required("Please enter number of available spaces")
      .positive("Number of available spaces must be positive"),
    contactNumber: Yup.string()
      .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
      .required("Please enter contact number"),
    facilities: Yup.array()
      .nullable()
      .of(Yup.string()),
    rentalAgreement: Yup.mixed().required("Please upload rental agreement"),
  });


  
export const validationForUserUpdate = Yup.object({
  name: Yup.string()
  .min(3)
  .max(30)
  .matches(/^[^\s]+(\s[^\s]+)*$/, "Name cannot have adjacent spaces")
  .required("Please enter name"),
mobile: Yup.string()
  .matches(/^(?!(\d)\1{9})[5-9]\d{9}$/, "Invalid mobile number")
  .required("Please enter mobile"),
})
