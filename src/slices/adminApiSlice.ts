import { apiSlice } from "./apiSlice";

const ADMIN_URL ='/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) => ({

    adminLogin: builder.mutation({
      query:(data) => ({
        url: `${ADMIN_URL}/login`,
        method:"POST",
        body:data,
      })
    }),


    logoutAdmin : builder.mutation({
        query: () =>({
          url:`${ADMIN_URL}/logout`,
          method:'POST'
        })
      })
  
    })
  })


  export const {
    useAdminLoginMutation,
    useLogoutAdminMutation,
}= adminApiSlice;