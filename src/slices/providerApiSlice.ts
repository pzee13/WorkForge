import { apiSlice } from "./apiSlice";

const PROVIDER_URL = "/api/provider";
 

export const providerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      providerLogin: builder.mutation({
        query: (data) => ({
          url: `${PROVIDER_URL}/login`,
          method: "POST",
          body: data,
        }),
      }),
  
      providerRegister: builder.mutation({
        query: (data) => ({
          url: `${PROVIDER_URL}/register`,
          method: "POST",
          body: data,
        }),
      }),
  
      providerLogout: builder.mutation({
        query: () => ({
          url: `${PROVIDER_URL}/logout`,
          method: "POST",
        }),
      }),

      sendOtpToProviderEmail: builder.mutation({
        query: (data) => ({
          url: `${PROVIDER_URL}/sendEmail`,
          method: "POST",
          body: data,
        }),
      }),
  
      providerOtpVerification: builder.mutation({
        query: (data) => ({
          url: `${PROVIDER_URL}/verifyEmail`,
          method: "POST",
          body: data,
        }),
      }),
    }),
  });
  
  export const {
    useProviderLoginMutation,
    useProviderRegisterMutation,
    useProviderLogoutMutation,
    useProviderOtpVerificationMutation,
    useSendOtpToProviderEmailMutation
  } = providerApiSlice;
  