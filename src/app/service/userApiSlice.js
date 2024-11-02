import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    //profile management api's
    getUserProfile: builder.query({
      query: () => ({
        url: `/user/getUserProfile`,
        method: "GET",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: "/user/updateUserProfile",
        method: "PATCH",
        body: userData,
      }),
    }),

    //Address management api's

    addAddress: builder.mutation({
      query: (addressData) => ({
        url: "/user/addAddress",
        method: "POST",
        body: addressData,
      }),
    }),

    getAllAddress: builder.query({
      query: () => ({
        url: "/user/getAllAddress",
        method: "GET",
      }),
    }),

    getSingleAddress:builder.query({
        query: (id) => ({
            url:`/user/getSingleAddress/${id}`,
            method:"GET"
        })
    }),

    updateAddress:builder.mutation({
        query:({id,updateAddressData}) => ({
            url:`/user/updateAddress/${id}`,
            method:"PUT",
            body:updateAddressData
        })
    })




  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useAddAddressMutation,
  useGetAllAddressQuery,
  useGetSingleAddressQuery,
  useUpdateAddressMutation,
} = userApiSlice;
