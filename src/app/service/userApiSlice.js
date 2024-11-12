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
    ResetUserPassword:builder.mutation({
      query:(resetData) => ({
        url:"/user/resetPassword",
        method:"PATCH",
        body:resetData
      })
    }),
 
 

    //Address management api's

    addAddress: builder.mutation({
      query: (addressData) => ({
        url: "/user/addAddress",
        method: "POST",
        body: addressData,
      }),
      invalidatesTags:["FetchAddress"]
    }),

    getAllAddress: builder.query({
      query: () => ({
        url: "/user/getAllAddress",
        method: "GET",
      }),
      providesTags:["FetchAddress"]
    }),

    getSingleAddress:builder.query({
        query: (id) => ({
            url:`/user/getSingleAddress/${id}`,
            method:"GET"
        }),
        
    }),

    updateAddress:builder.mutation({
        query:({id,updateAddressData}) => ({
            url:`/user/updateAddress/${id}`,
            method:"PUT",
            body:updateAddressData
        }),
        invalidatesTags:["FetchAddress"]
    }),
    deleteAddress:builder.mutation({
      query:(id) => ({
        url:`/user/deleteAddress/${id}`,
        method:"DELETE",

      }),
      invalidatesTags:["FetchAddress"]
    }),

    ///Category management 
    getActiveCategory:builder.query({
      query:() => ({
        url:"/user/getActiveCategory",
        method:"GET"

      }),
    }),

    getHomeProducts:builder.query({
      query:() => ({
        url:"/user/homeProducts",
        method:"GET"
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
  useGetActiveCategoryQuery,
  useResetUserPasswordMutation,
  useDeleteAddressMutation,
  useGetHomeProductsQuery
} = userApiSlice;
