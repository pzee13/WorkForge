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

    getSpaceRequests : builder.mutation({
      query:() => ({
        url:`${ADMIN_URL}/getSpaceRequests`,
        method:"GET",
      })
    }),

    getUsers : builder.mutation({
      query:() =>({
        url:`${ADMIN_URL}/getUsers`,
        method:"GET",
      })
    }),

    updateSpaceStatus: builder.mutation({
      query: ({ id, providerId, isAccepted }) => ({
        url: `${ADMIN_URL}/updateSpaceStatus/${id}/${providerId}`,
        method: "PATCH",
        body: { isAccepted }, // Assuming isAccepted is the only field to update
      }),
    }),

    blockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users/unblock-block?id=${data}`,
        method: "PATCH",
      }),
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
    useGetSpaceRequestsMutation,
    useUpdateSpaceStatusMutation,
    useGetUsersMutation,
    useBlockUserMutation
}= adminApiSlice;