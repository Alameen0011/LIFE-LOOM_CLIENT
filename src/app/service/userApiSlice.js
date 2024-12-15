import { method } from "lodash";
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
      }),
    }),

    //Coupon management 
    applyCoupon: builder.mutation({
      query:(Coupon) => ({
        url:"/user/order/applyCoupon",
        method:"POST",
        body:Coupon
      }),
    }),

    //Wishlist management 
    addToWishlist :builder.mutation({
      query:(wishlistData) => ({
        url:"/user/wishlist",
        method:"POST",
        body:wishlistData
      }),
      invalidatesTags:["wishList"]
    }),

    removeWishlist:builder.mutation({
      query:(removeData) => ({
        url:"/user/wishlist",
        method:"DELETE",
        body:removeData
      }),
      invalidatesTags:["wishList"]
    }),

    fetchWishlist:builder.query({
      query:() => ({
        url:"/user/wishlist",
        method:"GET"
      }),
      providesTags:["wishList"]
    }),

    //Return management User
    returnOrderRequest:builder.mutation({
      query:({reason,comments,orderId,itemId}) => ({
        url:`/user/order/${orderId}/product/${itemId}/returnRequest`,
        method:"POST",
        body:{reason,comments}
      }),
    }),

    //getUser wallet api
    getWallet:builder.query({
      query:() => ({
        url:"user/wallet"
      })
    }),

    //fetch user coupon
    fetchUserCoupon:builder.query({
      query:() => ({
        url:"user/getCoupons"
      }),
    }),


    //fetch referral code
    fetchRefferalCode: builder.query({
      query:() => ({
        url:"/user/refferal",
        method:"GET"
      })
    }),
    ApplyRefferalCode: builder.mutation({
      query: (data) => {
        console.log("datataatatatattatat ",data)
          return {
              url: `/user/refferal`,
              method: "POST",
              body:data,
          };
      },
  }),
    skipRefferalCode : builder.mutation({
      query:() => ({
        url:"/user/refferal/skip",
        method:"POST"
      }),
    }),
    getCheckRefferal : builder.query({
      query:() => ({
        url:`/user/refferal/checkStatus`

      })
    }),

    getInvoiceData: builder.query({
      query: ({orderId}) => ({ 
        url: `/user/invoice`,
        params: {orderId},
        method: "GET",
        responseHandler: (response) => response.blob()
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
  useGetHomeProductsQuery,
  useApplyCouponMutation,
  useAddToWishlistMutation,
  useRemoveWishlistMutation,
  useFetchWishlistQuery,
  useReturnOrderRequestMutation,
  useGetWalletQuery,
  useFetchUserCouponQuery,
  useFetchRefferalCodeQuery,
  useGetCheckRefferalQuery,
  useApplyRefferalCodeMutation,
  useSkipRefferalCodeMutation,
  useLazyGetInvoiceDataQuery
} = userApiSlice;
